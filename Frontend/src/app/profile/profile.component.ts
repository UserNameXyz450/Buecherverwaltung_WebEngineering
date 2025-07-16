import { Component, OnInit } from '@angular/core';
import { AuthService, User } from '../services/auth.service';

@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{

  currentUser: User | null = null;
  profilePicUrl: string | null = null;
  
  constructor(private authService: AuthService) {}
  
  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;

      if(user && user.profilePic) {
        this.profilePicUrl = `http://localhost:5000/uploads/${user.profilePic}`;
      } else {
        this.profilePicUrl = './assets/default.jpg';
      }
    });
  }

}
