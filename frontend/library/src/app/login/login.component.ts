import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private username: string;
  private password: string;
  public message: string;
  private result:boolean;

  constructor(
    private auth:AuthService,
    private router:Router
  ) { }

  ngOnInit() {
    if (!this.auth.isAuthenticated()){
      this.router.navigateByUrl('/login');
    }else{
      if(this.auth.isAdmin()){
        this.router.navigateByUrl('/admin');
      }else{
        this.router.navigateByUrl('/user');
      }
    }
  }

  public onSubmit():void{
    if(this.username==null || this.username=="" || this.password==null || this.password==""){
      this.message = "Fields cannot be empty.";
    }
    this.auth.login(this.username, this.password)
    .subscribe(
      (res:any) => {
        if(res == null){
          this.message = "Invalid username or password.";
          console.log(this.message);
        }
        if(this.auth.isAdmin()){
          this.router.navigateByUrl('/admin');
        }else{
          this.router.navigateByUrl('/user');
        }
      },
      (err:any) =>{
        this.message = "Invalid username or password.";
      }
    );
  }
}
