describe('Unit testing: profitelo.services.callbacks >', () => {
  describe('for profitelo.services.callbacks >', () => {

    let callbacksFactory

    beforeEach(() => {
    angular.mock.module('profitelo.services.callbacks')
    })

    beforeEach(inject(($injector) => {
      callbacksFactory = $injector.get('callbacksFactory')
    }))


    it('should have a dummy test', () => {
      expect(true).toBeTruthy()
    })

    it('should use callback service', inject(($timeout) => {
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

      const callbacks = callbacksFactory.getInstance(Object.keys(events))

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
  })
})
