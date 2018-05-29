import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { Http, Response } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap} from 'rxjs/operators';
import { AuthService } from './auth.service';

import {Role} from '../entity/role';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  rolesUrs = "http://localhost:8080/api/roles/"


  constructor(
    private http:HttpClient
  ) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin':"*"
    })
  };

  public getRoles():Observable<Role[]>{
    return this.http.get<Role[]>(this.rolesUrs, this.httpOptions)
    .pipe(
      catchError(this.handleError('getRoles',[]))
    );
  }

  private handleError<T> (operation = 'operation', result?: T){
    return (error: any): Observable<T> => {
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    }
  }

  private log(message:string){
    console.log(`GetRoles: ${message}`);
  }
}
