namespace profitelo.components.dashboard.settings.modals.general.phoneSettings {

  import GeneralPhoneSettingsController = profitelo.components.dashboard.settings.modals.general.phoneSettings.GeneralPhoneSettingsController
  import IRootScopeService = profitelo.services.rootScope.IRootScopeService

  describe('Testing Controller: generalPhoneSettingsController', () => {

    let controller: GeneralPhoneSettingsController
    let scope: IGeneralPhoneSettingsControllerScope

    const $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance =
      jasmine.createSpyObj('$uibModalInstance', ['close', 'dismiss']);

    beforeEach(() => {
      angular.mock.module('ui.bootstrap')
      angular.mock.module('profitelo.components.dashboard.settings.modals.general.phone-settings')
      inject(($rootScope: IRootScopeService, $controller: ng.IControllerService) => {

        scope = <IGeneralPhoneSettingsControllerScope>$rootScope.$new()

        const injectors = {
          $scope: scope,
          $uibModalInstance: $uibModalInstance
        }

        controller = $controller<GeneralPhoneSettingsController>('generalPhoneSettingsController', injectors)
      })
    })

    it('should exists', () => {
      return expect(!!controller).toBe(true)
    })

    it('should uibModalInstance', () => {
      scope.onModalClose()
      expect($uibModalInstance.dismiss).toHaveBeenCalled()
    })

    it('should verifyCode', () => {
      const isHidden = false
      scope.verifyCode()
      expect(isHidden).toBeFalsy()
    })

  })
}
