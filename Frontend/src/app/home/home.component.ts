import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService, User } from '../services/auth.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { NgIf } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';
import { LibraryService } from '../services/library.service';
import { BookService } from '../services/book.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [CommonModule, FormsModule, NgIf, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  isLoggedIn$: Observable<boolean>;
  currentUser$: Observable<User | null>;
  isUserLoggedIn: boolean = false;
  showPopup: boolean = false;
  isLoading: boolean = false;

  currentlySearchingForBooks: boolean = true;

  topic: string | undefined;
  books: any[] = [];
  currentlyReadingBooks: any[] = [];
  currentTheme: string = '';
  themes: string[] = [
    'science',
    'history',
    'art',
    'architecture',
    'fashion',
    'psychology',
    'flowers',
    'coffee',
    'cat',
    'fish',
    'forest',
    'news',
    'travel',
    'cooking',
    'science fiction',
    'biography',
    'culture',
    'music',
    'astronomy',
    'politics',
    'technology',
    'sports',
    'mythology',
    'law',
    'philosophy',
    'comics',
    'radio',
    'city',
    'books',
    'water',
    'cinema',
    'poems',
  ];

  constructor(
    private authService: AuthService,
    private libraryService: LibraryService,
    private bookService: BookService
  ) {
    this.isLoggedIn$ = this.authService.isLoggedIn$;
    this.currentUser$ = this.authService.currentUser$;
    this.authService.isLoggedIn$.subscribe((status) => {
      this.isUserLoggedIn = status;
    });
  }

  ngOnInit() {
    this.isLoggedIn$.subscribe((status) => {
      this.isUserLoggedIn = status;
    });
    this.showDifferentBooks();
    if (this.isUserLoggedIn) {
      this.libraryService.getLibrary().subscribe((bookIds) => {
        console.log(bookIds);
        this.bookService
          .getBooksByIds(bookIds.currentlyReading)
          .subscribe((books) => {
            this.currentlyReadingBooks = books;
          });
      });
    }
  }

  getRandomBookTheme() {
    const themeIndex = Math.floor(Math.random() * this.themes.length);
    this.currentTheme = this.themes[themeIndex];
    return this.themes[themeIndex];
  }

  closePopup() {
    this.showPopup = false;
  }

  showDifferentBooks() {
    this.currentlySearchingForBooks = true;
    this.bookService
      .searchTopicBooks(this.getRandomBookTheme())
      .subscribe((books) => {
        console.log(books);
        this.books = books;
        this.currentlySearchingForBooks = false;
      });
  }
}
