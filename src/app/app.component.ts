import { AuthService } from './auth/auth.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(public authService: AuthService, private router: Router) {

  }
  gotoHome() {
    this.router.navigate(['/home']);
  }
  ngOnInit() {
    setTimeout(() => {
      this.gotoHome();
    }, 700);
  }

}
