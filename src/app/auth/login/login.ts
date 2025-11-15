import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, Form } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NbAuthService, NbAuthResult, NbAuthToken } from '@nebular/auth';
import {
  NbCardModule,
  NbInputModule,
  NbButtonModule,
  NbCheckboxModule,
  NbAlertModule,
  NbIconModule,
  NbLayoutModule,
  NbToastrService,
} from '@nebular/theme';

@Component({
  selector: 'app-login',
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
    private authService: NbAuthService,
    private router: Router,
    private toastrService: NbToastrService
  ) {}

  ngOnInit(): void {
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

    this.authService
      .authenticate('email', this.loginForm.value)
      .subscribe({
        next: (result: NbAuthResult) => {
          this.loading = false;
          if (result.isSuccess()) {
            this.messages = result.getMessages();
            this.toastrService.success('Login successful!', 'Success');
            this.router.navigate(['/dashboard']);
          } else {
            this.errors = result.getErrors();
            this.toastrService.danger(
              this.errors.join(', ') || 'Login failed',
              'Error'
            );
          }
        },
        error: (err) => {
          this.loading = false;
          this.errors = ['An error occurred during login. Please try again.'];
          this.toastrService.danger(
            'An error occurred during login',
            'Error'
          );
        },
      });
  }
}
