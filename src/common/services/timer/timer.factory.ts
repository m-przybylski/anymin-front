import {MoneyDto} from "../../api/model/MoneyDto"
import {TimerService} from "./timer.service"

export class TimerFactory {

  /* @ngInject */
  constructor(private $interval: ng.IIntervalService) {}

  public getInstance(money: MoneyDto, freeMinutesCount: number = 0, interval: number = 200) {
    return new TimerService(this.$interval, money, freeMinutesCount, interval)
  }
}
