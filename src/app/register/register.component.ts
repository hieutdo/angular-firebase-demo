import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../shared/security/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  form: FormGroup;

  constructor(
    private router: Router,
    private authService: AuthService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirm: ['', Validators.required],
    });
  }

  signUp(): void {
    const { email, password } = this.form.value;
    this.authService
      .signup(email, password)
      .subscribe(() => this.router.navigate(['/home']), alert);
  }

  isPasswordMatch(): boolean {
    const { password, confirm } = this.form.value;
    return password !== '' && confirm !== '' && password === confirm;
  }

  isErrorVisible(field: string, error: string): boolean {
    const control = this.form.controls[field];
    return control.touched && control.errors && control.errors[error];
  }
}
