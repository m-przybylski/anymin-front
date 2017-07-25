import * as angular from 'angular'
import {SecuritySettingsResolver} from './security-settings.service'


describe('Unit testing: profitelo.resolvers.security-settings', () => {
  describe('for SecuritySettingsResolver service >', () => {

    let securitySettingsResolver: SecuritySettingsResolver
    let url = 'awesomeURL'

    beforeEach(angular.mock.module(function ($provide: ng.auto.IProvideService) {
      $provide.value('apiUrl', url)
    }))

    beforeEach(() => {


      angular.mock.module('profitelo.resolvers.security-settings')

      inject(($injector: ng.auto.IInjectorService) => {
        securitySettingsResolver = $injector.get<SecuritySettingsResolver>('securitySettingsResolver')

      })
    })

    it('should have resolve function', () => {
      expect(securitySettingsResolver.resolve).toBeDefined()
    })

  })
})
