namespace profitelo.components.dashboard.settings.modals.security.pinNumber {

  import SecurityPinNumberSettingsController =
    profitelo.components.dashboard.settings.modals.security.pinNumber.SecurityPinNumberSettingsController
  import IRootScopeService = profitelo.services.rootScope.IRootScopeService
  import IAccountApi = profitelo.api.IAccountApi
  import IAccountApiMock = profitelo.api.IAccountApiMock

  describe('Testing Controller: securityPinNumberSettingsController', () => {

    let controller: SecurityPinNumberSettingsController
    let scope: ISecurityPinNumberSettingsControllerScope
    let httpBackend: ng.IHttpBackendService

    const $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance =
      jasmine.createSpyObj('$uibModalInstance', ['close', 'dismiss']);
    const User = {}

    beforeEach(angular.mock.module(($provide: ng.auto.IProvideService) => {
      $provide.value('apiUrl', 'awesomeUrl')
    }))

    beforeEach(() => {
      angular.mock.module('ui.bootstrap')
      angular.mock.module('profitelo.components.dashboard.settings.security.modals.pin-number')
      inject(($rootScope: IRootScopeService, $controller: ng.IControllerService, AccountApi: IAccountApi,
              AccountApiMock: IAccountApiMock, $httpBackend: ng.IHttpBackendService, lodash: _.LoDashStatic) => {

        scope = <ISecurityPinNumberSettingsControllerScope>$rootScope.$new()
        httpBackend = $httpBackend
        const injectors = {
          $scope: scope,
          $uibModalInstance: $uibModalInstance,
          AccountApi: AccountApi,
          User: User,
          lodash: lodash
        }
        AccountApiMock.getMobileProtectedViewsRoute(500)

        controller = $controller<SecurityPinNumberSettingsController>(
          'securityPinNumberSettingsController', injectors)
      })
    })

    it('should exists', () => {
      return expect(!!controller).toBe(true)
    })
  })
}
