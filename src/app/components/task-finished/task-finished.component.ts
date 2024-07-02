import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Task } from '../../models/models';
import { DataService } from '../../services/data.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-finished',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-finished.component.html',
  styleUrl: './task-finished.component.css',
})
export class TaskFinishedComponent implements OnInit {
  @Input() finished!: Task;
  @Output() incompleteEvent = new EventEmitter<any>();
  userId = '';
  tasks: Task[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    let data = localStorage.getItem('user');
    if (data) {
      let user = JSON.parse(data);
      this.tasks = user.tasks;
      this.userId = user.id;
    }
  }

  handleIncomplete() {
    this.tasks = this.tasks.map((task: Task) => {
      if (task.task === this.finished.task) {
        return { ...task, status: 'pending' };
      } else {
        return task;
      }
    });
    this.dataService.markStatus(this.userId, this.tasks).subscribe((result) => {
      localStorage.setItem('user', JSON.stringify(result));
      this.incompleteEvent.emit();
    });
  }
}
