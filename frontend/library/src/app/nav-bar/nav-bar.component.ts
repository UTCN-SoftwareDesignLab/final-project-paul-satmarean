import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router, NavigationEnd} from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(
    private auth:AuthService,
    private router:Router,
  ) { }

  ngOnInit() {
  }

  logOut(){
    this.auth.logOut();
  }  
}
