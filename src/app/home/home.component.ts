import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  public isLoading = true;

  constructor(public loginService: LoginService,
              private router: Router) {
    loginService.isAuthenticated().subscribe((value) => {
      console.log(value);
      if (value) {
        this.router.navigate(['projects']);
      } else if (value === false) {
        this.isLoading = false;
      }
    });
  }

  login() {
    this.isLoading = true;
    this.loginService.login();
  }

}
