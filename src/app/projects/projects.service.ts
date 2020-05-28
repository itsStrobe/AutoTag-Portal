import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'angularx-social-login';
import { Project } from './project';
import { take } from 'rxjs/operators';
import { FileUtils } from '../utils/file-utils/file-utils';
import config from '../../config';

const baseUrl = config.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  constructor(public authService: AuthService, private http: HttpClient) {
  }

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
      }
    });
    return new Promise<any>((resolve, reject) => {
      result.subscribe(resolve as any, reject as any);
    });
  }

  getProjects() {
    return this.request('get', `${baseUrl}/project`);
  }

  getProject(uuid: string) {
    return this.request('get', `${baseUrl}/project/${uuid}`);
  }

  async createProject(project: Project, files: File[]) {
    const data = Object.assign(project);
    const fileObjects = await FileUtils.prepareFiles(files);
    data.files = fileObjects;
    console.log('createProject ' + JSON.stringify(data));
    return this.request('post', `${baseUrl}/project`, data);
  }

  updateProject(project: Project) {
    console.log('updateProject ' + JSON.stringify(project));
    return this.request('post', `${baseUrl}/project/${project.uuid}`, project);
  }

  deleteProject(uuid: string) {
    return this.request('delete', `${baseUrl}/project/${uuid}`);
  }

  exportProject(uuid: string) {
    return this.request('get', `${baseUrl}/project/${uuid}/export`);
  }

  autoTag(uuid: string) {
    console.log('autoTag');
    return this.request('post', `${baseUrl}/project/${uuid}/generate`);
  }
}
