import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { Router} from '@angular/router';
import { GenreService } from '../../service/genre.service';

import { Genre } from '../../entity/genre';

@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.css']
})
export class GenresComponent implements OnInit {

  genres:Genre[];

  constructor(
    private auth:AuthService,
    private router:Router,
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
    this.getGenres();
  }

  getGenres():void{
    this.genreService.getGenres()
    .subscribe(
      (genres:Genre[]) => {
        console.log(genres);
        this.genres= genres;
      },
      (err:any) =>{
        console.log(err);
      }
    );
  }

  delete(id:number):void{
    this.genres = this.genres.filter(x => x.id!=id);
    this.genreService.deleteGenre(id).subscribe(
      (err:any)=>{
        console.log("Could not delete")
      }
    );
  }


}
