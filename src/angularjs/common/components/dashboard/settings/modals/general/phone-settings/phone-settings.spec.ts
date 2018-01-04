import * as angular from 'angular'

import {AccountApi} from 'profitelo-api-ng/api/api'
import userModule from '../../../../../../services/user/user'
import phoneSettingsModule from './phone-settings';
import {GeneralPhoneSettingsController, IGeneralPhoneSettingsControllerScope} from './phone-settings.controller';

describe('Testing Controller: generalPhoneSettingsController', () => {

  let controller: GeneralPhoneSettingsController
  let scope: IGeneralPhoneSettingsControllerScope

  const userService = {
    getUser: (): void => {
    }
  }

  const uibModalInstance = {
    dismiss: (): void => {

    },
    close: (): void => {

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
    inject(($rootScope: any, $controller: ng.IControllerService, AccountApi: AccountApi,
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
    controller.numberModel = '555555555'
    controller.setNewNumber()
    expect(controller.isPhoneNumberInvalid).toBe(false)
  })

  it('should phone numberModel invalid', () => {
    controller.prefixList = [{
      value: '+48',
      name: 'pl'
    }]
    controller.numberModel = '123'
    controller.setNewNumber()
    expect(controller.isPhoneNumberInvalid).toBe(true)
  })

  it('should uibModalInstance', () => {
    spyOn(uibModalInstance, 'dismiss')
    controller.onModalClose()
    expect(uibModalInstance.dismiss).toHaveBeenCalledWith('cancel')
  })

  it('should uibModalInstance', () => {
    controller.numberModel = '121'
    expect(controller.checkIfNewEnteredNumberExists())
  })

})
