describe('Unit testing: profitelo.services.utils >', () => {
  describe('for profitelo.services.utils >', () => {

    let UtilsService

    beforeEach(() => {
    angular.mock.module('profitelo.services.utils')
    })

    beforeEach(inject(($injector) => {
      UtilsService = $injector.get('UtilsService')
    }))


    it('should have a dummy test', () => {
      expect(true).toBeTruthy()
    })

    it('should use callback factory', inject(($timeout) => {
      const cbs = {
        callback1: _ => _,
        callback2: _ => _
      }

      spyOn(cbs, 'callback1')
      spyOn(cbs, 'callback2')

      const events = {
        onTest1: 'onTest1',
        onTest2: 'onTest2'
      }

      const callbacks = UtilsService.callbacksFactory(Object.keys(events))

      callbacks.methods.onTest1(cbs.callback1)
      callbacks.methods.onTest2(cbs.callback2)

      callbacks.notify(events.onTest1, null)
      $timeout.flush()

      expect(cbs.callback1).toHaveBeenCalled()
      expect(cbs.callback2).not.toHaveBeenCalled()

      callbacks.notify(events.onTest2, null)
      $timeout.flush()
      expect(cbs.callback2).toHaveBeenCalled()
    }))

    it('should use timer factory', inject(($interval) => {
      const callbacks = {
        cb1: _ => _
      }

      spyOn(callbacks, 'cb1')

      const money = {
        amount: 100,
        currency: 'PLN'
      }

      const timer = UtilsService.callTimerFactory.getInstance(money)

      timer.start(callbacks.cb1)

      $interval.flush(1000)

      timer.stop()

      expect(callbacks.cb1).toHaveBeenCalled
    }))
  })
})
