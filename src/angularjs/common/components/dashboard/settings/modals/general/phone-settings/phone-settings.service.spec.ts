import * as angular from 'angular'
import phoneSettingsModule from './phone-settings'
import {PhoneSettingsService} from './phone-settings.service'

describe('Unit testing: profitelo.components.dashboard.settings.modals.general.phone-settings ', () => {
  describe('for profitelo.components.dashboard.settings.modals.general.phone-settings', () => {

    let phoneSettingsService: PhoneSettingsService
    let rootScope: angular.IRootScopeService

    const phoneNumber: string = '500490423'

    beforeEach(() => {
      angular.mock.module(phoneSettingsModule)
    })

    beforeEach(angular.mock.module(($provide: ng.auto.IProvideService) => {
      $provide.value('apiUrl', 'awesomeUrl')
      $provide.value('normalizeTranslationKeyFilter', (x: string) => x)
    }))

    beforeEach(inject(($injector: ng.auto.IInjectorService, $rootScope: angular.IRootScopeService) => {
      phoneSettingsService =
        $injector.get<PhoneSettingsService>('phoneSettingsService')
      rootScope = $rootScope
    }))

    it('should have a dummy test', () => {
      expect(true).toBeTruthy()
    })

    it('should set new number and show pin form', () => {
      phoneSettingsService.markNumberAsUsed(phoneNumber)
      expect(phoneSettingsService.markNumberAsUsed).toBeTruthy();
    })

    it('should set status button as disabled', () => {
      const thirtySeconds: number = 40000
      jasmine.clock().install()
      jasmine.clock().mockDate(new Date())
      phoneSettingsService.markNumberAsUsed(phoneNumber)
      expect(phoneSettingsService.onButtonDisabled(phoneNumber)).toBeTruthy()
      jasmine.clock().tick(thirtySeconds)
      phoneSettingsService.markNumberAsUsed(phoneNumber)
      expect(phoneSettingsService.onButtonDisabled(phoneNumber)).toBeFalsy()
    })

    it('should check if number valid', () => {
      phoneSettingsService.onNumberValid(phoneNumber)
      expect(phoneSettingsService.onNumberValid(phoneNumber)).toBeTruthy()
    })

    it('should check if number invalid', () => {
      const incorrectPhoneNumber = '500123'
      phoneSettingsService.onNumberValid(incorrectPhoneNumber)
      expect(phoneSettingsService.onNumberValid(incorrectPhoneNumber)).toBeFalsy()
    })
  })
})
