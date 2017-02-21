namespace profitelo.services.timer {

  import MoneyDto = profitelo.api.MoneyDto

  export interface ITimerService {
    start(cb: (obj: {time: number, money: MoneyDto}) => void): void
    stop(): void
  }

  export interface ITimerFactory {
    getInstance(money: MoneyDto, freeMinutesCount: number, interval: number): ITimerService
  }

  class TimerService implements ITimerService {

    private timer: ng.IPromise<any>

    constructor(private $interval: ng.IIntervalService, private money: MoneyDto, private freeMinutesCount: number,
                private interval: number) {}

    public start = (cb: (obj: {time: number, money: MoneyDto}) => void) => {
      const start = Date.now()
      this.timer = this.$interval(() => {
        const _time = (Date.now() - start) / 1000
        cb({
          time: _time,
          money: {
            amount: (this.money.amount * Math.max(0, _time - (60 * this.freeMinutesCount)) / 60),
            currency: this.money.currency
          }
        })
      }, this.interval)
    }

    public stop = () => {
      this.$interval.cancel(this.timer)
    }
  }

  class TimerFactory implements ITimerFactory {

    constructor(private $interval: ng.IIntervalService) {}

    public getInstance(money: MoneyDto, freeMinutesCount: number = 0, interval: number = 200) {
      return new TimerService(this.$interval, money, freeMinutesCount, interval)
    }
  }

  angular.module('profitelo.services.timer', [])
    .service('timerFactory', TimerFactory)
}
