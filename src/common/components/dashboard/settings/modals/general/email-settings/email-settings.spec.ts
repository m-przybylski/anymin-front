import * as angular from 'angular'
import IRootScopeService = profitelo.services.rootScope.IRootScopeService
import {IGeneralEmailSettingsControllerScope, GeneralEmailSettingsController} from './email-settings'
import userModule from '../../../../../../services/user/user'
import {AccountApi} from 'profitelo-api-ng/api/api'
import {CommonSettingsService} from '../../../../../../services/common-settings/common-settings.service'

describe('Testing Controller: generalEmailSettingsController', () => {

  let controller: GeneralEmailSettingsController
  let scope: IGeneralEmailSettingsControllerScope

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
    $provide.value('CommonSettingsService', CommonSettingsService)
  }))

  beforeEach(() => {
    angular.mock.module('ui.bootstrap')
    angular.mock.module('profitelo.components.dashboard.settings.modals.general.email-settings')

    inject(($rootScope: IRootScopeService, $controller: ng.IControllerService, AccountApi: AccountApi,
            $log: ng.ILogService, _CommonSettingsService_: CommonSettingsService) => {

      scope = <IGeneralEmailSettingsControllerScope>$rootScope.$new()

      const injectors = {
        $uibModalInstance: uibModalInstance,
        $scope: scope,
        AccountApi: AccountApi,
        userService: userService,
        $log: $log,
        CommonSettingsService: _CommonSettingsService_
      }

      controller = $controller<GeneralEmailSettingsController>('generalEmailSettingsController', injectors)
    })
  })

  it('should exists', () => {
    return expect(!!controller).toBe(true)
  })

  it('should checkIfNewEnteredEmailExist', () => {
    controller.checkIsButtonDisabled()
    expect('anymind@gmail.com').toMatch(/([a-zA-Z0-9!#$%&'*+/=?^_`{|}~.-]+)@([a-zA-Z0-9-]+)\.([a-zA-Z.]+)/)
  })

  it('should uibModalInstance', () => {
    spyOn(uibModalInstance, 'dismiss')
    controller.onModalClose()
    expect(uibModalInstance.dismiss).toHaveBeenCalledWith('cancel')
  })

})
