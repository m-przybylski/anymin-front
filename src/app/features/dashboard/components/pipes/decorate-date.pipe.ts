import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({ name: 'decorateDate' })
export class DecorateDatePipe implements PipeTransform {
  private moment = moment;

  public transform(date: Date): string {
    this.moment.updateLocale('pl', {
      relativeTime: {
        future: '%s',
        past: '%s',
        s: String(this.moment(date).format('HH:mm')),
        ss: String(this.moment(date).format('HH:mm')),
        m: String(this.moment(date).format('HH:mm')),
        mm: String(this.moment(date).format('HH:mm')),
        h: String(this.moment(date).format('HH:mm')),
        hh: String(this.moment(date).format('HH:mm')),
        d: 'DATE_PIPE.YESTERDAY',
        dd: this.setWeekDayTranslation(date),
        M: String(this.moment(date).format('DD-MM-YYYY')),
        MM: String(this.moment(date).format('DD-MM-YYYY')),
        y: String(this.moment(date).format('DD-MM-YYYY')),
        yy: String(this.moment(date).format('DD-MM-YYYY')),
      },
    });

    return this.moment().to(moment(date));
  }

  private setWeekDayTranslation(date: Date): string {
    const weekDaysToShow = 6;
    const weekTranslationKey = 'DATE_PIPE';
    if (this.moment().diff(date, 'days') < weekDaysToShow) {
      this.moment.locale('en');

      return `${weekTranslationKey}.${this.moment(date)
        .format('dddd')
        .toUpperCase()}`;
    } else {
      return String(this.moment(date).format('DD-MM-YYYY'));
    }
  }
}
