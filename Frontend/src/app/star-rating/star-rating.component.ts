import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.css'],
})
export class StarRatingComponent {
  @Input() rating: number = 0;
  @Input() clickable: boolean = false;
  @Output() ratingChange = new EventEmitter<number>(); // KI

  getStars(): ('full' | 'half' | 'empty')[] {
    const stars: ('full' | 'half' | 'empty')[] = [];
    let remaining = this.rating;

    for (let i = 0; i < 5; i++) {
      if (remaining >= 1) {
        stars.push('full');
      } else if (remaining >= 0.5) {
        stars.push('half');
      } else {
        stars.push('empty');
      }
      remaining -= 1;
    }

    return stars;
  }

  starClicked(index: number) {
    this.ratingChange.emit(index + 1);
  }
}
