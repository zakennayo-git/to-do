import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Task } from '../models/task';
import { HttpService } from './http.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { initDomAdapter } from '@angular/platform-browser/src/browser';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  private taskListObs = new BehaviorSubject<Array<Task>>([]);

  constructor(private httpService: HttpService, public angularFire: AngularFireAuth) {
    angularFire.authState.subscribe(user => {
      if (user) {
        this.init();
      } else {
        this.taskListObs.next([]);
      }
    });
  }
  init() {
    this.httpService.getTask().subscribe(list => {
      this.taskListObs.next(list);
    });
  }
  add(task: Task) {
    const list = this.taskListObs.getValue();
    list.push(task);
    this.taskListObs.next(list);
  }
  remove(task: Task) {
    const list = this.taskListObs.getValue().filter(e => e !== task);
    this.taskListObs.next(list);
  }
  done(task: Task) {
    task.end = new Date().toLocaleString();
    task.isDone = true;
    const list = this.taskListObs.getValue();
    this.taskListObs.next(list);
  }
  getTaskListObs() {
    return this.taskListObs.asObservable();
  }
  saveTaskInDb() {
    this.httpService.saveTasks(this.taskListObs.getValue());
  }
}
