import { Component, OnInit } from '@angular/core';
import { LoginService } from './login/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public title = 'AutoTag';
  public isAuthenticated = false;

  constructor(public loginService: LoginService) {
    loginService.isAuthenticated().subscribe((value) => {
      this.isAuthenticated = value;
    });
  }
}
