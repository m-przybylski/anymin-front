namespace profitelo.components.dashboard.settings.modals.general.phoneSettings {

  import GeneralPhoneSettingsController = profitelo.components.dashboard.settings.modals.general.phoneSettings.GeneralPhoneSettingsController
  import IRootScopeService = profitelo.services.rootScope.IRootScopeService
  import IAccountApi = profitelo.api.IAccountApi

  describe('Testing Controller: generalPhoneSettingsController', () => {

    let controller: GeneralPhoneSettingsController
    let scope: IGeneralPhoneSettingsControllerScope
    const $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance =
      jasmine.createSpyObj('$uibModalInstance', ['close', 'dismiss'])

    const userService = {
      getUser: () => {}
    }

    beforeEach(() => {
      angular.mock.module('profitelo.services.user')
    })

    beforeEach(angular.mock.module(($provide: ng.auto.IProvideService) => {
      $provide.value('apiUrl', 'awesomeUrl')
      $provide.value('userService', userService)
    }))

    beforeEach(() => {
      angular.mock.module('ui.bootstrap')
      angular.mock.module('profitelo.components.dashboard.settings.modals.general.phone-settings')
      inject(($rootScope: IRootScopeService, $controller: ng.IControllerService, AccountApi: IAccountApi,
              $log: ng.ILogService) => {

        scope = <IGeneralPhoneSettingsControllerScope>$rootScope.$new()

        const injectors = {
          $scope: scope,
          $uibModalInstance: $uibModalInstance,
          AccountApi: AccountApi,
          $log: $log,
          userService: userService
        }

        controller = $controller<GeneralPhoneSettingsController>('generalPhoneSettingsController', injectors)
      })
    })

    it('should exists', () => {
      return expect(!!controller).toBe(true)
    })



  })
}
