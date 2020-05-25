import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent {
  private redirectAfterLogout = false;

  constructor(private loginService: LoginService,
              private router: Router) {
    loginService.isAuthenticated().subscribe((value) => {
      if (this.redirectAfterLogout && value === false) {
        this.router.navigate(['/']);
      }
    });
  }

  logout(): void {
    this.redirectAfterLogout = true;
    this.loginService.logout();
  }

}
