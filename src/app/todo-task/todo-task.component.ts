import { AuthService } from './../auth/auth.service';
import { TasksService } from './../services/tasks.service';
import { Component, OnInit} from '@angular/core';
import { Task } from '../models/task';

@Component({
  selector: 'app-todo-task',
  templateUrl: './todo-task.component.html',
  styleUrls: ['./todo-task.component.css']
})
export class TodoTaskComponent implements OnInit {

  taskList: Array<Task> = [];

  constructor(private tasksService: TasksService, public authService: AuthService) {
    this.tasksService.getTaskListObs().subscribe(tasks => {
      this.taskList = tasks.filter(t => t.isDone === false);
    });
  }

  ngOnInit() {
  }

  remove(task: Task) {
    this.tasksService.remove(task);
  }
  done(task: Task) {
    task.end = new Date().toLocaleString();
    this.tasksService.done(task);
  }
  getColor() {
    return this.taskList.length > 3 ? 'red' : 'green';
  }
  save() {
    this.tasksService.saveTaskInDb();
  }
  logout() {
    this.authService.logout();
  }
}
