import { MoneyDto } from 'profitelo-api-ng/model/models';
import { TimerService } from './timer.service';

// tslint:disable:member-ordering
export class TimerFactory {

  public static $inject = ['$interval'];

    constructor(private $interval: ng.IIntervalService) {}

  public getInstance(money: MoneyDto, interval: number = 200): TimerService {
    return new TimerService(this.$interval, money, interval);
  }
}
