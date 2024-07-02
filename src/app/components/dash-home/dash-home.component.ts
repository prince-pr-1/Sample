import { Component, OnInit } from '@angular/core';
import { TaskItemComponent } from '../task-item/task-item.component';
import { RouterLink } from '@angular/router';
import { User, Task } from '../../models/models';
import { CommonModule, DatePipe } from '@angular/common';
import { DateFilterPipe } from '../../pipes/date-filter.pipe';
import { TaskFinishedComponent } from '../task-finished/task-finished.component';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-dash-home',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
    DateFilterPipe,
    TaskItemComponent,
    TaskFinishedComponent,
  ],
  templateUrl: './dash-home.component.html',
  styleUrl: './dash-home.component.css',
})
export class DashHomeComponent implements OnInit {
  user!: User;
  tasks!: any;
  dateToday!: any;
  todaysTasks!: any;
  finishedTasks!: any;

  constructor(private datePipe: DatePipe, private dataService: DataService) {}

  ngOnInit(): void {
    this.getDatas();
    if (this.dataService.getEditData()) {
      this.getDatas
    }
  }

  logout() {
    localStorage.clear();
  }

  getDatas() {
    let today = new Date();
    this.dateToday = this.datePipe.transform(today, 'yyyy-MM-dd');
    let data = localStorage.getItem('user');
    if (data) {
      this.user = JSON.parse(data);
      this.tasks = this.user.tasks;
      this.todaysTasks = this.tasks.filter((task: Task) => {
        return task.taskDate === this.dateToday && task.status == 'pending';
      });

      this.finishedTasks = this.tasks.filter((task: Task) => {
        return task.taskDate === this.dateToday && task.status == 'completed';
      });
    }
  }
}
