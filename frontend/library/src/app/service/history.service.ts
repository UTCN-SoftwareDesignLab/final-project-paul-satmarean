import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { Http, Response } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap} from 'rxjs/operators';
import { AuthService } from './auth.service';
import { Router} from '@angular/router';
import {History} from '../entity/history';
@Injectable({
  providedIn: 'root'
})
export class HistoryService {
  historyUrl = "http://localhost:8080/api/history/"

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

  //all
  public getHistory():Observable<History[]>{
    return this.http.get<History[]>(this.historyUrl, this.httpOptions)
    .pipe(
      catchError(this.handleError('getHistory',[]))
    );
  }

  //just for current user
  public getByUser():Observable<History[]>{
    let url = `${this.historyUrl}user/`;
    return this.http.get<History[]>(url, this.httpOptions)
    .pipe(
      catchError(this.handleError('getHistory',[]))
    );
  }


  public addHistory(history :string):Observable<any>{
    return this.http.post(this.historyUrl, history, this.httpOptions)
      .pipe(
        catchError(this.handleError<any>("addAuthor"))
      );
  }

  // public getAuthor(id:number):Observable<Author>{
  //   const url = `${this.authorUrl}${id}`;
  //   return this.http.get<Author>(url, this.httpOptions)
  //     .pipe(
  //       catchError(this.handleError<Author>("getAuthor"))
  //     );
  // }

  public editHistory(body:string):Observable<History>{

    return this.http.put<History>(this.historyUrl,body, this.httpOptions)
      .pipe(
        catchError(this.handleError<History>("editHistory"))
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
