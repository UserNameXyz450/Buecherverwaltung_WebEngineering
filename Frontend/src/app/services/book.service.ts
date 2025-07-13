import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private googleApiUrl = 'https://www.googleapis.com/books/v1/volumes';
  private apiUrl = 'http://localhost:5000/api/library';

  constructor(private http: HttpClient) {}

  searchBooks(query: string): Observable<any[]> {
    const url = `${this.googleApiUrl}?q=${encodeURIComponent(query)}`; //Zeile ist KI-generiert
    return this.http.get<any>(url).pipe(map((data) => data.items || []));
  }

  getBookById(bookId: string): Observable<any> {
    const url = `${this.googleApiUrl}/${bookId}`;
    return this.http.get<any>(url);
  }

  // Mit Hilfe von KI erstellt:
  getBooksByIds(bookIds: string[]): Observable<any[]> {
    if (!bookIds || bookIds.length === 0) {
    return of([]);
  }

  const requests = bookIds.map((bookId) => {
    const url = `${this.googleApiUrl}/${bookId}`;
    return this.http.get<any>(url).pipe(
      map(book => ({
        id: book.id,
        title: book.volumeInfo?.title,
        authors: book.volumeInfo?.authors || [],
        coverImage: book.volumeInfo?.imageLinks?.thumbnail || '',
      }))
    );
  });

    return forkJoin(requests);
  }
}
