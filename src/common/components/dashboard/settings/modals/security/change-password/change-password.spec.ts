namespace profitelo.components.dashboard.settings.modals.security.changePassword {

  import SecurityChangePasswordSettingsController =
    profitelo.components.dashboard.settings.modals.security.changePassword.SecurityChangePasswordSettingsController
  import IRootScopeService = profitelo.services.rootScope.IRootScopeService

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
      angular.mock.module('profitelo.swaggerResources.definitions')
      angular.mock.module('profitelo.components.dashboard.settings.modals.security.change-password')
      inject(($rootScope: IRootScopeService, $controller: ng.IControllerService, AccountApiDef: any) => {

        scope = <ISecurityChangePasswordSettingsControllerScope>$rootScope.$new()

        const injectors = {
          $scope: scope,
          $uibModalInstance: $uibModalInstance,
          AccountApi: AccountApiDef,
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
}
