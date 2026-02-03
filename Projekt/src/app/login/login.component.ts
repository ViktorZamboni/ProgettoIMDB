import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormsModule } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  private loginService = inject(LoginService);
  private fb = inject(FormBuilder);
  private router = inject(Router);

  isLoginMode = true;
  isLoading = false;
  errorMessage = '';
  displayName = '';

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  registerForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  switchMode() {
    this.isLoginMode = !this.isLoginMode;
    this.errorMessage = '';
    this.displayName = '';
  }

  async onLogin() {
    if (this.loginForm.invalid) return;
    
    this.isLoading = true;
    this.errorMessage = '';
    
    try {
      const { email, password } = this.loginForm.value;
      await this.loginService.login(email!, password!);
      this.router.navigate(['/']);
    } catch (error: any) {
      this.errorMessage = this.getAuthErrorMessage(error.code);
    } finally {
      this.isLoading = false;
    }
  }

  async onRegister() {
    if (this.registerForm.invalid || !this.displayName) return;
    
    this.isLoading = true;
    this.errorMessage = '';
    
    try {
      const { email, password } = this.registerForm.value;
      await this.loginService.register(email!, password!, this.displayName);
      this.router.navigate(['/']);
    } catch (error: any) {
      this.errorMessage = this.getAuthErrorMessage(error.code);
    } finally {
      this.isLoading = false;
    }
  }

  private getAuthErrorMessage(code: string): string {
    switch (code) {
      case 'auth/user-not-found': return 'User not found';
      case 'auth/wrong-password': return 'Wrong password';
      case 'auth/email-already-in-use': return 'Email already in use';
      case 'auth/weak-password': return 'Too weak password';
      case 'auth/invalid-email': return 'Email is invalid';
      default: return 'Error during authentication';
    }
  }
}