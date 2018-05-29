import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { Router} from '@angular/router';
import { BookService } from '../../service/book.service';
import { Book} from '../../entity/book';
import { History } from '../../entity/history';
import { HistoryService } from '../../service/history.service';

@Component({
  selector: 'app-my-books',
  templateUrl: './my-books.component.html',
  styleUrls: ['./my-books.component.css']
})
export class MyBooksComponent implements OnInit {

  histories:History[];


  constructor(
    private auth:AuthService,
    private router:Router,
    private bookService:BookService,
    private historyService:HistoryService
  ) { }

  ngOnInit() {
    if (!this.auth.isAuthenticated()){
      this.router.navigateByUrl('/login');
    }
    this.getHistory();
  }

  getHistory():void{
    this.historyService.getByUser()
    .subscribe(
      (histories:History[])=>{
        this.histories= histories;
      },
      (err:any)=>{
        console.log(err);
      }
    )
  }

  return(id:number):void{
    let history = this.histories.filter(x=> x.id==id)[0];
    let body=JSON.stringify(history);
    console.log(body);

    this.historyService.editHistory(body)
    .subscribe(
      (err:any)=>{
        console.log(err);
      }
    );
  }

}
