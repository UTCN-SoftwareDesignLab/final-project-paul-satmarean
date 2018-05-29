import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { Router} from '@angular/router';
import { BookService } from '../../service/book.service';
import { Book} from '../../entity/book';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

  books:Book[];

  constructor(
    private auth:AuthService,
    private router:Router,
    private bookService:BookService
  ) { }

  ngOnInit() {
    if (!this.auth.isAuthenticated()){
      this.router.navigateByUrl('/login');
    }else{
     if(!this.auth.isAdmin()){
       this.router.navigateByUrl('/user');
     }
    }
    this.getBooks();
  }


  getBooks():void{
    this.bookService.getBooks()
    .subscribe(
      (books:Book[])=>{
        this.books = books;
        console.log(books);
      },
      (err:any)=>{
        console.log(err);
      }
    );
  }

  delete(id:number):void{
    this.books = this.books.filter(x => x.id!=id);
    this.bookService.deleteBook(id).subscribe(
      (err:any)=>{
        console.log("Could not delete")
      }
    );
  }

}
