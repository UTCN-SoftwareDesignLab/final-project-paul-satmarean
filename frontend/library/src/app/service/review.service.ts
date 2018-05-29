import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { Http, Response } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap} from 'rxjs/operators';
import { AuthService } from './auth.service';
import { Router} from '@angular/router';

import {Review} from '../entity/review';
@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  reviewUrl = "http://localhost:8080/api/reviews/book/"

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

  public getReviews(id:number):Observable<Review[]>{
    let url= `${this.reviewUrl}${id}`
    return this.http.get<Review[]>(url, this.httpOptions)
    .pipe(
      catchError(this.handleError('getReviews',[]))
    );
  }

  public addReview(review :string):Observable<any>{
    let url= "http://localhost:8080/api/reviews/"
    return this.http.post(url, review, this.httpOptions)
      .pipe(
        catchError(this.handleError<any>("addReview"))
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
