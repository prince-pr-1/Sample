import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task, User } from '../models/models';
import { Observable } from 'rxjs';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  tasksAPI: string = 'http://localhost:3000/users';
  task!: Task;
  constructor(private http: HttpClient, private datePipe: DatePipe) {}

  loadUser(userId: string): Observable<User[]> {
    return this.http.get<User[]>(this.tasksAPI + '?userId=' + userId);
  }

  saveTask(userID: string, tasks: Task[]): Observable<User> {
    return this.http.patch<User>(`${this.tasksAPI}/${userID}`, { tasks });
  }

  markStatus(userID: string, tasks: Task[]) {
    return this.http.patch(`${this.tasksAPI}/${userID}`, { tasks });
  }

  deleteTask(userId: string, tasks: Task[]) {
    return this.http.patch(`${this.tasksAPI}/${userId}`, { tasks });
  }

  editTaskData(task: Task) {
    this.task = task;
  }
  getEditData() {
    return this.task;
  }

  //  Get week
  getWeek() {
    const currentDate = new Date();
    let startOfWeek: any = new Date(currentDate);
    let endOfWeek: any = new Date(currentDate);

    const dayOfWeek = currentDate.getDay();
    const dayDifferenceToMonday = (dayOfWeek === 0 ? -6 : 1) - dayOfWeek;
    startOfWeek.setDate(currentDate.getDate() + dayDifferenceToMonday);
    endOfWeek.setDate(startOfWeek.getDate() + 6);

    startOfWeek = this.datePipe.transform(startOfWeek, 'yyyy-MM-dd');
    endOfWeek = this.datePipe.transform(endOfWeek, 'yyyy-MM-dd');

    return { startOfWeek, endOfWeek };
  }
}
