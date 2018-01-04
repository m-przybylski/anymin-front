import * as angular from 'angular'
import {SessionApiMock} from 'profitelo-api-ng/api/api'
import {SecuritySettingsResolver} from './security-settings.service'
import {GetSession} from 'profitelo-api-ng/model/models'

describe('Unit testing: profitelo.resolvers.security-settings', () => {
  describe('for SecuritySettingsResolver service >', () => {

    let securitySettingsResolver: SecuritySettingsResolver
    let url = 'awesomeURL'
    let SessionApiMock: SessionApiMock
    let $httpBackend: ng.IHttpBackendService
    let $q: ng.IQService
    let $log: ng.ILogService
    let mockResponse: GetSession[]

    beforeEach(angular.mock.module(function ($provide: ng.auto.IProvideService) {
      $provide.value('apiUrl', url)
    }))

    beforeEach(() => {
      angular.mock.module('profitelo.resolvers.security-settings')

      mockResponse = []

      inject(($injector: ng.auto.IInjectorService) => {
        securitySettingsResolver = $injector.get<SecuritySettingsResolver>('securitySettingsResolver')
        SessionApiMock = $injector.get<SessionApiMock>('SessionApiMock')
        $httpBackend = $injector.get('$httpBackend')
        $q =  $injector.get('$q')
        $log = $injector.get('$log')
      })
    })

    it('should have resolve function', () => {
      expect(securitySettingsResolver.resolve).toBeDefined()
    })

    it('should resolve function', () => {
      SessionApiMock.getSessionsRoute(200, mockResponse)
      const resolver = $q.resolve(securitySettingsResolver.resolve())
      $httpBackend.flush()
      expect(resolver).toEqual($q.resolve(mockResponse))
    })

    it('should resolve function', () => {
      spyOn($log, 'error')
      SessionApiMock.getSessionsRoute(500)
      const resolver = $q.resolve(securitySettingsResolver.resolve())
      $httpBackend.flush()
      expect($log.error).toHaveBeenCalled()
      expect(resolver).toEqual($q.resolve([]))
    })

  })
})
