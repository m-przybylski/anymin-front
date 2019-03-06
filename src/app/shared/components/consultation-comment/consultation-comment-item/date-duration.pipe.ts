import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'dateDuration',
})
export class DateDurationPipe implements PipeTransform {
  constructor() {
    moment.updateLocale('pl', {
      relativeTime: {
        future: '%s',
        past: '%s',
        s: 'dziś',
        ss: 'dziś',
        m: 'dziś',
        mm: 'dziś',
        h: 'dziś',
        hh: 'dziś',
        d: 'wczoraj',
        dd: '%d dni temu',
        M: 'miesiąc temu',
        MM: '%d miesięcy temu',
        y: 'rok temu',
        yy: '%d lat temu',
      },
    });
  }

  public transform(dateTime: Date): string {
    return moment().to(moment(dateTime));
  }
}
