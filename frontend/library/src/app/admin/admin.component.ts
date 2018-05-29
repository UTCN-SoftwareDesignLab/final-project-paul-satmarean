import { Component, OnInit } from '@angular/core';
import { FileService } from '../service/file.service';
import { AuthService } from '../service/auth.service';
import { Router} from '@angular/router';
import * as FileSaver from 'file-saver';

import { User } from '../entity/user';
import { Role } from '../entity/role';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  users:User[];

  constructor(
    // private fileService:FileService
    private auth:AuthService,
    private userService:UserService,
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
    this.getUsers();
  }

  getUsers():void{
    this.userService.getUsers()
    .subscribe(users => this.users = users);
  }

  delete(id:number):void{
    this.users = this.users.filter(x => x.id!=id);
    this.userService.deleteUser(id).subscribe(
      (err:any)=>{
        console.log("Could not delete")
      }
    );
  }

  // selectedFile:File;

  // onSubmit() {
  //   console.log("submit product")
  //   let imagePath: string;

  //   this.fileService.sendImage(this.selectedFile)
  //     .subscribe(
  //       (res: any) => {
  //         // this.alertService.success("Import success!");
  //         console.log("Success");
  //         // console.log(res);
  //         // console.log(this.categories);
  //         // this.router.navigateByUrl('/home');
  //       },
  //       (err: any) => {
  //         // console.log(err);
  //         console.log('Category fetch failed!');
  //       }
  //     )
  // }

  // onFileSelected(event) {
  //   this.selectedFile = event.target.files[0];
  // }

}
