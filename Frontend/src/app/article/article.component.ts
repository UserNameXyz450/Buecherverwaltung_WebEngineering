import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../services/book.service';
import { Observable, switchMap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { LibraryService } from '../services/library.service';

@Component({
  selector: 'app-article',
  imports: [CommonModule],
  templateUrl: './article.component.html',
  styleUrl: './article.component.css',
})
export class ArticleComponent implements OnInit {
  book$!: Observable<any>;
  message: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    private libraryService: LibraryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.book$ = this.route.paramMap.pipe(
      switchMap((params) => {
        const bookId = params.get('id');
        if (bookId) {
          return this.bookService.getBookById(bookId);
        }
        return [];
      })
    );
  }

  writeReview(book: any): void {
    this.router.navigate(['/write-review', book.id]);
  }

  addToList(listName: 'tbr' | 'currentlyReading', bookFromApi: any): void {
    const bookData = {
      apiId: bookFromApi.id,
      title: bookFromApi.volumeInfo.title,
      authors: bookFromApi.volumeInfo.authors,
      description: bookFromApi.volumeInfo.description,
      coverImage: bookFromApi.volumeInfo.imageLinks?.thumbnail
    };

    this.libraryService.addBookToList(listName, bookData).subscribe({
      next: (response) => {
        this.message = response.message;
      },
      error: (err) => {
        this.message = err.error?.message || 'An error occured';
      }
    })
  }
}
