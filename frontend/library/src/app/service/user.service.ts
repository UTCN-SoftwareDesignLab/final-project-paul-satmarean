import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { Http, Response } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap} from 'rxjs/operators';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { User } from '../entity/user';
import { Role } from '../entity/role';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userUrl = "http://localhost:8080/api/users/"


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

  public getUsers():Observable<User[]>{
    return this.http.get<User[]>(this.userUrl, this.httpOptions)
    .pipe(
      catchError(this.handleError('getUsers',[]))
    );
  }

  public getUser(username:string):Observable<User>{
    let url=`${this.userUrl}/name=${username}`
    return this.http.get<User>(url, this.httpOptions)
    .pipe(
      catchError(this.handleError<User>("getUser"))
    );
  }

  public addUser(user :string):Observable<any>{
    return this.http.post(this.userUrl, user, this.httpOptions)
      .pipe(
        tap(user =>{
          if(user!=null){
            this.router.navigateByUrl("/admin");
          }
        }
        ),
        tap(_ => this.log(`Sent user ${user}`)),
        catchError(this.handleError<any>("addUser"))
      );
  }

  public deleteUser(id:number):Observable<any>{
    const url = `${this.userUrl}${id}`;
    return this.http.delete<any>(url, this.httpOptions)
      .pipe(
        catchError(this.handleError<string>("deleteUser"))
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
