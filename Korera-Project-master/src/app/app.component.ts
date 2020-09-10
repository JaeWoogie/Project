import { Component, ViewChild } from '@angular/core';
import { CSVRecord } from './dataStructure';
import{AuthService} from './auth.service';
import{Router} from '@angular/router';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [DataService]
})
export class AppComponent {
  display: string;
  status: string;
  check: boolean;
  showUserInfoCond: boolean = false;
  userIconClick: boolean = false;
  constructor(private service: DataService,private router:Router,private authService:AuthService) {
    this.service.titleObservable.subscribe(tennaocungdc =>{
       this.display = tennaocungdc;
       console.log(this.display);
       console.log(tennaocungdc);
    });
  }
  ngOnInit() {
    // this.service.login = false;
    this.display= this.service.title;
    this.check = this.service.login;
    // this.check = this.service.geLoginCheck();
    if (this.check) {
      this.status = 'Logged In';
    }
    else {

      this.status = 'Not Logged';
    }

    console.log(this.status);
  }
  title = 'Korera-Project';
  logged(){
    return this.service.login;
  }
  logout(){
    this.service.login = false;
    this.checkk();
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }
  checkk(){
    if (this.service.login==false) {
      this.status = 'Not Logged';
    }
    else {
      this.status = 'Logged In';
    }
  }

  clickMe() {
     // console.log("me clicked");
    if (this.userIconClick) {
      this.userIconClick = false;
    }
    else {
      this.userIconClick = true;
    }
    if (this.service.login && this.userIconClick) { this.showUserInfoCond = true; }
    else {
      this.showUserInfoCond = false;
    }
    // console.log(this.service.login);
    // console.log(this.showUserInfoCond);
    // console.log(this.userIconClick);
  }
}
