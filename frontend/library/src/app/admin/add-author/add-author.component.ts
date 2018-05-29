import { Component, OnInit } from '@angular/core';
import { AuthorService } from '../../service/author.service';
import { AuthService} from '../../service/auth.service';
import { Router } from '@angular/router';
import { Author} from '../../entity/author';

@Component({
  selector: 'app-add-author',
  templateUrl: './add-author.component.html',
  styleUrls: ['./add-author.component.css']
})
export class AddAuthorComponent implements OnInit {

  name:string;
  description:string;

  constructor(
    private auth:AuthService,
    private authorService:AuthorService,
    private router:Router
  ) { }

  ngOnInit() {
    if (!this.auth.isAuthenticated()){
      this.router.navigateByUrl('/login');
    }else{
      if(!this.auth.isAdmin()){
        this.router.navigateByUrl('/user');
      }
    }
    this.name="";
    this.description="";
  }

  public addAuthor(){
    let body = JSON.stringify(
      {
        "id":null,
        "name":this.name,
        "description":this.description
      }
    );

    console.log(body);
    this.authorService.addAuthor(body)
    .subscribe(
      (author:Author)=>{
        console.log(author);
        this.router.navigateByUrl('/authors');
      }
    )
  }


}
