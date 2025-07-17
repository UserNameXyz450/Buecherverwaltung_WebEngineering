import { Component, OnInit,  } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import { AuthService, User } from '../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [
    RouterLink,
    CommonModule
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{

  isLoggedIn: boolean = false;
  currentUser: User | null = null;
  profilePicUrl: string | null = null;

  constructor(private authService: AuthService, private router: Router) {

  }

  ngOnInit(): void {
    this.authService.isLoggedIn$.subscribe(status => {
      this.isLoggedIn = status;
    });

    this.authService.currentUser$.subscribe(user =>  {
      console.log('Current user from AuthService:', user);
      this.currentUser = user;

    if(user && user.profilePic) {
      //Ki-generiert

      this.profilePicUrl = `http://localhost:5000/uploads/${user.profilePic}`;
    } else {
      this.profilePicUrl = '../assets/default.jpg';
    }
    
    });
  }

  onSearch(query: String): void {
    if(query) {
      this.router.navigate(['/search'], {queryParams: {q: query}});
    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }

}
