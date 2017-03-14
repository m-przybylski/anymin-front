import * as angular from "angular"
import IRootScopeService = profitelo.services.rootScope.IRootScopeService
import {IGeneralEmailSettingsControllerScope, GeneralEmailSettingsController} from "./email-settings"
import userModule from "../../../../../../services/user/user"
import {AccountApi} from "profitelo-api-ng/api/api"

describe('Testing Controller: generalEmailSettingsController', () => {

  let controller: GeneralEmailSettingsController
  let scope: IGeneralEmailSettingsControllerScope
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
    angular.mock.module('profitelo.components.dashboard.settings.modals.general.email-settings')

    inject(($rootScope: IRootScopeService, $controller: ng.IControllerService, AccountApi: AccountApi,
            $log: ng.ILogService) => {

      scope = <IGeneralEmailSettingsControllerScope>$rootScope.$new()

      const injectors = {
        $uibModalInstance: $uibModalInstance,
        $scope: scope,
        AccountApi: AccountApi,
        userService: userService,
        $log: $log
      }

      controller = $controller<GeneralEmailSettingsController>('generalEmailSettingsController', injectors)
    })
  })

  it('should exists', () => {
    return expect(!!controller).toBe(true)
  })

})
