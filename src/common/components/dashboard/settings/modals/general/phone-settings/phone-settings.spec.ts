namespace  profitelo.components.dashboard.settings.modals.general.phoneSettings {
  describe('Testing Controller: generalPhoneSettingsController', () => {

    let generalPhoneSettingsController: GeneralPhoneSettingsController
    let scope: IGeneralPhoneSettingsControllerScope
    let uibModalInstance: any = {
      dismiss: () => {

      },
      close: () => {

      }
    }

    beforeEach(() => {
      angular.mock.module('profitelo.components.dashboard.settings.modals.general.phone-settings')
      inject(($rootScope: ng.IScope, $controller: ng.IControllerService) => {

        scope = <IGeneralPhoneSettingsControllerScope>$rootScope.$new()

        generalPhoneSettingsController = $controller<GeneralPhoneSettingsController>('generalPhoneSettingsController', {
          $scope: scope,
          $uibModalInstance: uibModalInstance
        })
      })
    })

    it('should exists', () => {
      return expect(!!generalPhoneSettingsController).toBe(true)
    })

  })
}
