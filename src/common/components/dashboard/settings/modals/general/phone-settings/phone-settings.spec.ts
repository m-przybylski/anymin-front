namespace profitelo.components.dashboard.settings.modals.general.phoneSettings {

  import GeneralPhoneSettingsController = profitelo.components.dashboard.settings.modals.general.phoneSettings.GeneralPhoneSettingsController
  import IRootScopeService = profitelo.services.rootScope.IRootScopeService

  describe('Testing Controller: generalPhoneSettingsController', () => {

    let controller: GeneralPhoneSettingsController
    let scope: IGeneralPhoneSettingsControllerScope
    const $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance =
      jasmine.createSpyObj('$uibModalInstance', ['close', 'dismiss'])
    const User = {}

    beforeEach(angular.mock.module(($provide: ng.auto.IProvideService) => {
      $provide.value('apiUrl', 'awesomeUrl')
    }))


    beforeEach(() => {
      angular.mock.module('ui.bootstrap')
      angular.mock.module('profitelo.swaggerResources.definitions')
      angular.mock.module('profitelo.components.dashboard.settings.modals.general.phone-settings')
      inject(($rootScope: IRootScopeService, $controller: ng.IControllerService, AccountApiDef: any,
              $log: ng.ILogService) => {

        scope = <IGeneralPhoneSettingsControllerScope>$rootScope.$new()

        const injectors = {
          $scope: scope,
          $uibModalInstance: $uibModalInstance,
          AccountApi: AccountApiDef,
          $log: $log,
          User: User
        }

        controller = $controller<GeneralPhoneSettingsController>('generalPhoneSettingsController', injectors)
      })
    })

    it('should exists', () => {
      return expect(!!controller).toBe(true)
    })



  })
}
