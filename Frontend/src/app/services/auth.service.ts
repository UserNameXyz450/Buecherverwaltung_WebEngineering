import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { BehaviorSubject, Observable, tap } from 'rxjs';

export interface User {
  _id: string;
  username: string;
  email: string;
  profilePic?: string;
  aboutYou?: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiRegisterUrl = 'http://localhost:5000/api/auth/signup';
  private apiLoginUrl = 'http://localhost:5000/api/auth/login';

  private statusLoggedIn = new BehaviorSubject<boolean>(this.tokenExists());
  private currentUser = new BehaviorSubject<User | null>(
    this.getUserFromToken()
  );

  isLoggedIn$ = this.statusLoggedIn.asObservable();
  currentUser$ = this.currentUser.asObservable();

  constructor(private http: HttpClient) {}

  register(formData: FormData): Observable<any> {
    return this.http.post(this.apiRegisterUrl, formData);
  }

  login(loginData: any): Observable<any> {
    return this.http.post<{ token: string }>(this.apiLoginUrl, loginData).pipe(
      tap((response: { token: string }) => {
        if (response.token) {
          localStorage.setItem('authToken', response.token);
          this.statusLoggedIn.next(true);
          this.currentUser.next(this.getUserFromToken());
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem('authToken');
    this.statusLoggedIn.next(false);
    this.currentUser.next(null);
  }

  private tokenExists(): boolean {
    return !!localStorage.getItem('authToken');
  }

  private getUserFromToken(): User | null {
    const token = localStorage.getItem('authToken');
    if (token) {
      try {
        const decodedToken: { user: User } = jwtDecode(token);
        return decodedToken.user;
      } catch (error) {
        console.error('Toke broke', error);
        return null;
      }
    }
    return null;
  }
}
