import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private apiUrl = 'http://localhost:5000/api/reviews';

  constructor(private http: HttpClient) { }

  writeReview(bookObject: any, rating: number, review:string): Observable<any> {
    return this.http.post(`${this.apiUrl}/reviews`, {book: bookObject, rating, review});
  }
}
