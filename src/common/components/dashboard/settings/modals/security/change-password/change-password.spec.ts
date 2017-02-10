namespace profitelo.components.dashboard.settings.modals.security.changePassword {

  import SecurityChangePasswordSettingsController =
    profitelo.components.dashboard.settings.modals.security.changePassword.SecurityChangePasswordSettingsController
  import IRootScopeService = profitelo.services.rootScope.IRootScopeService

  describe('Testing Controller: generalChangePasswordSettingsController', () => {

    let controller: SecurityChangePasswordSettingsController
    let scope: IgeneralChangePasswordSettingsControllerScope

    const $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance =
      jasmine.createSpyObj('$uibModalInstance', ['close', 'dismiss']);

    beforeEach(() => {
      angular.mock.module('ui.bootstrap')
      angular.mock.module('profitelo.components.dashboard.settings.modals.security.change-password')
      inject(($rootScope: IRootScopeService, $controller: ng.IControllerService) => {

        scope = <IgeneralChangePasswordSettingsControllerScope>$rootScope.$new()

        const injectors = {
          $scope: scope,
          $uibModalInstance: $uibModalInstance
        }

        controller = $controller<SecurityChangePasswordSettingsController>(
          'generalChangePasswordSettingsController', injectors)
      })
    })

    it('should exists', () => {
      return expect(!!controller).toBe(true)
    })

    it('should uibModalInstance', () => {
      scope.onModalClose()
      expect($uibModalInstance.dismiss).toHaveBeenCalled()
    })

  })
}
