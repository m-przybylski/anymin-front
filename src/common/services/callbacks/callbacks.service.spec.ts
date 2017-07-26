import * as angular from 'angular'
import {CallbacksFactory} from './callbacks.factory'
import callbacksModule from './callbacks'

describe('Unit testing: profitelo.services.callbacks >', () => {
  describe('for profitelo.services.callbacks >', () => {

    let callbacksFactory: CallbacksFactory

    beforeEach(() => {
    angular.mock.module(callbacksModule)
    })

    beforeEach(inject(($injector: ng.auto.IInjectorService) => {
      callbacksFactory = $injector.get<CallbacksFactory>('callbacksFactory')
    }))

    it('should have a dummy test', () => {
      expect(true).toBeTruthy()
    })

    it('should use callback service', inject(($timeout: ng.ITimeoutService) => {
      const cbs = {
        callback1: (): void => {},
        callback2: (): void => {}
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
