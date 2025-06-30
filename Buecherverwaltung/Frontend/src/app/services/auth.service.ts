import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService{

  private apiRegisterUrl = 'http://localhost:5000/api/auth/signup';
  private apiLoginUrl = 'http://localhost:5000/api/auth/login';


  constructor(private http: HttpClient) {

  }

  register(formData: FormData): Observable<any> {
    return this.http.post(this.apiRegisterUrl, formData);
  }

  login(loginData: any): Observable<any> {
    return this.http.post(this.apiLoginUrl, loginData);
  }

}
