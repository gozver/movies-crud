import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duration'
})
@Injectable({
  providedIn: 'root'
})
export class DurationPipe implements PipeTransform {

  transform(value: number): string {
    const hours = Math.floor(value / 60);
    const minutes = Math.floor(value % 60);
    return hours + ' hrs ' + minutes + ' mins';

 }
}
