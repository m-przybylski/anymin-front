namespace profitelo.components.dashboard.settings.modals.security.pinNumber {

  import SecurityPinNumberSettingsController =
    profitelo.components.dashboard.settings.modals.security.pinNumber.SecurityPinNumberSettingsController
  import IRootScopeService = profitelo.services.rootScope.IRootScopeService

  describe('Testing Controller: securityPinNumberSettingsController', () => {

    let controller: SecurityPinNumberSettingsController
    let scope: ISecurityPinNumberSettingsControllerScope

    const $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance =
      jasmine.createSpyObj('$uibModalInstance', ['close', 'dismiss']);

    beforeEach(() => {
      angular.mock.module('ui.bootstrap')
      angular.mock.module('profitelo.components.dashboard.settings.security.modals.pin-number')
      inject(($rootScope: IRootScopeService, $controller: ng.IControllerService) => {

        scope = <ISecurityPinNumberSettingsControllerScope>$rootScope.$new()

        const injectors = {
          $scope: scope,
          $uibModalInstance: $uibModalInstance
        }

        controller = $controller<SecurityPinNumberSettingsController>(
          'securityPinNumberSettingsController', injectors)
      })
    })

    it('should exists', () => {
      return expect(!!controller).toBe(true)
    })
  })
}
