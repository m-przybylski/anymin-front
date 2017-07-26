import * as angular from 'angular'
import profiteloWebsocketModule from './profitelo-websocket'
import {ProfiteloWebsocketService} from './profitelo-websocket.service'
import {CallbacksService} from '../callbacks/callbacks.service'
import IQService = angular.IQService
import userModule from '../user/user'
import eventsModule from '../events/events'
import callbacksModule from '../callbacks/callbacks'

describe('Unit testing: profitelo.services.profiteloWebsocket >', () => {
  describe('for profitelo.services.profiteloWebsocket >', () => {

    let profiteloWebsocket: ProfiteloWebsocketService
    let q: IQService

    const eventsService: any = {
      on: (_param: string, callback: () => void): void => {
        callback()
      }
    }

    const userService: any = {
      getUser: (): ng.IPromise<{}> => {
        return q.resolve({})
      }
    }

    const callbacksFactory: any = {
      getInstance: (keys: Array<string>): CallbacksService => {
        return new CallbacksService(this.$timeout, keys)
      }
    }

    beforeEach(() => {
      angular.mock.module(userModule)
      angular.mock.module(eventsModule)
      angular.mock.module(callbacksModule)
    })

    beforeEach(angular.mock.module(($provide: ng.auto.IProvideService) => {
      $provide.value('apiUrl', 'awesomeURL')
    }))

    beforeEach(angular.mock.module(($provide: ng.auto.IProvideService) => {
      $provide.value('userService', userService)
      $provide.value('eventsService', eventsService)
      $provide.value('callbacksService', CallbacksService)
      $provide.value('callbacksFactory', callbacksFactory)
    }))

    beforeEach(() => {
      angular.mock.module(profiteloWebsocketModule)

      inject(($injector: ng.auto.IInjectorService, $q: ng.IQService) => {
        q = $q
        profiteloWebsocket = $injector.get<ProfiteloWebsocketService>('profiteloWebsocket')
      })

    })

    it('should have a dummy test', () => {
      expect(true).toBeTruthy()
    })

  })
})
