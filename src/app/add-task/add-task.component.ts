import { AuthService } from './../auth/auth.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TasksService } from '../services/tasks.service';
import { Task } from '../models/task';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {

  newTask: string;

  constructor(private tasksService: TasksService, private authService: AuthService) { }

  ngOnInit() {
  }
  add() {
    if (this.newTask !== undefined && this.newTask !== '' && this.newTask !== null) {
      const task: Task = {name: this.newTask, userId: this.authService.user.uid, created: new Date().toLocaleString(), isDone: false};
      this.tasksService.add(task);
      this.newTask = '';
    }

  }

}
