import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeDuration',
})
export class TimeDurationPipe implements PipeTransform {
  public transform(seconds: number): string {
    return this.setTimeTranslation(seconds);
  }

  private setTimeTranslation = (time: number): string => {
    const oneHourInSeconds = 3600;
    const oneMinInSeconds = 60;

    const seconds = time;
    const minutes = time / oneMinInSeconds;
    const hours = time / oneHourInSeconds;

    if (hours > 1) {
      return `${Math.round(hours)} h ${Math.round(minutes) - Math.floor(hours) * oneMinInSeconds} min ${Math.round(
        seconds,
      ) -
        Math.floor(minutes) * oneMinInSeconds} sec`;
    } else if (minutes > 1) {
      return `${Math.round(minutes)} min ${seconds - Math.floor(minutes) * oneMinInSeconds} sec`;
    } else {
      return `${seconds} sec`;
    }
  };
}
