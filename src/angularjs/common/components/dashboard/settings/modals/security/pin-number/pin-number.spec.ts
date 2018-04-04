import * as angular from 'angular'

import {SecurityPinNumberSettingsController, ISecurityPinNumberSettingsControllerScope} from './pin-number'
import {AccountApi, AccountApiMock} from 'profitelo-api-ng/api/api'

describe('Testing Controller: securityPinNumberSettingsController', () => {

  let controller: SecurityPinNumberSettingsController
  let scope: ISecurityPinNumberSettingsControllerScope
  let httpBackend: ng.IHttpBackendService

  const User = {}

  const uibModalInstance = {
    dismiss: (): void => {

    },
    close: (): void => {

    }
  }

  beforeEach(angular.mock.module(($provide: ng.auto.IProvideService) => {
    $provide.value('apiUrl', 'awesomeUrl')
  }))

  beforeEach(() => {
    angular.mock.module('ui.bootstrap')
    angular.mock.module('profitelo.components.dashboard.settings.security.modals.pin-number')
    inject(($rootScope: any, $controller: ng.IControllerService, AccountApi: AccountApi,
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
    expect(!!controller).toBe(true)
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

  it('should check is new password is correct', () => {
    controller.confirmPassword = '123'
    expect(controller.checkIsNewEnteredPasswordCorrected()).toBeFalsy()
    controller.confirmPassword = '123456SSS7qqa'
    expect(controller.checkIsNewEnteredPasswordCorrected()).toBeTruthy()
  })

})
