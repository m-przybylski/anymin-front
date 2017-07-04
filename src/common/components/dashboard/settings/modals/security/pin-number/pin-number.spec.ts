import * as angular from 'angular'
import IRootScopeService = profitelo.services.rootScope.IRootScopeService
import {SecurityPinNumberSettingsController, ISecurityPinNumberSettingsControllerScope} from './pin-number'
import {AccountApi, AccountApiMock} from 'profitelo-api-ng/api/api'

describe('Testing Controller: securityPinNumberSettingsController', () => {

  let controller: SecurityPinNumberSettingsController
  let scope: ISecurityPinNumberSettingsControllerScope
  let httpBackend: ng.IHttpBackendService

  const User = {}

  const uibModalInstance = {
    dismiss: () => {

    },
    close: () => {

    }
  }

  beforeEach(angular.mock.module(($provide: ng.auto.IProvideService) => {
    $provide.value('apiUrl', 'awesomeUrl')
  }))

  beforeEach(() => {
    angular.mock.module('ui.bootstrap')
    angular.mock.module('profitelo.components.dashboard.settings.security.modals.pin-number')
    inject(($rootScope: IRootScopeService, $controller: ng.IControllerService, AccountApi: AccountApi,
            AccountApiMock: AccountApiMock, $httpBackend: ng.IHttpBackendService, ) => {

      scope = <ISecurityPinNumberSettingsControllerScope>$rootScope.$new()
      httpBackend = $httpBackend
      const injectors = {
        $scope: scope,
        $uibModalInstance: uibModalInstance,
        AccountApi: AccountApi,
        User: User
      }
      AccountApiMock.getMobileProtectedViewsRoute(500)

      controller = $controller<SecurityPinNumberSettingsController>(
        'securityPinNumberSettingsController', injectors)
    })
  })

  it('should exists', () => {
    return expect(!!controller).toBe(true)
  })

  it('should uibModalInstance', () => {
    spyOn(uibModalInstance, 'dismiss')
    controller.onModalClose()
    expect(uibModalInstance.dismiss).toHaveBeenCalledWith('cancel')
  })

  it('should be new pin typed', () => {
    controller.sendPin()
    expect(controller.isNewPinTyped).toBe(true)
  })

})
