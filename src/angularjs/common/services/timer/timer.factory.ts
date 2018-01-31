import { MoneyDto } from 'profitelo-api-ng/model/models';
import { TimerService } from './timer.service';

export class TimerFactory {

  static $inject = ['$interval'];

    constructor(private $interval: ng.IIntervalService) {}

  public getInstance(money: MoneyDto, interval: number = 200): TimerService {
    return new TimerService(this.$interval, money, interval);
  }
}
