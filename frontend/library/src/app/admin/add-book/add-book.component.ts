import { Component, OnInit } from '@angular/core';

import { Genre } from '../../entity/genre';
import { Book } from '../../entity/book';
import { FileService } from '../../service/file.service';
import { Author } from '../../entity/author';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { BookService } from '../../service/book.service';
import { GenreService } from '../../service/genre.service';
import { AuthorService } from '../../service/author.service';


@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {

  authors:Author[];
  genres:Genre[];

  title:string;
  quantity:number;
  description:string;
  authorid:number;
  genreid:number;

  selectedFile:File;
  
  constructor(
    private fileService:FileService,
    private auth:AuthService,
    private router:Router,
    private bookService:BookService,
    private authorService:AuthorService,
    private genreService:GenreService
  ) { }

  ngOnInit() {
    if (!this.auth.isAuthenticated()){
      this.router.navigateByUrl('/login');
    }else{
      if(!this.auth.isAdmin()){
        this.router.navigateByUrl('/user');
      }
    }
    this.title="";
    this.description="";
    this.quantity=0;
    this.getAuthors();
    this.getGenres();
  }

  getAuthors(){
    this.authorService.getAuthors()
    .subscribe(
      (authors:Author[])=>{
        this.authors = authors;
        console.log(authors);
      },
      (err:any) => {
        console.log(err);
      }
    )
  }
  getGenres(){
    this.genreService.getGenres()
    .subscribe(
      (genres:Genre[])=>{
        this.genres = genres;
      },
      (err:any) => {
        console.log(err);
      }
    )
  }

  addBook(){

    this.fileService.sendImage(this.selectedFile)
      .subscribe(
        (res: any) => {
          console.log("Success");
        },
        (err: any) => {
          // console.log(err);
          console.log('Category fetch failed!');
        }
      )

    let genre = this.genres.filter(x=> x.id == this.genreid)[0];
    let author = this.authors.filter(x=> x.id == this.authorid)[0];
    let body = JSON.stringify(
      {
        "id":null,
        "title":this.title,
        "quantity":this.quantity,
        "available":this.quantity,
        "description":this.description,
        "picture":this.selectedFile.name,
        "authors":[author],
        "genres":[genre]
      }
    );

    console.log(body);
    this.bookService.addBook(body)
    .subscribe(
      (err:any)=>{
        console.log("Add book failed");
      }
    )
  }

  onFileSelected(event) {
    this.selectedFile = event.target.files[0];
  }
}
