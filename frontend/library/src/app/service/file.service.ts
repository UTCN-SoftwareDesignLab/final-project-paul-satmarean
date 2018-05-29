import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/Observable/of';
import { Http, Response } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

import { RouterLink } from '@angular/router/src/directives/router_link';
import { RouterModule } from '@angular/router/src/router_module';

const httpOptions = {
  headers: new HttpHeaders({
    'Access-Control-Allow-Origin': "*"
  })
};
@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(
    private http: HttpClient
  ) { }

  sendImage(selectedFile): Observable<any> {
    let formData = new FormData();
    formData.append("file", selectedFile);

    console.log(formData);

    let productInfo;

    return this.http.post('http://localhost:8080/api/image/' + selectedFile.name, formData, httpOptions)
      .pipe(
        catchError(this.handleError<any>('sendImage'))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    }
  }

  log(message: string): void {
    console.log(message);
  }
}
