import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { Http, Response } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap} from 'rxjs/operators';
import { AuthService } from './auth.service';
import { Router} from '@angular/router';
import {Book} from '../entity/book';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  booksUrl = "http://localhost:8080/api/books/"
  constructor(
    private http:HttpClient,
    private router:Router
  ) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin':"*"
    })
  };
  
  public getBooks():Observable<Book[]>{
    return this.http.get<Book[]>(this.booksUrl, this.httpOptions)
    .pipe(
      catchError(this.handleError('getBooks',[]))
    );
  }

  public addBook(book :string):Observable<any>{
    return this.http.post(this.booksUrl, book, this.httpOptions)
      .pipe(
        tap(user =>{
          if(user!=null){
            this.router.navigateByUrl("/admin/books");
          }
        }
        ),
        tap(_ => this.log(`Sent book ${book}`)),
        catchError(this.handleError<any>("addBook"))
      );
  }

  public getBook(id:number):Observable<Book>{
    const url = `${this.booksUrl}${id}`;
    return this.http.get<Book>(url, this.httpOptions)
      .pipe(
        catchError(this.handleError<Book>("getBook"))
      );
  }

  public deleteBook(id:number):Observable<any>{
    const url = `${this.booksUrl}${id}`;
    return this.http.delete<any>(url, this.httpOptions)
      .pipe(
        catchError(this.handleError<string>("deleteBook"))
      );
  }

  private handleError<T> (operation = 'operation', result?: T){
    return (error: any): Observable<T> => {
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    }
  }

  private log(message:string){
    console.log(`GetBooks: ${message}`);
  }
}
