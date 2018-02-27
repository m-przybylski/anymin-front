import * as angular from 'angular';

import {
  SecurityChangePasswordSettingsController,
  ISecurityChangePasswordSettingsControllerScope
} from './change-password';
import { AccountApi, AccountApiMock } from 'profitelo-api-ng/api/api';
import { TopAlertService } from '../../../../../../services/top-alert/top-alert.service';
import { TranslatorService } from '../../../../../../services/translator/translator.service';

describe('Testing Controller: securityChangePasswordSettingsController', () => {

  let controller: SecurityChangePasswordSettingsController
  let scope: ISecurityChangePasswordSettingsControllerScope
  let httpBackend: ng.IHttpBackendService
  let AccountApiMock: AccountApiMock
  const $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance =
    jasmine.createSpyObj('$uibModalInstance', ['close', 'dismiss']);
  const translatorService: TranslatorService = jasmine.createSpyObj('translatorService',
    ['translate']);
  const topAlertService: TopAlertService = jasmine.createSpyObj('topAlertService',
    ['success']);

  beforeEach(angular.mock.module(($provide: ng.auto.IProvideService) => {
    $provide.value('apiUrl', 'awesomeUrl')
  }))

  beforeEach(() => {
    angular.mock.module('ui.bootstrap')
    angular.mock.module('profitelo.components.dashboard.settings.modals.security.change-password')
    inject(($rootScope: any, $controller: ng.IControllerService, $httpBackend: ng.IHttpBackendService,
            AccountApi: AccountApi, _AccountApiMock_: AccountApiMock) => {

      scope = <ISecurityChangePasswordSettingsControllerScope>$rootScope.$new()
      httpBackend = $httpBackend
      AccountApiMock = _AccountApiMock_
      const injectors = {
        $scope: scope,
        AccountApi,
        $uibModalInstance,
        translatorService,
        topAlertService
      }

      controller = $controller<SecurityChangePasswordSettingsController>(
        'securityChangePasswordSettingsController', injectors)
    })
  })

  it('should exists', () => {
    return expect(!!controller).toBe(true)
  })

  it('should check is button disabled', () => {
    expect(controller.checkIsButtonDisabled()).toBe(false)
  })

  it('should check is entered password correct', () => {
    expect(controller.checkIsEnteredPasswordIncorrect()).toBe(false)
  })

  it('should check is new entered password correct', () => {
    expect(controller.checkIsNewEnteredPasswordCorrect()).toBe(false)
  })

  it('should handle same passwords', () => {
    AccountApiMock.changePasswordRoute(400)
    controller.setNewPassword()
    httpBackend.flush()
    expect(controller.isError).toBe(true)
    expect(controller.arePasswordsDifferent).toBe(false)
  })

  it('should handle incorrect current password', () => {
    AccountApiMock.changePasswordRoute(401)
    controller.setNewPassword()
    httpBackend.flush()
    expect(controller.isCurrentPasswordCorrect).toBe(false)
  })

  it('should throw error', () => {
    AccountApiMock.changePasswordRoute(500)
    expect(() => {
      controller.setNewPassword()
      httpBackend.flush()
    }).toThrow()
  })

  it('should cancel modal', () => {
    AccountApiMock.changePasswordRoute(200, {})
    controller.setNewPassword()
    httpBackend.flush()
    expect($uibModalInstance.dismiss).toHaveBeenCalledWith('cancel')
  })

  it('should show error about the same passwords', () => {
    controller.currentPassword = 'password'
    controller.newPassword = 'password'
    expect(controller.isSamePasswordsError()).toEqual(true)
  })

})
