import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { CommonModule } from '@angular/common';
import { Task, User } from '../../models/models';
import { AddTaskComponent } from '../add-task/add-task.component';
import { PrimaryCasePipe } from '../../pipes/primary-case.pipe';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterOutlet, NavBarComponent, CommonModule, PrimaryCasePipe],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  user!: User;
  taskMessage!: string;
  highPtiorityTasks!: Task[];
  showPopup = false;

  ngOnInit(): void {
    let data = localStorage.getItem('user');
    if (data) {
      let user = JSON.parse(data);
      let tasks = user.tasks;
      this.user = user;
      this.highPtiorityTasks = tasks.filter((task: Task) => {
        return task.important === true;
      });
    }
    if (this.highPtiorityTasks.length > 0) {
      this.showPopup = true;
      setTimeout(() => {
        this.showPopup = false;
      }, 8000);
    }
  }
  onActivate(event: any) {
    if (event instanceof AddTaskComponent) {
      event.tskAddedEvent.subscribe((message: string) => {
        this.taskMessage = message;
        setTimeout(() => {
          this.taskMessage = '';
        }, 3000);
      });
    }
  }
}
