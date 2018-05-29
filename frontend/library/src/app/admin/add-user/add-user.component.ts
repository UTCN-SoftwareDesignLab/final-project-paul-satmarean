import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { UserService } from '../../service/user.service';
import {RoleService} from '../../service/role.service';
import {User} from '../../entity/user';
import { Router} from '@angular/router';

import {Role} from '../../entity/role';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  name:string;
  username:string;
  password:string;
  email:string;
  roleid:number;
  message:string;
  address:string;
  role:Role;
  roles:Role[];

  user:User;

  constructor(
    private auth:AuthService,
    private userService:UserService,
    private roleService:RoleService,
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
    this.getRoles();
    this.password="";
    this.username="";
    this.email="";
    this.address="";
  }

  getRoles():void{
    this.roleService.getRoles()
    .subscribe(roles => this.roles = roles);
  }

  public addUser(){
    this.role = this.roles.filter(x=> x.id == this.roleid)[0];
    let body = JSON.stringify(
      {
        "id":null,
        "name":this.name,
        "username":this.username,
        "password":this.password,
        "email":this.email,
        "address":this.address,
        "role":this.role
      }
    );

    console.log(body);

    this.userService.addUser(body).subscribe(
      (user:User) =>{ 
        this.user = user;
        this.router.navigateByUrl("/admin");
      }
      );

  }

}
