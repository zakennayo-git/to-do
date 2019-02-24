import { TasksService } from './../services/tasks.service';
import { Component, OnInit, Input } from '@angular/core';
import { Task } from '../models/task';

@Component({
  selector: 'app-done-task',
  templateUrl: './done-task.component.html',
  styleUrls: ['./done-task.component.css']
})
export class DoneTaskComponent implements OnInit {

  doneList: Array<Task> = [];

  constructor(private tasksService: TasksService) {
    this.tasksService.getTaskListObs().subscribe(tasks => {
      this.doneList = tasks.filter(t => t.isDone === true);
    });
  }

  ngOnInit() {
  }

}
