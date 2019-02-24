import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public authService: AuthService) { }

  ngOnInit() {
  }

  login(formData: NgForm) {
    this.authService.login(formData.value.email, formData.value.password);
    console.log(this.authService.error);
  }

  signup(formData: NgForm) {
    this.authService.signup(formData.value.email, formData.value.password);
    console.log(this.authService.error);
  }

}
