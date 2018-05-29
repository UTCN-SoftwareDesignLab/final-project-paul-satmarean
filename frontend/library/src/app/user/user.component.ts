import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from '../service/book.service';
import { FileService } from '../service/file.service';
import { AuthService } from '../service/auth.service';

import {Book} from '../entity/book';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  books:Book[];

  constructor(
    private auth:AuthService,
    private router:Router,
    private bookService:BookService,
    private fileService:FileService
  ) { }

  ngOnInit() {
    this.getBooks();
  }
  
  getBooks():void{
    this.bookService.getBooks()
    .subscribe(
      (res:Book[]) =>{
        this.books = res;
        console.log(res);
      },
      (err:any) =>{
        console.log(err);
      }
    )
  }

}
