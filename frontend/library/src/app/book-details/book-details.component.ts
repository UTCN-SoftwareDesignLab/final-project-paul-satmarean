import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { BookService } from '../service/book.service';

import { Book } from '../entity/book';
import { Review} from '../entity/review';
import { ReviewService } from '../service/review.service';
import { UserService } from '../service/user.service';
import { User } from '../entity/user';
import { HistoryService } from '../service/history.service';
@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {

  book:Book;
  id:number;
  reviews:Review[];
  user:User;
  review:string;

  constructor(
    private route:ActivatedRoute,
    private auth:AuthService,
    private bookService:BookService,
    private router:Router,
    private reviewService:ReviewService,
    private userService:UserService,
    private historyService:HistoryService
  ) { }

  ngOnInit() {
    if(!this.auth.isAuthenticated()){
      this.router.navigateByUrl('/login');
    }
    this.id = +this.route.snapshot.paramMap.get("id");
    this.review="";
    this.getBook();
    this.getReviews();
    this.getUser();

  }
  getUser():void{
    this.userService.getUser(this.auth.getUsername())
    .subscribe(
      (user:User)=>{
        this.user=user;
        // console.log(book);
      },
      (err:any)=>{
        console.log(err);
      }
    );
  }

  getReviews():void{
    this.reviewService.getReviews(this.id)
    .subscribe(
      (reviews:Review[])=>{
        this.reviews=reviews;
        // console.log(reviews);
      },
      (err:any)=>{
        console.log(err);
      }
    );
  }


  addHistory():void{
    let body= JSON.stringify({
      "id":null,
      "user":null,
      "book":this.book,
      "start_date":null,
      "end_date":null,
      "return_date":null,
      "status":false
    }
  );
  console.log(body);
  this.historyService.addHistory(body)
  .subscribe(
    (err:any)=>{
      console.log(err);
    }
  )
  }


  getBook():void{
    this.bookService.getBook(this.id)
    .subscribe(
      (book:Book)=>{
        this.book=book;
        // console.log(book);
      },
      (err:any)=>{
        console.log(err);
      }
    );
  }

  isAvailable():boolean{
    if(this.book.available>0){
      return true;
    }
    return false;
  }

  addReview(){
    let body = JSON.stringify(
      {
        "id":null,
        "book":this.book,
        "review":this.review,
        "user":null
      }
    );

    console.log(body);

    this.reviewService.addReview(body)
    .subscribe(
      (review:Review)=>{
        this.reviews.concat(review);
        console.log(review);
      },
      (err:any)=>{
        console.log(err);
      }
    )
  }



}
