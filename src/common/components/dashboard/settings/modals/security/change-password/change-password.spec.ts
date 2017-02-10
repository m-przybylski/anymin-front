namespace profitelo.components.dashboard.settings.modals.security.changePassword {

  import SecurityChangePasswordSettingsController =
    profitelo.components.dashboard.settings.modals.security.changePassword.SecurityChangePasswordSettingsController
  import IRootScopeService = profitelo.services.rootScope.IRootScopeService

  describe('Testing Controller: securityChangePasswordSettingsController', () => {

    let controller: SecurityChangePasswordSettingsController
    let scope: ISecurityChangePasswordSettingsControllerScope

    const $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance =
      jasmine.createSpyObj('$uibModalInstance', ['close', 'dismiss']);

    beforeEach(() => {
      angular.mock.module('ui.bootstrap')
      angular.mock.module('profitelo.components.dashboard.settings.modals.security.change-password')
      inject(($rootScope: IRootScopeService, $controller: ng.IControllerService) => {

        scope = <ISecurityChangePasswordSettingsControllerScope>$rootScope.$new()

        const injectors = {
          $scope: scope,
          $uibModalInstance: $uibModalInstance
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
