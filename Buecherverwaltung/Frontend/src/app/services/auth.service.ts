import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService{

  private apiUrl = 'http://localhost:5000/api/auth/signup';

  constructor(private http: HttpClient) {

  }

  register(formData: FormData): Observable<any> {
    return this.http.post(this.apiUrl, formData);
  }

}
