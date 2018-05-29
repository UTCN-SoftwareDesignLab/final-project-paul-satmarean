import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { Http, Response } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap} from 'rxjs/operators';
import { AuthService } from './auth.service';
import { Router} from '@angular/router';

import {Author} from '../entity/author';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  authorUrl = "http://localhost:8080/api/authors/"
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
  
  public getAuthors():Observable<Author[]>{
    return this.http.get<Author[]>(this.authorUrl, this.httpOptions)
    .pipe(
      catchError(this.handleError('getAuthors',[]))
    );
  }

  public addAuthor(author :string):Observable<any>{
    return this.http.post(this.authorUrl, author, this.httpOptions)
      .pipe(
        tap(user =>{
          if(user!=null){
            this.router.navigateByUrl("/authors");
          }
        }
        ),
        tap(_ => this.log(`Sent author ${author}`)),
        catchError(this.handleError<any>("addAuthor"))
      );
  }

  public getAuthor(id:number):Observable<Author>{
    const url = `${this.authorUrl}${id}`;
    return this.http.get<Author>(url, this.httpOptions)
      .pipe(
        catchError(this.handleError<Author>("getAuthor"))
      );
  }

  public deleteAuthor(id:number):Observable<any>{
    const url = `${this.authorUrl}${id}`;
    return this.http.delete<any>(url, this.httpOptions)
      .pipe(
        catchError(this.handleError<string>("deleteAuthor"))
      );
  }

  private handleError<T> (operation = 'operation', result?: T){
    return (error: any): Observable<T> => {
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    }
  }

  private log(message:string){
    console.log(`GetAuthor: ${message}`);
  }



}
