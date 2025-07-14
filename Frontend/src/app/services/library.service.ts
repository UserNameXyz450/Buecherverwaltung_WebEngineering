import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class LibraryService {
  private apiUrl = 'http://localhost:5000/api/library';

  constructor(private http: HttpClient) { }

  getLibrary(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  addBookToList(listName: string, bookId: string): Observable<any> {
    console.log("function has been called!")
    return this.http.post(`${this.apiUrl}/${listName}`, {bookId});
  }
}
