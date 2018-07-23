import * as angular from 'angular'
import phoneSettingsModule from './phone-settings'
import { PhoneSettingsService } from './phone-settings.service'

describe('Unit testing: profitelo.components.dashboard.settings.modals.general.phone-settings ', () => {
  describe('for profitelo.components.dashboard.settings.modals.general.phone-settings', () => {

    let phoneSettingsService: PhoneSettingsService
    let rootScope: angular.IRootScopeService

    const phoneNumber = '500490423'

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
      jasmine.clock().install()
    }))

    afterEach(() => {
      jasmine.clock().uninstall();
    })

    it('should have a dummy test', () => {
      expect(true).toBeTruthy()
    })

    it('should set new number and show pin form', () => {
      phoneSettingsService.addNewNumber(phoneNumber)
      expect(phoneSettingsService.addNewNumber).toBeTruthy();
    })

    it('should set status button as disabled when promise error', () => {
      const thirtySeconds = 20000
      jasmine.clock().mockDate(new Date())
      phoneSettingsService.addNewNumber(phoneNumber)
      expect(phoneSettingsService.setButtonDisabled(phoneNumber)).toBeTruthy()
      jasmine.clock().tick(thirtySeconds)
      phoneSettingsService.addNewNumber(phoneNumber)
      expect(phoneSettingsService.setButtonDisabled(phoneNumber)).toBeFalsy()
    })

    it('should check if number valid', () => {
      phoneSettingsService.setNumberValid(phoneNumber)
      expect(phoneSettingsService.setNumberValid(phoneNumber)).toBeTruthy()
    })

    it('should check if number invalid', () => {
      const incorrectPhoneNumber = '500123'
      phoneSettingsService.setNumberValid(incorrectPhoneNumber)
      expect(phoneSettingsService.setNumberValid(incorrectPhoneNumber)).toBeFalsy()
    })

    it('should check is backend validation error', () => {
      expect(phoneSettingsService.isBackendValidationError()).toBeFalsy();
    });

    it('should check is re send sms failed', () => {
      expect(phoneSettingsService.isReSendSmsFailed()).toBeFalsy();
    });

  });
})
