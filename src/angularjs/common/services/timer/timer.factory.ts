// tslint:disable:readonly-array
import { LoggerService } from '@anymind-ng/core';
import { MoneyDto } from 'profitelo-api-ng/model/models';
import { TimerService } from './timer.service';

export class TimerFactory {

  public static $inject = ['logger', '$interval'];

  constructor(private logger: LoggerService, private $interval: ng.IIntervalService) {
  }

  public getInstance(money: MoneyDto): TimerService {
    return new TimerService(this.logger, this.$interval, money);
  }
}
