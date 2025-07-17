import { Component, OnInit } from '@angular/core';
import { AuthService, User } from '../services/auth.service';
import { LibraryService } from '../services/library.service';
import { BookService } from '../services/book.service';

@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  currentUser: User | null = null;
  profilePicUrl: string | null = null;
  counts: any = {
    tbr: 0,
    currentlyreading: 0,
    read: 0,
  };

  constructor(
    private authService: AuthService,
    private libraryService: LibraryService,
    private bookService: BookService
  ) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe((user) => {
      this.currentUser = user;

      if (user && user.profilePic) {
        this.profilePicUrl = `http://localhost:5000/uploads/${user.profilePic}`;
      } else {
        this.profilePicUrl = './assets/default.jpg';
      }
    });

    this.libraryService.getLibrary().subscribe((bookIds) => {
      this.counts = {
        tbr: bookIds.tbr.length || 0,
        currentlyReading: bookIds.currentlyReading.length || 0,
        read: bookIds.read.lentgh || 0,
      };
    });
  }
}
