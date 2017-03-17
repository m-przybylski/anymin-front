import * as angular from 'angular'
import {TimerFactory} from './timer.factory'
import timerModule from './timer'

describe('Unit testing: profitelo.services.timer >', () => {
  describe('for profitelo.services.timer >', () => {

    let timerFactory: TimerFactory

    beforeEach(() => {
    angular.mock.module(timerModule)
    })

    beforeEach(inject(($injector: ng.auto.IInjectorService) => {
      timerFactory = $injector.get<TimerFactory>('timerFactory')
    }))


    it('should have a dummy test', () => {
      expect(true).toBeTruthy()
    })


    it('should use timer factory', inject(($interval: ng.IIntervalService) => {
      const callbacks = {
        cb1: () => {}
      }

      spyOn(callbacks, 'cb1')

      const money = {
        amount: 100,
        currency: 'PLN'
      }

      //FIXME
      const timer = timerFactory.getInstance(money, <any>undefined , <any>undefined)

      timer.start(callbacks.cb1)

      $interval.flush(1000)

      timer.stop()

      expect(callbacks.cb1).toHaveBeenCalled()
    }))
  })
})
