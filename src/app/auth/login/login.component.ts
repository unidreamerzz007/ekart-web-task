import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule, AbstractControl } from '@angular/forms';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { Router, RouterModule } from '@angular/router';
import { NgIf, NgClass } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, RouterModule, FormsModule, ReactiveFormsModule, NgIf, NgClass, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup;
  submitted = false;
  loginError: string | null = null;
  showPassword = false;

  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [
        Validators.required,
        Validators.email,
        Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{6,}$')
      ]]
    });
  }

  // Getter for easy access to form fields
  get f(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }

  // Get validation error messages
  getErrorMessage(field: string): string {
    if (!this.f[field].errors) return '';

    const errors = this.f[field].errors;

    if (field === 'email') {
      if (errors['required']) return 'Email is required';
      if (errors['email'] || errors['pattern']) return 'Please enter a valid email address';
    }

    if (field === 'password') {
      if (errors['required']) return 'Password is required';
      if (errors['minlength']) return 'Password must be at least 6 characters';
      if (errors['pattern']) return 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
    }

    return '';
  }

  // Check if field is invalid
  isFieldInvalid(field: string): boolean {
    return (this.submitted || this.f[field].touched) && this.f[field].invalid;
  }

  onSubmit() {
    this.submitted = true;
    this.loginError = null;

    if (this.loginForm.valid) {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const user = JSON.parse(storedUser);
        const { email, password } = this.loginForm.value;
        
        if (user.email === email && user.password === password) {
          // Store the logged-in user data
          localStorage.setItem('loggedInUser', JSON.stringify({ email: user.email }));
          alert('Login Successful! 🎉');
          this.router.navigate(['/user']);
        } else {
          this.loginError = 'Invalid credentials. Please try again.';
        }
      } else {
        this.loginError = 'No registered user found. Please sign up first.';
      }
    }
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}