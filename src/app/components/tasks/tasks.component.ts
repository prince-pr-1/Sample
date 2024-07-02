import { Component, OnInit } from '@angular/core';
import { Task } from '../../models/models';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataService } from '../../services/data.service';
import { PrimaryCasePipe } from '../../pipes/primary-case.pipe';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule, FormsModule, PrimaryCasePipe],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
})
export class TasksComponent implements OnInit {
  tasks!: Task[];
  filteredTasks!: Task[];
  dropdown: string = 'all';

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    let data = localStorage.getItem('user');
    if (data) {
      let user = JSON.parse(data);
      this.tasks = user.tasks;
    }
    this.filteredTasks = [...this.tasks];
  }

  handleDropDown() {
    const { startOfWeek, endOfWeek } = this.dataService.getWeek();
    let today = new Date();

    if (this.dropdown === 'all') {
      this.filteredTasks = [...this.tasks];
    } else if (this.dropdown === 'week') {
      let start = new Date(startOfWeek).getDate();
      let end = new Date(endOfWeek).getDate();
      this.filteredTasks = this.filterPendingTasks(start, end);
    } else if (this.dropdown === 'month') {
      let monthStart = new Date(
        today.getFullYear(),
        today.getMonth(),
        1
      ).getDate();
      let monthEnd = this.getMonthEnd(today).getDate();
      this.filteredTasks = this.filterPendingTasks(monthStart, monthEnd);
    }
  }

  filterPendingTasks(start: number, end: number) {
    let filtered = this.tasks.filter((task) => {
      let taskDate = new Date(task.taskDate).getDate();
      return taskDate > start && taskDate < end && task.status === 'pending';
    });
    return filtered;
  }

  handleBtnFilters(status: string) {
    this.dropdown = 'all';
    this.filteredTasks = this.tasks.filter((task) => {
      return task.status === status;
    });
  }

  getMonthEnd(today: Date) {
    let monthEnd = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    return monthEnd;
  }
}
