namespace profitelo.components.dashboard.settings.modals.general.emailSettings {
  describe('Testing Controller: generalEmailSettingsController', () => {

    let generalEmailSettingsController: GeneralEmailSettingsController
    let scope: IGeneralEmailSettingsControllerScope
    let uibModalInstance: any = {
      dismiss: () => {

      },
      close: () => {

      }
    }

    beforeEach(() => {
      angular.mock.module('profitelo.components.dashboard.settings.modals.general.email-settings')
      inject(($rootScope: ng.IScope, $controller: ng.IControllerService) => {

        scope = <IGeneralEmailSettingsControllerScope>$rootScope.$new()

        generalEmailSettingsController = $controller<GeneralEmailSettingsController>('generalEmailSettingsController', {
          '$scope': scope,
          '$uibModalInstance': uibModalInstance
        })
      })
    })

    it('should exists', () => {
      return expect(!!generalEmailSettingsController).toBe(true)
    })

  })
}
