import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import {
  NbCardModule,
  NbInputModule,
  NbButtonModule,
  NbCheckboxModule,
  NbAlertModule,
  NbIconModule,
  NbLayoutModule,
  NbToastrService,
  NbSpinnerModule,
} from '@nebular/theme';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    NbCardModule,
    NbInputModule,
    NbButtonModule,
    NbCheckboxModule,
    NbAlertModule,
    NbIconModule,
    NbLayoutModule,
    NbSpinnerModule,
  ],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit {
  loginForm!: FormGroup;
  submitted = false;
  loading = false;
  showPassword = false;
  errors: string[] = [];
  messages: string[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastrService: NbToastrService
  ) {}

  ngOnInit(): void {
    // Redirect if already authenticated
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/dashboard']);
      return;
    }

    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false],
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  getInputStatus(fieldName: string): string {
    const field = this.loginForm.get(fieldName);
    if (field?.invalid && (field?.dirty || field?.touched || this.submitted)) {
      return 'danger';
    }
    if (field?.valid && (field?.dirty || field?.touched)) {
      return 'success';
    }
    return 'basic';
  }

  toggleShowPassword(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    this.submitted = true;
    this.errors = [];
    this.messages = [];

    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;

    const loginData = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    };

    this.authService.login(loginData).subscribe({
      next: (response) => {
        this.loading = false;
        this.messages = ['Login successful!'];
        this.toastrService.success(
          `Welcome back, ${response.user.full_name}!`,
          'Success'
        );
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.loading = false;
        
        // Handle different error responses
        if (err.status === 401) {
          this.errors = [err.error?.detail || 'Invalid email or password'];
        } else if (err.status === 423) {
          this.errors = [err.error?.detail || 'Account is locked. Please try again later.'];
        } else if (err.status === 0) {
          this.errors = ['Unable to connect to server. Please check your connection.'];
        } else {
          this.errors = [err.error?.detail || 'An error occurred during login. Please try again.'];
        }
        
        this.toastrService.danger(
          this.errors[0],
          'Login Failed'
        );
      },
    });
  }
}