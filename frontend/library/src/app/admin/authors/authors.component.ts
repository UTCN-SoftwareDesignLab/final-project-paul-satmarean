import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { Router} from '@angular/router';
import { AuthorService } from '../../service/author.service';

import { Author } from '../../entity/author';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css']
})
export class AuthorsComponent implements OnInit {

  authors:Author[];

  constructor(
    private auth:AuthService,
    private router:Router,
    private authorService:AuthorService
  ) { }

  ngOnInit() {
    if (!this.auth.isAuthenticated()){
      this.router.navigateByUrl('/login');
    }else{
     if(!this.auth.isAdmin()){
       this.router.navigateByUrl('/user');
     }
    }
    this.getAuthors();
  }

  getAuthors():void{
    this.authorService.getAuthors()
    .subscribe(
      (authors:Author[]) => {
        console.log(authors);
        this.authors= authors;
      },
      (err:any) =>{
        console.log(err);
      }
    );
  }

  delete(id:number):void{
    this.authors = this.authors.filter(x => x.id!=id);
    this.authorService.deleteAuthor(id).subscribe(
      (err:any)=>{
        console.log("Could not delete")
      }
    );
  }



}
