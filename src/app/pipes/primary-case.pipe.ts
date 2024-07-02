import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'primaryCase',
  standalone: true,
})
export class PrimaryCasePipe implements PipeTransform {
  transform(value: string): string {
    return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
  }
}
