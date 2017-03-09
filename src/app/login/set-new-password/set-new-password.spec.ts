import * as angular from "angular"
import {RecoverPasswordApiMock} from "../../../common/api/api/RecoverPasswordApi"
import {PasswordStrengthService} from "../../../common/services/password-strength/password-strength.service"
import {TopAlertService} from "../../../common/services/top-alert/top-alert.service"

import IRootScopeService = profitelo.services.rootScope.IRootScopeService
describe('Unit tests: profitelo.controller.login.set-new-password >', () => {
  describe('Testing Controller: SetNewPasswordController', () => {

    let scope: any
    let SetNewPasswordController: any
    let passwordStrengthService: PasswordStrengthService
    let httpBackend: ng.IHttpBackendService
    let RecoverPasswordApiMock: RecoverPasswordApiMock
    let topAlertService: TopAlertService
    let _url = 'awesomeUrl'

    let tokenStatus = {
      method: 'EMAIL',
      accountObject: {
        phoneNumber: {
          prefix: '+45',
          number: '456543123'
        },
        password: 'asas'
      },
      payload: {
        msisdn: '+48555555555'
      },
      sessionId: '123fsdf'
    }


    let $state = {
      go: () => {

      }
    }

    beforeEach(angular.mock.module(function ($provide: ng.auto.IProvideService) {
      $provide.value('apiUrl', _url)
    }))

    beforeEach(() => {
      angular.mock.module('profitelo.controller.login.set-new-password')
      angular.mock.module('profitelo.services.top-alert')

      inject(($rootScope: IRootScopeService, $controller: ng.IControllerService,
              _passwordStrengthService_: PasswordStrengthService, _topAlertService_: TopAlertService,
              _RecoverPasswordApiMock_: RecoverPasswordApiMock, _$httpBackend_: ng.IHttpBackendService) => {
        scope = $rootScope.$new()
        passwordStrengthService = _passwordStrengthService_
        RecoverPasswordApiMock = _RecoverPasswordApiMock_
        httpBackend = _$httpBackend_
        topAlertService = _topAlertService_
        SetNewPasswordController = $controller('SetNewPasswordController', {
          $state: $state,
          tokenStatus: tokenStatus,
          passwordStrengthService: passwordStrengthService,
          topAlertService: topAlertService
        })
      })
    })

    it('should exsist', () => {
      expect(!!SetNewPasswordController).toBe(true)
    })

    it('should check password strength', () => {
      let password = 'asas'
      SetNewPasswordController.onPasswordChange(password)
      expect(SetNewPasswordController.passwordStrength).toEqual(passwordStrengthService.getStrength(password))
    })

    it('should submit password change by email', () => {
      spyOn(topAlertService, 'success')
      RecoverPasswordApiMock.putRecoverPasswordEmailRoute(200, {})
      SetNewPasswordController.newPassword = 'sdfsdfsdfsdf'
      SetNewPasswordController.submitPasswordChange()
      httpBackend.flush()
      expect(topAlertService.success).toHaveBeenCalled()
    })

    it('should display error on server error', () => {
      spyOn(topAlertService, 'error')
      RecoverPasswordApiMock.putRecoverPasswordEmailRoute(500)
      SetNewPasswordController.newPassword = 'sdfsdfsdfsdf'
      SetNewPasswordController.submitPasswordChange()
      httpBackend.flush()
      expect(topAlertService.error).toHaveBeenCalled()
    })

    it('should submit password change by sms', () => {
      spyOn(topAlertService, 'success')
      tokenStatus.method = 'SMS'
      RecoverPasswordApiMock.putRecoverPasswordMsisdnRoute(200, {})
      SetNewPasswordController.submitPasswordChange()
      httpBackend.flush()
      expect(topAlertService.success).toHaveBeenCalled()
    })

  })
})
