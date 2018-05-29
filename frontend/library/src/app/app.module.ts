import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {TokenInterceptor} from './service/token.interceptor';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { AdminComponent } from './admin/admin.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { AuthService } from './service/auth.service';
import { UserService } from './service/user.service';
import { AddUserComponent } from './admin/add-user/add-user.component';
import { RoleService} from './service/role.service';
import { RegisterComponent } from './register/register.component';
import { BooksComponent } from './admin/books/books.component';
import { GenresComponent } from './admin/genres/genres.component';
import { AuthorsComponent } from './admin/authors/authors.component';
import { AddGenreComponent } from './admin/add-genre/add-genre.component';
import { AddAuthorComponent } from './admin/add-author/add-author.component';
import { AddBookComponent } from './admin/add-book/add-book.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import { ReviewService } from './service/review.service';
import { MyBooksComponent } from './user/my-books/my-books.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserComponent,
    AdminComponent,
    NavBarComponent,
    AddUserComponent,
    RegisterComponent,
    BooksComponent,
    GenresComponent,
    AuthorsComponent,
    AddGenreComponent,
    AddAuthorComponent,
    AddBookComponent,
    BookDetailsComponent,
    MyBooksComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    AuthService,
    HttpClientModule,
    UserService,
    RoleService,
    ReviewService,
    {
      provide:HTTP_INTERCEPTORS,
      useClass:TokenInterceptor,
      multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
