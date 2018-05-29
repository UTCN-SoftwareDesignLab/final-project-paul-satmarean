import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { Http, Response } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap} from 'rxjs/operators';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

import { RouterLink } from '@angular/router/src/directives/router_link';
import { RouterModule } from '@angular/router/src/router_module';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin':"*"
  })
};
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authUrl = "http://localhost:8080/api/login/";
  private headers: Headers;

  private name:string;
  private roles:string[];
  private token:string;
  private jwtHelper: JwtHelperService;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
      this.jwtHelper = new JwtHelperService();
      this.token = localStorage.getItem('token');
      if(this.token != null){
        this.decodeJwt();
      }

   }

   public getToken():string{
    return localStorage.getItem("token");
  }

  public login(username:string, password:string):Observable<boolean>{
    let body = JSON.stringify(
      {
        "username":username,
        "password":password
      }
    );
    return this.http.post(this.authUrl, body, httpOptions)
      .pipe(
        map(response => {
          this.token = response["token"];
          localStorage.setItem('token',this.token);
          console.log(this.token);
          this.decodeJwt();
          return true;
        }),
        catchError(this.handleError<boolean>('login'))
      ); 
  }

  public getUsername():string{
    return this.name;
  }

  public isAdmin(): Boolean{
    if(!this.isAuthenticated())
      return false;

    return (this.roles.includes('ADMINISTRATOR')); 
  }
  public isUser(): Boolean{
    if(!this.isAuthenticated())
    return false;

    return (this.roles.includes('USER')); 
  }


  public isAuthenticated():boolean{
    if(this.name == null){
      return false;
    }
    if(this.roles == null){
      return false;
    }
    if(this.jwtHelper.isTokenExpired(this.token)){
      return false;
    }
    return true;
  }
  public logOut():void {
    localStorage.clear();
    this.name=null;
    this.roles=null;
  }

  private handleError<T> (operation = 'operation', result?: T){
    return (error: any): Observable<T> => {
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    }
  }

  log(message: string):void{
    console.log(message);
  }

  private decodeJwt():void {
    let decodedToken = this.jwtHelper.decodeToken(this.token);
    this.name= decodedToken.sub;
    this.roles= decodedToken.roles;
    console.log(this.roles);
    console.log(`User ${this.name} logged in`);
  }
  
}
