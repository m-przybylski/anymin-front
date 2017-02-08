namespace profitelo.components.dashboard.settings.modals.general.emailSettings {

  import GeneralEmailSettingsController = profitelo.components.dashboard.settings.modals.general.emailSettings.GeneralEmailSettingsController
  import IRootScopeService = profitelo.services.rootScope.IRootScopeService

  describe('Testing Controller: generalEmailSettingsController', () => {

    let controller: GeneralEmailSettingsController
    let scope: IgeneralEmailSettingsControllerScope

    const $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance =
      jasmine.createSpyObj('$uibModalInstance', ['close', 'dismiss']);

    beforeEach(() => {
      angular.mock.module('ui.bootstrap')
      angular.mock.module('profitelo.components.dashboard.settings.modals.general.email-settings')
      inject(($rootScope: IRootScopeService, $controller: ng.IControllerService) => {

        scope = <IgeneralEmailSettingsControllerScope>$rootScope.$new()

        const injectors = {
          $scope: scope,
          $uibModalInstance: $uibModalInstance
        }

        controller = $controller<GeneralEmailSettingsController>('generalEmailSettingsController', injectors)
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
