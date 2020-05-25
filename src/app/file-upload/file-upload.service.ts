import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService, GoogleLoginProvider, SocialUser } from 'angularx-social-login';
import { take } from 'rxjs/operators';
import config from '../../config';

const baseUrl = config.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor(public authService: AuthService, private http: HttpClient) { }

  private async request(method: string, url: string, data?: any) {
    const authState = await this.authService.authState.pipe(
      take(1),
    ).toPromise();
    const token = authState.authToken;

    console.log('request ' + JSON.stringify(data));
    const result = this.http.request(method, url, {
      body: data,
      responseType: 'json',
      observe: 'body',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      reportProgress: true
    });
    return new Promise<any>((resolve, reject) => {
      result.subscribe(resolve as any, reject as any);
    });
  }

  public uploadFiles(files: File[], uuid: string) {
    return this.request('post', `${baseUrl}/file-upload/${uuid}`, files);
  }

}
