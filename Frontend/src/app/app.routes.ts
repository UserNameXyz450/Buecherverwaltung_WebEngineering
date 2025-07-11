import { Routes, RouterModule } from '@angular/router';
import { NavbarComponent} from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import {RegisterComponent } from './register/register.component';
import {NgModule} from '@angular/core';
import { SearchComponent } from './search/search.component';
import { LibraryComponent } from './library/library.component';
import { ArticleComponent } from './article/article.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  {path: 'navbar', component: NavbarComponent},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'search', component: SearchComponent },
  {path: 'library', component: LibraryComponent},
  { path: 'book/:id', component: ArticleComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
  private apiUrl = '';
}
