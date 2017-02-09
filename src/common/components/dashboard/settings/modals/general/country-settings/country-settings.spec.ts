namespace profitelo.components.dashboard.settings.modals.general.countrySettings {

  describe('Testing Controller: generalCountrySettingsController', () => {

    let generalCountrySettingsController: GeneralCountrySettingsController
    let scope: IGeneralCountrySettingsControllerScope
    let uibModalInstance: any = {
      dismiss: () => {

      },
      close: () => {

      }
    }

    beforeEach(() => {
      angular.mock.module('profitelo.components.dashboard.settings.modals.general.country-settings')
      inject(($rootScope: ng.IScope, $controller: ng.IControllerService) => {

        scope = <IGeneralCountrySettingsControllerScope>$rootScope.$new()

        generalCountrySettingsController =
          $controller<GeneralCountrySettingsController>('generalCountrySettingsController', {
            $scope: scope,
            $uibModalInstance: uibModalInstance
          })
      })
    })

    it('should exists', () => {
      return expect(!!generalCountrySettingsController).toBe(true)
    })

  })
}
