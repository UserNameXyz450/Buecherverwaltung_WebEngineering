import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { LibraryService } from '../services/library.service';
import { BookService } from '../services/book.service';

@Component({
  selector: 'app-library',
  imports: [CommonModule],
  templateUrl: './library.component.html',
  styleUrl: './library.component.css',
})
export class LibraryComponent {
  tbrBooks: any[] = [];
  currentlyReadingBooks: any[] = [];
  readBooks: any[] = [];

  constructor(
    private libraryService: LibraryService,
    private bookServcie: BookService
  ) {}

  ngOnInit(): void {
    this.loadLibrary();
  }

  loadLibrary(): void {
    this.libraryService.getLibrary().subscribe((data) => {
      this.bookServcie.getBooksByIds(data.tbr).subscribe(books => {
        this.tbrBooks = books;
      });
      this.bookServcie.getBooksByIds(data.currentlyReading).subscribe(books => {
        this.currentlyReadingBooks = books;
      });
      this.bookServcie.getBooksByIds(data.read).subscribe(books => {
        this.readBooks = books;
      });
    });
  }
}
