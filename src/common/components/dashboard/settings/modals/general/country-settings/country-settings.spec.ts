namespace profitelo.components.dashboard.settings.modals.general.countrySettings {

  import GeneralCountrySettingsController = profitelo.components.dashboard.settings.modals.general.countrySettings.GeneralCountrySettingsController
  import IRootScopeService = profitelo.services.rootScope.IRootScopeService
  import IAccountApi = profitelo.api.IAccountApi
  import IAccountApiMock = profitelo.api.IAccountApiMock

  describe('Testing Controller: generalCountrySettingsController', () => {

    let controller: GeneralCountrySettingsController
    let scope: IGeneralCountrySettingsControllerScope
    let httpBackend: ng.IHttpBackendService

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
      angular.mock.module('ngLodash')
      angular.mock.module('profitelo.components.dashboard.settings.modals.general.country-settings')
      inject(($rootScope: IRootScopeService, $controller: ng.IControllerService, AccountApi: IAccountApi, _AccountApiMock_: IAccountApiMock,
              lodash: _.LoDashStatic, $httpBackend: ng.IHttpBackendService) => {

        scope = <IGeneralCountrySettingsControllerScope>$rootScope.$new()
        httpBackend = $httpBackend
        const injectors = {
          $scope: scope,
          $uibModalInstance: $uibModalInstance,
          userService: userService,
          AccountApi: AccountApi,
          lodash: lodash
        }

        _AccountApiMock_.getSupportedCountriesRoute(500)

        controller = $controller<GeneralCountrySettingsController>('generalCountrySettingsController', injectors)
      })
    })

    it('should exists', () => {
      return expect(!!controller).toBe(true)
    })
  })
}
