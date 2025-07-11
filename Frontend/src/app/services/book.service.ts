import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private apiUrl = 'https://www.googleapis.com/books/v1/volumes';

  constructor(private http: HttpClient) { }

  searchBooks(query: string): Observable<any[]> {
    const url = `${this.apiUrl}?q=${encodeURIComponent(query)}`; //Zeile ist KI-generiert
    return this.http.get<any>(url).pipe(
      map(data => data.items || [])
    );
  }

  getBookById(bookId: string): Observable<any> {
    const url = `${this.apiUrl}/${bookId}`;
    return this.http.get<any>(url);
  }
}
