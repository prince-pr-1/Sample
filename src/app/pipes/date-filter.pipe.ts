import { Pipe, PipeTransform } from '@angular/core';
import { Task } from '../models/models';

@Pipe({
  name: 'dateFilter',
  standalone: true,
})
export class DateFilterPipe implements PipeTransform {
  transform(value: Task, arg: string): Task | null {
    if (value.taskDate === arg) {
      return value;
    } else {
      return null;
    }
  }
}
