import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators, ValidationErrors, ValidatorFn, AbstractControl } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { Route, Router } from '@angular/router';

//Ki-generierte Lösung für Fehler "Parameter 'response' implicitely has an 'any' type"
interface AuthResponse {
    message: string;
    user: any
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{

  registrationForm !: FormGroup;
  uploadedFile: File | null = null;
  loading: boolean = false;
  shortLink: string = "";
  message: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}


  ngOnInit(): void {
    this.registrationForm = new FormGroup({
    username: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      this.validatePassword()
    ]),
    aboutYou: new FormControl('')
  });
  }

  validatePassword(): ValidatorFn {
    return (control:AbstractControl) : ValidationErrors | null => {
      const value = control.value;
     /* if (!value) {
        console.log('password is valid');
        return null;
      }*/
      const length = value.length;
      const hasUpperCase = /[A-Z]+/.test(value);
      const hasLowerCase = /[a-z]+/.test(value);
      const hasNumber = /[0-9]+/.test(value);
      //const hasSpecialCharacter = /[!§$%&?=#*+_^<>'`´()/]+/.test(value);
      const hasSpecialCharacter = /[^A-Za-z0-9]+/.test(value);
      const validPassword = hasUpperCase && hasLowerCase && hasNumber && hasSpecialCharacter && (length>=8);

      if (!validPassword && control.dirty) {
        console.log('password is invalid');
        return {
          passwordStrength: true,
        }
      } else if (validPassword ) {
        console.log('password is valid');
        return null;
      } else {
        console.log('password field untouched');
        return {
          passwordStrength: true,
        };
      }
      //return !validPassword ? {passwordStrength:true}: null;
    }
  }

  onFileSelected(event: Event): void {
    const fileUploaded = event.target as HTMLInputElement;
    if(fileUploaded.files && fileUploaded.files.length > 0) {
      this.uploadedFile = fileUploaded.files[0];
    }
  }

  onSubmit(): void {

    if (this.registrationForm.invalid) {
      console.error("Registration form invalid!");
      console.log('Form Status:', this.registrationForm.status);
      console.log('Username Errors:', this.registrationForm.get('username')?.errors);
      console.log('Email Errors:', this.registrationForm.get('email')?.errors);
      console.log('Password Errors:', this.registrationForm.get('password')?.errors);
      return;
    }

    const formData = new FormData();

    // --- KI genertiert, da Probleme mit formData.append ---
    // Wir lesen jeden Wert explizit und sicher aus der Form Group.
    const username = this.registrationForm.get('username')?.value;
    const email = this.registrationForm.get('email')?.value;
    const password = this.registrationForm.get('password')?.value;
    const aboutYou = this.registrationForm.get('aboutYou')?.value;

    // WICHTIG: Wir stellen sicher, dass wir nur 'string' oder 'undefined' haben
    // und wandeln es mit `?? ''` in einen garantierten String um (entweder der Wert oder ein leerer String).
    // Dies löst den "No overload"-Fehler definitiv.
    formData.append('username', username ?? '');
    formData.append('email', email ?? '');
    formData.append('password', password ?? '');
    formData.append('aboutYou', aboutYou ?? '');
    // -------------------------

    if(this.uploadedFile) {
      formData.append('profilePic', this.uploadedFile);
    }

    console.log("Sende Daten...");

    this.authService.register(formData).subscribe({
      next: (response: AuthResponse) => { //Ki-generiert
        this.message = response.message;
        console.log("User created: ", response.user.username);
        //this.registrationForm.reset();
        this.router.navigate(['/login']);
      },
      error: (err: {error: Error}) => {
        this.message = err.error?.message || 'Ein Fehler ist beim Hochladen der Daten aufgetaucht.'
      }
    })
  }
}
