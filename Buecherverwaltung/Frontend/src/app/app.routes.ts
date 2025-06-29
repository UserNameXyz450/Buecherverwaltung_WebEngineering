import { Routes, RouterModule } from '@angular/router';
import { NavbarComponent} from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import {RegisterComponent } from './register/register.component';
import {NgModule} from '@angular/core';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  {path: 'navbar', component: NavbarComponent},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
