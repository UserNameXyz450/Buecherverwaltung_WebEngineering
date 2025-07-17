import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../services/book.service';
import { Observable, switchMap } from 'rxjs';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { LibraryService } from '../services/library.service';
import { ReviewService } from '../services/review.service';
import { format } from 'date-fns';
import { StarRatingComponent } from '../star-rating/star-rating.component';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-article',
  imports: [CommonModule, StarRatingComponent],
  templateUrl: './article.component.html',
  styleUrl: './article.component.css',
})
export class ArticleComponent implements OnInit {
  book!: any;
  message: string | null = null;
  reviews: any[] = [];
  ratings: any;
  uploadsUrl = 'http://localhost:5000/uploads';
  sanitizedDescription: SafeHtml = '';

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    private libraryService: LibraryService,
    private reviewService: ReviewService,
    private router: Router,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const bookId = params.get('id');
      if (bookId) {
        this.setBook(bookId);
      }
    });
  }

  setBook(bookId: string): void {
    this.setReviews(bookId);
    this.bookService.getBookById(bookId).subscribe((book) => {
      this.sanitizedDescription = this.sanitizer.bypassSecurityTrustHtml(
        book.volumeInfo.description
      );
      this.book = book;
      console.log(this.book);
    });
  }

  setReviews(bookId: string): void {
    this.reviewService.getReviewsOfBook(bookId).subscribe((reviews) => {
      if (reviews && reviews.length > 0) {
        this.reviews = reviews;
        const ratings = reviews.map((review: any) => review.rating);
        const ratingsSum = ratings.reduce(
          (sum: number, currentRating: number) => sum + currentRating,
          0
        );
        this.ratings = {
          average: ratingsSum / ratings.length,
          count: ratings.length,
        };
      } else {
        this.ratings = { average: 0, count: 0 };
      }
    });
  }

  getProfilePicUrl(profilePic: string): string {
    if (profilePic) {
      return `${this.uploadsUrl}/${profilePic}`;
    } else {
      return '../assets/default.jpg';
    }
  }

  parseDate(timestamp: string): string {
    return format(new Date(timestamp), 'dd.MM.yyyy');
  }

  writeReview(book: any): void {
    this.router.navigate(['/write-review', book.id]);
  }

  addToList(listName: 'tbr' | 'currentlyReading', bookFromApi: any): void {
    this.libraryService.addBookToList(listName, bookFromApi.id).subscribe({
      next: (response) => {
        this.message = response.message;
      },
      error: (err) => {
        this.message = err.error?.message || 'An error occured';
      },
    });
  }
}
