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
      let functionCalled: boolean = false

      const money = {
        amount: 100,
        currency: 'PLN'
      }

      // FIXME
      const timer = timerFactory.getInstance(money, <any>undefined , <any>undefined)

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
  })
})
