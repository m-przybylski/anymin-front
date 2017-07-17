import * as angular from 'angular'
import IRootScopeService = profitelo.services.rootScope.IRootScopeService
import {AccountApi} from 'profitelo-api-ng/api/api'
import userModule from '../../../../../../services/user/user'
import phoneSettingsModule from './phone-settings';
import {GeneralPhoneSettingsController, IGeneralPhoneSettingsControllerScope} from './phone-settings.controller';

describe('Testing Controller: generalPhoneSettingsController', () => {

  let controller: GeneralPhoneSettingsController
  let scope: IGeneralPhoneSettingsControllerScope

  const userService = {
    getUser: () => {
    }
  }

  const uibModalInstance = {
    dismiss: () => {

    },
    close: () => {

    }
  }

  beforeEach(() => {
    angular.mock.module(userModule)
  })

  beforeEach(angular.mock.module(($provide: ng.auto.IProvideService) => {
    $provide.value('apiUrl', 'awesomeUrl')
    $provide.value('userService', userService)
  }))

  beforeEach(() => {
    angular.mock.module('ui.bootstrap')
    angular.mock.module(phoneSettingsModule)
    inject(($rootScope: IRootScopeService, $controller: ng.IControllerService, AccountApi: AccountApi,
            $log: ng.ILogService) => {

      scope = <IGeneralPhoneSettingsControllerScope>$rootScope.$new()

      const injectors = {
        $scope: scope,
        AccountApi: AccountApi,
        $log: $log,
        $uibModalInstance: uibModalInstance
      }

      controller = $controller<GeneralPhoneSettingsController>('generalPhoneSettingsController', injectors)
    })
  })

  it('should exists', () => {
    return expect(!!controller).toBe(true)
  })

  it('should phone number valid', () => {
    controller.prefixList = [{
      value: '+48',
      name: 'pl'
    }]
    controller.number = '555555555'
    controller.setNewNumber()
    expect(controller.isPhoneNumberInvalid).toBe(false)
  })

  it('should phone number invalid', () => {
    controller.prefixList = [{
      value: '+48',
      name: 'pl'
    }]
    controller.number = '123'
    controller.setNewNumber()
    expect(controller.isPhoneNumberInvalid).toBe(true)
  })

  it('should uibModalInstance', () => {
    spyOn(uibModalInstance, 'dismiss')
    controller.onModalClose()
    expect(uibModalInstance.dismiss).toHaveBeenCalledWith('cancel')
  })

})
