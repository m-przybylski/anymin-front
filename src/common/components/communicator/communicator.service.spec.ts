import * as angular from 'angular'
import * as RatelSdk from 'ratel-sdk-js'
import {CommunicatorService} from './communicator.service'
import IRootScopeService = profitelo.services.rootScope.IRootScopeService
import {RatelApi, ProfileApi} from 'profitelo-api-ng/api/api'
import {SignedAgent, GetProfileWithServices, GetService} from 'profitelo-api-ng/model/models'
import userModule from '../../services/user/user'
import communicatorModule from './communicator'
import './communicator.service'

import {Session} from 'ratel-sdk-js'

describe('Unit testing: profitelo.services.communicator >', () => {
  describe('for profitelo.services.communicator >', () => {

    let communicatorService: CommunicatorService
    const session = {} as RatelSdk.Session
    const config: SignedAgent = {
      signature: '123'
    }

    const profile1: GetProfileWithServices = {
      id: '123',
      isActive: true,
      services: [{id: '1'} as GetService, {id: '2'} as GetService]
    }
    const profilesWithServices: GetProfileWithServices[] = [profile1]

    const userService = {
      getUser: (): void => {}
    }

    beforeEach(() => {
      angular.mock.module(userModule)
    })

    beforeEach(angular.mock.module(($provide: ng.auto.IProvideService) => {
      $provide.value('apiUrl', 'awesomeURL')
      $provide.value('userService', userService)
    }))

    beforeEach(() => {
      angular.mock.module('commonConfig')
      angular.mock.module(communicatorModule)
    })

    beforeEach(inject(($injector: ng.auto.IInjectorService, $q: ng.IQService) => {
      spyOn(userService, 'getUser').and.callFake(() => $q.resolve({}))
      communicatorService = $injector.get<CommunicatorService>('communicatorService')
    }))

    it('should have a dummy test', () => {
      expect(true).toBeTruthy()
    })

    it('should authenticate', inject(($q: ng.IQService, $rootScope: IRootScopeService, RatelApi: RatelApi,
                                      ProfileApi: ProfileApi, ratelSdk: any) => {

      RatelApi.getRatelAuthConfigRoute = (_x: string): ng.IPromise<SignedAgent> =>
        $q.resolve(config)

      ProfileApi.getEmployersProfilesWithServicesRoute = (): ng.IPromise<GetProfileWithServices[]> =>
        $q.resolve(profilesWithServices)

      ratelSdk.withSignedAuth = (): ng.IPromise<Session> => $q.resolve(session)

      spyOn(RatelApi, 'getRatelAuthConfigRoute').and.callThrough()
      spyOn(ratelSdk, 'withSignedAuth').and.callThrough()

      communicatorService.authenticate()
      $rootScope.$digest()

      expect(RatelApi.getRatelAuthConfigRoute).toHaveBeenCalled()
      expect(ratelSdk.withSignedAuth).toHaveBeenCalled()

      expect(communicatorService.getClientSession()).toEqual(session)
    }))
  })
})
