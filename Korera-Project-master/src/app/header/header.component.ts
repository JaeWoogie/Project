import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from  '@angular/forms';
import { Router } from  '@angular/router';
import { User } from  '../user';
import { AuthService } from  '../auth.service';
import { DataService } from '../data.service';
import {AppComponent} from '../app.component';
@Component({

  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  isSubmitted  =  false;
  constructor(private appComp:AppComponent,private authService: AuthService, private router: Router, private formBuilder: FormBuilder,private service: DataService ) { }

  ngOnInit() {
    this.loginForm  =  this.formBuilder.group({
        email: ['', Validators.required],
        password: ['', Validators.required]
    });
}
get formControls() { return this.loginForm.controls; }


login(){
  console.log(this.loginForm.value);
  this.isSubmitted = true;
  if(this.loginForm.invalid){
    return;
  }
  this.service.login = true;
  this.appComp.status = "Logged in";
  this.authService.login(this.loginForm.value);
  this.service.title = 'PROJECT';
  this.service.emitTitle();
  this.router.navigateByUrl('/resource');

 }
 ngOnDestroy(){
 }
}
