import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private googleApiUrl = 'https://www.googleapis.com/books/v1/volumes';
  private apiUrl = 'http://localhost:5000/api/library';

  constructor(private http: HttpClient) { }

  searchBooks(query: string): Observable<any[]> {
    const url = `${this.googleApiUrl}?q=${encodeURIComponent(query)}`; //Zeile ist KI-generiert
    return this.http.get<any>(url).pipe(
      map(data => data.items || [])
    );
  }

  getBookById(bookId: any): Observable<any> {
    const url = `${this.googleApiUrl}/${bookId}`;
    return this.http.get<any>(url);
  }
}
