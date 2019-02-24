import { AuthService } from './../auth/auth.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, JsonpInterceptor } from '@angular/common/http';
import { Task } from '../models/task';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  readonly URL_DB = 'https://api.mlab.com/api/1/databases/angular_db/collections/tasks';
  readonly param: HttpParams;



  constructor(private http: HttpClient, private authService: AuthService) {
    this.getTask();
  }
  getParams(): HttpParams {
    const uid = this.authService.user.uid;
    const query = {'userId': uid};
    return new HttpParams().set('apiKey', 'q7v53TGeajGeXAhL5ELtZJDz9xiYvREu').append('q', JSON.stringify(query));
  }
  getTask(): Observable<Array<Task>> {
    return this.http.get<Array<Task>>(this.URL_DB, {params: this.getParams()});

  }
  saveTasks(list: Array<Task>) {
    this.http.put(this.URL_DB, list, {params: this.getParams()}).subscribe(data => {
      console.log(data);
    });
  }
}
