import { Component, OnInit } from '@angular/core';
import { AuthorService } from '../../service/author.service';
import { AuthService} from '../../service/auth.service';
import { Router } from '@angular/router';
import { Genre} from '../../entity/genre';
import { GenreService } from '../../service/genre.service';

@Component({
  selector: 'app-add-genre',
  templateUrl: './add-genre.component.html',
  styleUrls: ['./add-genre.component.css']
})
export class AddGenreComponent implements OnInit {

  name:string;
  description:string;

  constructor(
    private auth:AuthService,
    private genreService:GenreService,
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

  public addGenre(){
    let body = JSON.stringify(
      {
        "id":null,
        "name":this.name,
        "description":this.description
      }
    );

    console.log(body);
    this.genreService.addGenre(body)
    .subscribe(
      (genre:Genre)=>{
        console.log(genre);
        this.router.navigateByUrl('/genres');
      }
    )
  }

}
