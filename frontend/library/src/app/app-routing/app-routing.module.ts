import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes, Router} from '@angular/router';

import { UserComponent } from '../user/user.component';
import { AdminComponent} from '../admin/admin.component';
import {LoginComponent} from '../login/login.component';
import { AddUserComponent } from '../admin/add-user/add-user.component';
import { RegisterComponent } from '../register/register.component';
import { BooksComponent } from '../admin/books/books.component';
import { GenresComponent } from '../admin/genres/genres.component';
import { AuthorsComponent } from '../admin/authors/authors.component';
import { AddGenreComponent } from '../admin/add-genre/add-genre.component';
import { AddAuthorComponent } from '../admin/add-author/add-author.component';
import { AddBookComponent } from '../admin/add-book/add-book.component';
import { BookDetailsComponent } from '../book-details/book-details.component';
import { MyBooksComponent } from '../user/my-books/my-books.component';

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'admin', component:AdminComponent},
  {path: 'user', component:UserComponent},
  {path: 'addUser', component:AddUserComponent},
  {path: 'register', component:RegisterComponent},
  {path: 'admin/books', component:BooksComponent},
  {path: 'genres', component:GenresComponent},
  {path: 'authors', component:AuthorsComponent},
  {path: 'addGenre', component:AddGenreComponent},
  {path: 'addAuthor', component:AddAuthorComponent},
  {path: 'addBook', component:AddBookComponent},
  {path: 'book/:id', component:BookDetailsComponent},
  {path: 'myBooks', component:MyBooksComponent}
]
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports:[
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
