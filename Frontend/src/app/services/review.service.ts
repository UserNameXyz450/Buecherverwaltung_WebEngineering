import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  private apiUrl = 'http://localhost:5000/api';

  constructor(private http: HttpClient) {}

  writeReview(bookId: string, rating: number, review: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/books/${bookId}/reviews`, {
      bookId,
      rating,
      review,
    });
  }

  getReviewOfUser(bookId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/books/${bookId}/review`);
  }

  getReviewsOfUser(): Observable<any> {
    return this.http.get(`${this.apiUrl}/user/reviews`);
  }

  getReviewsOfBook(bookId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/books/${bookId}/reviews`);
  }
}
