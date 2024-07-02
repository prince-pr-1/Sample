import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Task } from '../../models/models';
import { FormsModule } from '@angular/forms';
import { DataService } from '../../services/data.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.css',
})
export class AddTaskComponent implements OnInit {
  today!: any;
  task: Task = {
    task: '',
    taskDate: '',
    updatedDate: '',
    status: 'pending',
    important: false,
  };
  @Output() tskAddedEvent = new EventEmitter<any>();
  tasks: Task[] = [];
  userId!: string;
  mode: string = 'add';
  index!: number;

  constructor(
    private datePipe: DatePipe,
    private dataService: DataService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const user = localStorage.getItem('user');
    if (user) {
      const userData = JSON.parse(user);
      this.tasks = userData.tasks;
      this.userId = userData.id;
    }
    if (this.dataService.getEditData()) {
      this.task = this.dataService.getEditData();
    }

    this.route.params.subscribe((params) => {
      this.mode = params['type'];
      this.index = params['index'];
      if (this.mode === 'add') {
        this.task = {
          task: '',
          taskDate: '',
          updatedDate: '',
          status: 'pending',
          important: false,
        };
      }
    });
  }

  handleAdd(mode: string) {
    const d = new Date();
    this.today = this.datePipe.transform(d, 'yyyy-MM-dd');
    this.task.updatedDate = this.today;
    if (mode === 'add') {
      this.tasks.push(this.task);
      this.dataService.saveTask(this.userId, this.tasks).subscribe((result) => {
        localStorage.setItem('user', JSON.stringify(result));
        this.tskAddedEvent.emit('New task added successfully');
        this.router.navigate(['/dashboard']);
      });
    } else if (mode === 'edit') {
      this.task.updatedDate = this.today;
      this.tasks[this.index] = this.task;
      this.dataService.saveTask(this.userId, this.tasks).subscribe((result) => {
        this.tskAddedEvent.emit('Changes saved');
        this.router.navigate(['/dashboard']);
        localStorage.setItem('user', JSON.stringify(result));
        this.dataService.editTaskData(this.task);
      });
    } else if (mode === 'copy') {
      this.tasks.push(this.task);
      this.dataService.saveTask(this.userId, this.tasks).subscribe((result) => {
        localStorage.setItem('user', JSON.stringify(result));
        this.tskAddedEvent.emit('New task added successfully');
        this.router.navigate(['/dashboard']);
      });
    }
  }
}
