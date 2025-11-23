import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap, catchError, throwError } from 'rxjs';
import { environment } from '../../environments/environment';

export interface User {
  user_id: string;
  email: string;
  full_name: string;
  role: string;
  is_active: boolean;
  is_mfa_enabled: boolean;
  created_at: string;
  updated_at: string;
  last_login_at?: string;
  email_verified_at?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
  mfa_code?: string;
}

export interface LoginResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: number;
  user: User;
}

export interface RegisterRequest {
  email: string;
  password: string;
  full_name: string;
}

export interface RegisterResponse {
  user_id: string;
  email: string;
  full_name: string;
  role: string;
  is_active: boolean;
  created_at: string;
}

export interface RefreshRequest {
  refresh_token: string;
}

export interface RefreshResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: number;
}

export interface LogoutRequest {
  all_sessions?: boolean;
}

export interface LogoutResponse {
  success: boolean;
  message: string;
  sessions_revoked: number;
}

export interface SuccessResponse {
  success: boolean;
  message: string;
}

export interface Session {
  session_id: string;
  user_id: string;
  ip_address?: string;
  user_agent?: string;
  created_at: string;
  expires_at: string;
  last_activity_at: string;
  is_current?: boolean;
}

export interface SessionListResponse {
  sessions: Session[];
  total: number;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  private readonly API_URL = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    // Check for existing token on service init
    this.loadUserFromToken();
  }

  // Cookie Management
  private setCookie(name: string, value: string, days: number = 7): void {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    // In development, don't use Secure flag
    const secureFlag = environment.production ? ';Secure' : '';
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax${secureFlag}`;
  }

  private getCookie(name: string): string | null {
    const nameEQ = name + '=';
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }

  private deleteCookie(name: string): void {
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/;`;
  }

  // Token Management
  getAccessToken(): string | null {
    return this.getCookie(environment.auth.tokenKey);
  }

  getRefreshToken(): string | null {
    return this.getCookie(environment.auth.refreshTokenKey);
  }

  private setTokens(accessToken: string, refreshToken: string, expiresIn: number): void {
    // Access token expires based on API response (convert seconds to days)
    const accessTokenDays = expiresIn / (24 * 60 * 60);
    this.setCookie(environment.auth.tokenKey, accessToken, accessTokenDays);
    
    // Refresh token lasts longer (7 days)
    this.setCookie(environment.auth.refreshTokenKey, refreshToken, 7);
    
    // Store expiry time
    const expiryTime = new Date().getTime() + expiresIn * 1000;
    this.setCookie(environment.auth.tokenExpiry, expiryTime.toString(), 7);
  }

  private clearTokens(): void {
    this.deleteCookie(environment.auth.tokenKey);
    this.deleteCookie(environment.auth.refreshTokenKey);
    this.deleteCookie(environment.auth.tokenExpiry);
  }

  isTokenExpired(): boolean {
    const expiry = this.getCookie(environment.auth.tokenExpiry);
    if (!expiry) return true;
    return new Date().getTime() > parseInt(expiry, 10);
  }

  isAuthenticated(): boolean {
    const token = this.getAccessToken();
    return !!token && !this.isTokenExpired();
  }

  getCurrentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  // API Calls
  register(data: RegisterRequest): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(
      `${this.API_URL}${environment.endpoints.register}`,
      data
    );
  }

  login(data: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(
      `${this.API_URL}${environment.endpoints.login}`,
      data
    ).pipe(
      tap(response => {
        this.setTokens(response.access_token, response.refresh_token, response.expires_in);
        this.currentUserSubject.next(response.user);
      })
    );
  }

  logout(allSessions: boolean = false): Observable<LogoutResponse> {
    const headers = this.getAuthHeaders();
    return this.http.post<LogoutResponse>(
      `${this.API_URL}${environment.endpoints.logout}`,
      { all_sessions: allSessions } as LogoutRequest,
      { headers }
    ).pipe(
      tap(() => {
        this.clearTokens();
        this.currentUserSubject.next(null);
        this.router.navigate(['/auth/login']);
      }),
      catchError(error => {
        // Clear tokens even if API call fails
        this.clearTokens();
        this.currentUserSubject.next(null);
        this.router.navigate(['/auth/login']);
        return throwError(() => error);
      })
    );
  }

  refreshTokens(): Observable<RefreshResponse> {
    const refreshToken = this.getRefreshToken();
    if (!refreshToken) {
      return throwError(() => new Error('No refresh token available'));
    }

    return this.http.post<RefreshResponse>(
      `${this.API_URL}${environment.endpoints.refresh}`,
      { refresh_token: refreshToken } as RefreshRequest
    ).pipe(
      tap(response => {
        this.setTokens(response.access_token, response.refresh_token, response.expires_in);
      }),
      catchError(error => {
        this.clearTokens();
        this.currentUserSubject.next(null);
        this.router.navigate(['/auth/login']);
        return throwError(() => error);
      })
    );
  }

  getCurrentUser(): Observable<User> {
    const headers = this.getAuthHeaders();
    return this.http.get<User>(
      `${this.API_URL}${environment.endpoints.me}`,
      { headers }
    ).pipe(
      tap(user => {
        this.currentUserSubject.next(user);
      })
    );
  }

  private loadUserFromToken(): void {
    if (this.isAuthenticated()) {
      this.getCurrentUser().subscribe({
        error: () => {
          // Token might be invalid, try refresh
          this.refreshTokens().subscribe({
            next: () => this.getCurrentUser().subscribe(),
            error: () => this.clearTokens()
          });
        }
      });
    }
  }

  getAuthHeaders(): HttpHeaders {
    const token = this.getAccessToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  // Password Management
  changePassword(currentPassword: string, newPassword: string): Observable<SuccessResponse> {
    const headers = this.getAuthHeaders();
    return this.http.post<SuccessResponse>(
      `${this.API_URL}${environment.endpoints.passwordChange}`,
      { current_password: currentPassword, new_password: newPassword },
      { headers }
    );
  }

  requestPasswordReset(email: string): Observable<SuccessResponse> {
    return this.http.post<SuccessResponse>(
      `${this.API_URL}${environment.endpoints.passwordResetRequest}`,
      { email }
    );
  }

  confirmPasswordReset(token: string, newPassword: string): Observable<SuccessResponse> {
    return this.http.post<SuccessResponse>(
      `${this.API_URL}${environment.endpoints.passwordResetConfirm}`,
      { token, new_password: newPassword }
    );
  }

  // Session Management
  getSessions(): Observable<SessionListResponse> {
    const headers = this.getAuthHeaders();
    return this.http.get<SessionListResponse>(
      `${this.API_URL}${environment.endpoints.sessions}`,
      { headers }
    );
  }

  revokeSession(sessionId: string, reason?: string): Observable<SuccessResponse> {
    const headers = this.getAuthHeaders();
    return this.http.post<SuccessResponse>(
      `${this.API_URL}${environment.endpoints.sessions}/revoke`,
      { session_id: sessionId, reason },
      { headers }
    );
  }

  // MFA Management
  setupMFA(): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.post(
      `${this.API_URL}${environment.endpoints.mfaSetup}`,
      {},
      { headers }
    );
  }

  enableMFA(code: string): Observable<SuccessResponse> {
    const headers = this.getAuthHeaders();
    return this.http.post<SuccessResponse>(
      `${this.API_URL}${environment.endpoints.mfaEnable}`,
      { code },
      { headers }
    );
  }

  disableMFA(password: string, code: string): Observable<SuccessResponse> {
    const headers = this.getAuthHeaders();
    return this.http.post<SuccessResponse>(
      `${this.API_URL}${environment.endpoints.mfaDisable}`,
      { password, code },
      { headers }
    );
  }
}