namespace profitelo.components.dashboard.settings.modals.general.countrySettings {

  import GeneralCountrySettingsController = profitelo.components.dashboard.settings.modals.general.countrySettings.GeneralCountrySettingsController
  import IRootScopeService = profitelo.services.rootScope.IRootScopeService

  describe('Testing Controller: generalCountrySettingsController', () => {

    let controller: GeneralCountrySettingsController
    let scope: IGeneralCountrySettingsControllerParentScope

    const $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance =
      jasmine.createSpyObj('$uibModalInstance', ['close', 'dismiss']);

    beforeEach(() => {
      angular.mock.module('ui.bootstrap')
      angular.mock.module('profitelo.components.dashboard.settings.modals.general.country-settings')
      inject(($rootScope: IRootScopeService, $controller: ng.IControllerService) => {

        scope = <IGeneralCountrySettingsControllerParentScope>$rootScope.$new()

        const injectors = {
          $scope: scope,
          $uibModalInstance: $uibModalInstance
        }

        controller = $controller<GeneralCountrySettingsController>('generalCountrySettingsController', injectors)
      })
    })

    it('should exists', () => {
      return expect(!!controller).toBe(true)
    })
  })
}
