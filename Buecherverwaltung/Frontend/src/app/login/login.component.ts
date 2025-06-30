import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

interface AuthResponse {
  message: string,
  user: any
}

@Component({
  selector: 'app-login',
  imports: [ CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  loginForm !: FormGroup;
  message: string | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8)
      ])
    });
  }

  onSubmit(): void {

    const loginData = {
      email: this.loginForm.get('email')?.value,
      password: this.loginForm.get('password')?.value
    }

    

    console.log("Sende Daten...");

    this.authService.login(loginData).subscribe({
      next: (response: any) => {
        this.message = response.message;
        console.log("Got a response: ", response.token);
        this.loginForm.reset();
      },
      error: (err: {error: Error}) => {
        this.message = err.error?.message || 'Login fehlgeschlagen.';
      }
    })
  }

}
