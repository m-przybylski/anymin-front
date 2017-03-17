import * as angular from 'angular'
import IRootScopeService = profitelo.services.rootScope.IRootScopeService
import {GeneralPhoneSettingsController, IGeneralPhoneSettingsControllerScope} from './phone-settings'
import {AccountApi} from 'profitelo-api-ng/api/api'
import userModule from '../../../../../../services/user/user'

describe('Testing Controller: generalPhoneSettingsController', () => {

  let controller: GeneralPhoneSettingsController
  let scope: IGeneralPhoneSettingsControllerScope
  const $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance =
    jasmine.createSpyObj('$uibModalInstance', ['close', 'dismiss'])

  const userService = {
    getUser: () => {
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
    angular.mock.module('profitelo.components.dashboard.settings.modals.general.phone-settings')
    inject(($rootScope: IRootScopeService, $controller: ng.IControllerService, AccountApi: AccountApi,
            $log: ng.ILogService) => {

      scope = <IGeneralPhoneSettingsControllerScope>$rootScope.$new()

      const injectors = {
        $scope: scope,
        $uibModalInstance: $uibModalInstance,
        AccountApi: AccountApi,
        $log: $log,
        userService: userService
      }

      controller = $controller<GeneralPhoneSettingsController>('generalPhoneSettingsController', injectors)
    })
  })

  it('should exists', () => {
    return expect(!!controller).toBe(true)
  })

})
