import * as angular from 'angular'
import IRootScopeService = profitelo.services.rootScope.IRootScopeService
import {AccountApi} from 'profitelo-api-ng/api/api'
import userModule from '../../../../../../services/user/user'
import phoneSettingsModule from './phone-settings';
import {GeneralPhoneSettingsController, IGeneralPhoneSettingsControllerScope} from './phone-settings.controller';
import {ErrorHandlerService} from '../../../../../../services/error-handler/error-handler.service'
import {GeneralPhoneSettingsControllerService} from './phone-settings.service'

describe('Testing Controller: generalPhoneSettingsController', () => {

  let controller: GeneralPhoneSettingsController
  let scope: IGeneralPhoneSettingsControllerScope

  const userService = {
    getUser: (): void => {}
  }

  const uibModalInstance = {
    dismiss: (): void => {},
    close: (): void => {}
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
    inject(($rootScope: IRootScopeService,
            $controller: ng.IControllerService,
            AccountApi: AccountApi,
            errorHandler: ErrorHandlerService,
            generalPhoneSettingsControllerService: GeneralPhoneSettingsControllerService,
            $log: ng.ILogService) => {

      scope = <IGeneralPhoneSettingsControllerScope>$rootScope.$new()

      const injectors = {
        $scope: scope,
        AccountApi,
        $log,
        errorHandler,
        $uibModalInstance: uibModalInstance,
        generalPhoneSettingsControllerService
      }

      controller = $controller<GeneralPhoneSettingsController>('generalPhoneSettingsController', injectors)
    })
  })

  it('should exists', () => {
    return expect(!!controller).toBe(true)
  })

  it('should close modal', () => {
    spyOn(uibModalInstance, 'dismiss')
    controller.onModalClose()
    expect(uibModalInstance.dismiss).toHaveBeenCalledWith('cancel')
  })
})
