import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  imageURL = "https://i.pravatar.cc/#100#"
  name: string = "Name";
  private number: number = Number(Math.random()*10);
  changePicture(): void {
    this.number = Number(Math.random()*10);
    this.imageURL = `https://i.pravatar.cc/#${this.number}#`
    console.log(this.imageURL);
  }
}
