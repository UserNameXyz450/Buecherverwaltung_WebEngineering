import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Observable, switchMap, tap } from 'rxjs';
import { BookService } from '../services/book.service';
import { ReviewService } from '../services/review.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-write-review',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './write-review.component.html',
  styleUrl: './write-review.component.css',
})
export class WriteReviewComponent implements OnInit {
  book$!: Observable<any>;
  reviewForm!: FormGroup;
  message: string | null = null;
  private currentBook: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bookService: BookService,
    private reviewService: ReviewService
  ) {}

  ngOnInit(): void {
    this.reviewForm = new FormGroup({
      rating: new FormControl(null, Validators.required),
      comment: new FormControl(''),
    });

    const bookId = this.route.snapshot.paramMap.get('id')!;
    if (bookId) {
      this.book$ = this.bookService
        .getBookById(bookId)
        .pipe(tap((book) => (this.currentBook = book)));
    }
    this.reviewService.getReviewOfUser(bookId).subscribe((review) => {
      console.log(review);
    });
    this.reviewService.getReviewsOfBook(bookId).subscribe((reviews) => {
      console.log(reviews);
    });
  }

  setRating(rating: number): void {
    this.reviewForm.get('rating')?.setValue(rating);
  }

  onSubmit(): void {
    if (this.reviewForm.invalid) {
      this.message = 'Please provide a rating';
      return;
    }

    const rating = this.reviewForm.value.rating;
    const comment = this.reviewForm.value.comment;

    this.reviewService
      .writeReview(this.currentBook.id, rating, comment)
      .subscribe({
        next: (response) => {
          this.message = response.message;
          this.router.navigate(['book', this.currentBook.id]);
        },
        error: (err) => {
          this.message =
            err.error?.message || 'Failed to submit review in write review';
        },
      });
  }
}
