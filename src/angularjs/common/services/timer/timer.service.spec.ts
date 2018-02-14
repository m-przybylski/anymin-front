import * as angular from 'angular'
import {TimerFactory} from './timer.factory'
import timerModule from './timer'
import {MoneyDto} from 'profitelo-api-ng/model/models'
import loggerMockModule from '../logger/logger.mock';

describe('Unit testing: profitelo.services.timer >', () => {
  describe('for profitelo.services.timer >', () => {

    let timerFactory: TimerFactory

    beforeEach(() => {
    angular.mock.module(timerModule)
    angular.mock.module(loggerMockModule)
    })

    beforeEach(inject(($injector: ng.auto.IInjectorService) => {
      timerFactory = $injector.get<TimerFactory>('timerFactory')
    }))

    it('should have a dummy test', () => {
      expect(true).toBeTruthy()
    })

    it('should use timer factory', inject(($interval: ng.IIntervalService) => {
      let functionCalled = false

      const money = {
        amount: 100,
        currency: 'PLN'
      }

      const timer = timerFactory.getInstance(money)

      timer.start(() => {
        functionCalled = true
      })

      $interval.flush(5000)
      timer.pause()
      $interval.flush(5000)
      timer.resume()
      timer.stop()
      expect(functionCalled).toEqual(true)

    }))

    it('should use time factory with 10 free seconds', (done) =>
      inject(($interval: ng.IIntervalService) => {
      let currentMoney: MoneyDto = {
        amount: 100,
        currency: 'PLN'
      }

      const timer = timerFactory.getInstance({
        amount: 100,
        currency: 'PLN'
      })

      const callBack = (timeMoneyTuple: { time: number, money: MoneyDto }): void => {
        currentMoney = timeMoneyTuple.money
        done()
      }
      timer.start(callBack, 10)
      $interval.flush(5000)
      timer.pause()
      expect(currentMoney.amount).toEqual(0)
      timer.resume()
      $interval.flush(4000)
      timer.stop()
      expect(currentMoney.amount).toEqual(0)
    }))
  })
})
