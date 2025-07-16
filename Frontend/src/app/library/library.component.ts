import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { LibraryService } from '../services/library.service';
import { BookService } from '../services/book.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-library',
  imports: [CommonModule, FormsModule],
  templateUrl: './library.component.html',
  styleUrl: './library.component.css',
})
export class LibraryComponent {
  tbrBooks: any[] = [];
  currentlyReadingBooks: any[] = [];
  readBooks: any[] = [];
  selectedBooks: any[] = [];
  currentShelf: 'tbr' | 'currentlyReading' | 'read' = 'tbr';
  sortAscending: boolean = true;
  sortBy: any = 'title';

  constructor(
    private libraryService: LibraryService,
    private bookService: BookService
  ) { }

  ngOnInit(): void {
    this.loadLibrary();
  }

  loadLibrary(): void {
    this.libraryService.getLibrary().subscribe((data) => {
      this.bookService.getBooksByIds(data.tbr).subscribe(books => {
        this.tbrBooks = books;

        this.setShelf(this.currentShelf);

      });
      this.bookService.getBooksByIds(data.currentlyReading).subscribe(books => {
        this.currentlyReadingBooks = books;

        this.setShelf(this.currentShelf);
      });
      this.bookService.getBooksByIds(data.read).subscribe(books => {
        this.readBooks = books;

        this.setShelf(this.currentShelf);
      });
    });
  }

  setShelf(shelf: 'tbr' | 'currentlyReading' | 'read') {
    this.currentShelf = shelf;
    if(shelf === 'tbr') {
      this.selectedBooks = this.tbrBooks;
    } else if(shelf === 'currentlyReading') {
      this.selectedBooks = this.currentlyReadingBooks;
    } else {
      this.selectedBooks = this.readBooks;
    }

    this.sortBooks();
  }

  sortBooks() {
    this.selectedBooks = [...this.selectedBooks].sort((a, b) => {
      let valueA = a[this.sortBy];
      let valueB = b[this.sortBy];

      if(this.sortBy === 'publishedDate') {
        valueA = new Date(valueA);
        valueB = new Date(valueB);
      }

      if(this.sortAscending ? valueA < valueB : valueA > valueB) {
        return -1;
      } else if(valueA === valueB) {
        return 0;
      } else {
        return 1;
      }
    });
    
  }
}
