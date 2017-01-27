describe('Unit testing: profitelo.services.timer >', () => {
  describe('for profitelo.services.timer >', () => {

    let timerFactory

    beforeEach(() => {
    angular.mock.module('profitelo.services.timer')
    })

    beforeEach(inject(($injector) => {
      timerFactory = $injector.get('timerFactory')
    }))


    it('should have a dummy test', () => {
      expect(true).toBeTruthy()
    })


    it('should use timer factory', inject(($interval) => {
      const callbacks = {
        cb1: _ => _
      }

      spyOn(callbacks, 'cb1')

      const money = {
        amount: 100,
        currency: 'PLN'
      }

      const timer = timerFactory.getInstance(money)

      timer.start(callbacks.cb1)

      $interval.flush(1000)

      timer.stop()

      expect(callbacks.cb1).toHaveBeenCalled()
    }))
  })
})
