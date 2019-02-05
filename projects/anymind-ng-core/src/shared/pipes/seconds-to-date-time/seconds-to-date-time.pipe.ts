import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'secondsToDateTime' })
export class SecondsToDateTime implements PipeTransform {
  public transform(seconds: number): Date {
    const date = new Date();
    date.setHours(0, 0, seconds, 0);

    return date;
  }
}
