import * as angular from "angular"
import IRootScopeService = profitelo.services.rootScope.IRootScopeService
import {
  SecurityChangePasswordSettingsController,
  ISecurityChangePasswordSettingsControllerScope
} from "./change-password"
import {AccountApi} from "profitelo-api-ng/api/api"

describe('Testing Controller: securityChangePasswordSettingsController', () => {

  let controller: SecurityChangePasswordSettingsController
  let scope: ISecurityChangePasswordSettingsControllerScope

  const $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance =
    jasmine.createSpyObj('$uibModalInstance', ['close', 'dismiss']);
  const User = {}

  beforeEach(angular.mock.module(($provide: ng.auto.IProvideService) => {
    $provide.value('apiUrl', 'awesomeUrl')
  }))

  beforeEach(() => {
    angular.mock.module('ui.bootstrap')
    angular.mock.module('profitelo.components.dashboard.settings.modals.security.change-password')
    inject(($rootScope: IRootScopeService, $controller: ng.IControllerService, AccountApi: AccountApi) => {

      scope = <ISecurityChangePasswordSettingsControllerScope>$rootScope.$new()

      const injectors = {
        $scope: scope,
        AccountApi: AccountApi,
        $uibModalInstance: $uibModalInstance,
        User: User
      }

      controller = $controller<SecurityChangePasswordSettingsController>(
        'securityChangePasswordSettingsController', injectors)
    })
  })

  it('should exists', () => {
    return expect(!!controller).toBe(true)
  })
})
