import * as angular from 'angular'
import {SessionApiMock} from 'profitelo-api-ng/api/api'
import {SessionService} from './session.service'
import sessionModule from './session'
import {GetSession} from 'profitelo-api-ng/model/models'

describe('Unit testing: profitelo.services.userService >', () => {
  describe('for profitelo.services.userService >', () => {

    let sessionService: SessionService
    let rootScope: ng.IRootScopeService
    let q: ng.IQService
    let sessionApiMock: SessionApiMock
    let httpBackend: ng.IHttpBackendService

    const sessionMock: GetSession = {
    } as GetSession

    beforeEach(angular.mock.module(($provide: ng.auto.IProvideService) => {
      $provide.value('apiUrl', 'awesome')
    }))

    beforeEach(() => {
      angular.mock.module(sessionModule)
    })

    beforeEach(inject(($injector: ng.auto.IInjectorService, $rootScope: angular.IRootScopeService, $q: ng.IQService,
                       _SessionApiMock_: SessionApiMock, $httpBackend: ng.IHttpBackendService) => {
      sessionService = $injector.get<SessionService>('sessionService')
      rootScope = $rootScope
      q = $q
      sessionApiMock = _SessionApiMock_
      httpBackend = $httpBackend
    }))

    it('should have a dummy test', () => {
      expect(true).toBeTruthy()
    })

    it('should logout user', () => {
      sessionApiMock.login(200, sessionMock)
      sessionApiMock.logoutCurrentRoute(200, sessionMock)
      sessionService.login({})
      const logout = sessionService.logout()
      httpBackend.flush()
      expect(logout).toEqual(q.resolve())
    })

    it('should login user', () => {
      sessionApiMock.login(200, sessionMock)
      const login = sessionService.login({})
      httpBackend.flush()
      expect(login).toEqual(q.resolve(sessionMock))
    })

    it('should get session', () => {
      sessionApiMock.checkRoute(200, sessionMock)
      const getSession = sessionService.getSession(true)
      httpBackend.flush()
      expect(getSession).toEqual(q.resolve(sessionMock))
    })

  })
})
