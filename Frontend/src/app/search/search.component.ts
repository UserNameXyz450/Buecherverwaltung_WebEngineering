import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { switchMap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { BookService } from '../services/book.service';

@Component({
  selector: 'app-search',
  imports: [CommonModule, RouterLink],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  searchResults$!: Observable<any[]>;

  constructor(private route: ActivatedRoute, private bookService: BookService) {

  }

  ngOnInit(): void {
    this.searchResults$ = this.route.queryParamMap.pipe(
      switchMap(params => {
        const query = params.get('q') || '';
        return this.bookService.searchBooks(query);
      })
    )
  }
}
