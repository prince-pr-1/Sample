import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Task } from '../../models/models';
import { CommonModule, DatePipe } from '@angular/common';
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [DatePipe, CommonModule],
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.css',
})
export class TaskItemComponent implements OnInit {
  userId = '';
  tasks: any = [];
  priority!: boolean;
  @Input() task!: Task;
  @Input() dltIndex!: number;
  @Output() tskCompleteEvent = new EventEmitter<any>();
  @Output() editTaskEvent = new EventEmitter<Task>();

  constructor(private dataService: DataService, private router: Router) {}

  ngOnInit(): void {
    let data = localStorage.getItem('user');
    if (data) {
      let user = JSON.parse(data);
      this.tasks = user.tasks;
      this.userId = user.id;
      this.priority = this.task.important;
    }
  }

  handleComplete() {
    this.tasks = this.tasks.map((task: Task) => {
      if (task.task === this.task.task) {
        return { ...task, status: 'completed' };
      }
      return task;
    });
    this.dataService.markStatus(this.userId, this.tasks).subscribe((result) => {
      localStorage.setItem('user', JSON.stringify(result));
      this.tskCompleteEvent.emit();
    });
  }

  handleEdit() {
    this.editTaskEvent.emit(this.task);
    this.dataService.editTaskData(this.task);
    this.router.navigate(['dashboard/task', 'edit', this.dltIndex]);
  }

  handleCopy() {
    this.dataService.editTaskData(this.task);
    this.router.navigate(['dashboard/task', 'copy', this.dltIndex]);
  }

  handleDelete() {
    this.tasks.splice(this.dltIndex, 1);
    this.dataService.deleteTask(this.userId, this.tasks).subscribe((result) => {
      localStorage.setItem('user', JSON.stringify(result));
      this.tskCompleteEvent.emit();
    });
  }

  handleStar(priority: boolean) {
    this.priority = !this.priority;
    this.tasks = this.tasks.map((item: Task) => {
      if (this.task.task == item.task) {
        return { ...item, important: priority };
      }
      return item;
    });
    this.dataService.markStatus(this.userId, this.tasks).subscribe((result) => {
      localStorage.setItem('user', JSON.stringify(result));
      this.tskCompleteEvent.emit();
    });
  }
}
