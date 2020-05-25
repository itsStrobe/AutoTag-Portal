import { Injectable } from '@angular/core';
import { AuthService, FacebookLoginProvider } from 'angularx-social-login';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private isAuthenticatedSubject = new BehaviorSubject(undefined);

  constructor(public authService: AuthService) {
    this.authService.authState.subscribe((user) => {
      this.isAuthenticatedSubject.next(user != null);
    });
  }

  async login() {
    await this.authService.signIn(FacebookLoginProvider.PROVIDER_ID)
      .then(x => {
        console.log(x);
      })
      .catch(x => {
        console.log(x);
      });
  }

  async logout() {
    await this.authService.signOut().then(x => console.log(x));
  }

  isAuthenticated(): Observable<boolean | undefined> {
    return this.isAuthenticatedSubject.asObservable();
  }
}
