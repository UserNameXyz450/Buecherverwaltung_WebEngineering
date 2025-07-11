import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { LibraryService } from '../services/library.service';

@Component({
  selector: 'app-library',
  imports: [CommonModule],
  templateUrl: './library.component.html',
  styleUrl: './library.component.css'
})
export class LibraryComponent {
  tbrBooks: any[] = [];
  currentlyReadingBooks: any[] = [];
  readReviews: any[] = [];

  constructor(private libraryService: LibraryService) {

  }

  ngOnInit(): void {
    this.loadLibrary();
  }

  loadLibrary(): void {
    this.libraryService.getLibrary().subscribe(data => {
      this.tbrBooks = data.tbr;
      this.currentlyReadingBooks = data.currentlyReading;
      this.readReviews = data.read;
    })
  }
}
