import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ReactiveFormsModule } from '@angular/forms';
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
  selector: 'app-register',
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
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register implements OnInit {
  registerForm!: FormGroup;
  submitted = false;
  loading = false;
  showPassword = false;
  showConfirmPassword = false;
  errors: string[] = [];
  messages: string[] = [];

  // Password strength indicators
  passwordStrength = {
    hasMinLength: false,
    hasUppercase: false,
    hasLowercase: false,
    hasNumber: false,
    hasSpecial: false,
  };

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

    this.registerForm = this.formBuilder.group(
      {
        fullName: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8), this.passwordStrengthValidator.bind(this)]],
        confirmPassword: ['', [Validators.required]],
        agreeTerms: [false, [Validators.requiredTrue]],
      },
      {
        validators: this.passwordMatchValidator,
      }
    );

    // Watch password changes for strength indicator
    this.registerForm.get('password')?.valueChanges.subscribe(value => {
      this.updatePasswordStrength(value);
    });
  }

  get f() {
    return this.registerForm.controls;
  }

  passwordStrengthValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value) return null;

    const hasUppercase = /[A-Z]/.test(value);
    const hasLowercase = /[a-z]/.test(value);
    const hasNumber = /[0-9]/.test(value);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(value);

    const valid = hasUppercase && hasLowercase && hasNumber && hasSpecial;

    if (!valid) {
      return { passwordStrength: true };
    }
    return null;
  }

  updatePasswordStrength(password: string): void {
    this.passwordStrength = {
      hasMinLength: password?.length >= 8,
      hasUppercase: /[A-Z]/.test(password || ''),
      hasLowercase: /[a-z]/.test(password || ''),
      hasNumber: /[0-9]/.test(password || ''),
      hasSpecial: /[!@#$%^&*(),.?":{}|<>]/.test(password || ''),
    };
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (!password || !confirmPassword) {
      return null;
    }

    if (confirmPassword.errors && !confirmPassword.errors['passwordMismatch']) {
      return null;
    }

    if (password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    } else {
      confirmPassword.setErrors(null);
      return null;
    }
  }

  getInputStatus(fieldName: string): string {
    const field = this.registerForm.get(fieldName);
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

  toggleShowConfirmPassword(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  onSubmit(): void {
    this.submitted = true;
    this.errors = [];
    this.messages = [];

    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;

    const registerData = {
      full_name: this.registerForm.value.fullName,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
    };

    this.authService.register(registerData).subscribe({
      next: (response) => {
        this.loading = false;
        this.messages = ['Registration successful! Please log in.'];
        this.toastrService.success(
          'Your account has been created successfully!',
          'Welcome to DevFlowFix'
        );
        // Redirect to login after short delay
        setTimeout(() => {
          this.router.navigate(['/auth/login']);
        }, 1500);
      },
      error: (err) => {
        this.loading = false;
        
        // Handle different error responses
        if (err.status === 400) {
          this.errors = [err.error?.detail || 'Email already exists or invalid data'];
        } else if (err.status === 0) {
          this.errors = ['Unable to connect to server. Please check your connection.'];
        } else {
          this.errors = [err.error?.detail || 'An error occurred during registration. Please try again.'];
        }
        
        this.toastrService.danger(
          this.errors[0],
          'Registration Failed'
        );
      },
    });
  }
}