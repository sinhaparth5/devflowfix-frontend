import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NbAuthService, NbAuthResult } from '@nebular/auth';
import {
  NbCardModule,
  NbInputModule,
  NbButtonModule,
  NbCheckboxModule,
  NbAlertModule,
  NbIconModule,
  NbLayoutModule,
  NbToastrService,
} from '@nebular/theme'

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
  ],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register implements OnInit {
  registerFrom!: FormGroup;
  submitted = false;
  loading = false;
  showPassword = false;
  showConfirmPassword = false;
  errors: string[] = [];
  messages: string[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private authService: NbAuthService,
    private router: Router,
    private toastrService: NbToastrService
  ) {}

  ngOnInit(): void {
    this.registerFrom = this.formBuilder.group(
      {
        fullName: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required]],
        agreeTerms: [false, [Validators.requiredTrue]],
      },
      {
        validators: this.passwordMatchValidator,
      }
    );
  }

  get f() {
    return this.registerFrom.controls;
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
    const field = this.registerFrom.get(fieldName);
    if (field?.invalid && (field?.dirty || field?.touched || this.submitted)) {
      return 'danger';
    }
    if (field?.valid && (field?.dirty ?? field?.touched )) {
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

    if (this.registerFrom.invalid) {
      return;
    }

    this.loading = true;

    const { confirmPassword, agreeTerms, ...registerData } = this.registerFrom.value;

    this.authService
      .register('email', registerData)
      .subscribe({
        next: (result: NbAuthResult) => {
          this.loading = false;
          if (result.isSuccess()) {
            this.messages = result.getMessages();
            this.toastrService.success(
              'Registration successful! Please login in.',
              'Success'
            );
            this.router.navigate(['/auth/login']);
          } else {
            this.errors = result.getErrors();
            this.toastrService.danger(
              this.errors.join(', ') || 'Registration failed',
              'Error'
            );
          }
        },
        error: (err) => {
          this.loading = false;
          this.errors = ['An error occurred during registration. Please try again.'];
          this.toastrService.danger(
            'An error occurred during registration',
            'Error'
          )
        }
      })
  }
}
