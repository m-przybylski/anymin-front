import * as angular from 'angular'
import IRootScopeService = profitelo.services.rootScope.IRootScopeService
import {AccountApi, AccountApiMock} from 'profitelo-api-ng/api/api'
import {TopAlertService} from '../../../common/services/top-alert/top-alert.service'
import {TopWaitingLoaderService} from '../../../common/services/top-waiting-loader/top-waiting-loader.service'
import {IFilterService} from '../../../common/services/filter/filter.service'
import {PasswordStrengthService} from '../../../common/services/password-strength/password-strength.service'
import './set-password'

describe('Unit tests: profitelo.controller.post-register.set-password>', () => {
  describe('Testing Controller: SetPasswordController', () => {

    let scope: any
    let SetPasswordController: any
    let _topWaitingLoaderService
    let _passwordStrengthService
    let _AccountApi: AccountApi
    let _topAlertService: TopAlertService
    let _$httpBackend: ng.IHttpBackendService
    let _AccountApiMock_: AccountApiMock

    let _url = 'awesomeUrl'

    let user = {
      id: '123'
    }

    let $state = {
      go: () => {
      }
    }

    beforeEach(angular.mock.module(($provide: ng.auto.IProvideService) => {
      $provide.value('apiUrl', _url)
    }))

    beforeEach(() => {
      angular.mock.module('profitelo.controller.post-register.set-password')
      angular.mock.module('profitelo.services.pro-top-waiting-loader-service')
      angular.mock.module('profitelo.services.password-strength')
      inject(($rootScope: IRootScopeService, $controller: ng.IControllerService, $filter: IFilterService,
              _topWaitingLoaderService_: TopWaitingLoaderService, _passwordStrengthService_: PasswordStrengthService,
              _AccountApi_: AccountApi, _topAlertService_: TopAlertService, _$httpBackend_: ng.IHttpBackendService,
              AccountApiMock: AccountApiMock) => {

        scope = $rootScope.$new()

        SetPasswordController = $controller('SetPasswordController', {
          $filter: $filter,
          $rootScope: $rootScope,
          $state: $state,
          topWaitingLoaderService: _topWaitingLoaderService_,
          passwordStrengthService: _passwordStrengthService_,
          user: user,
          topAlertService: _topAlertService_,
          AccountApi: _AccountApi_
        })

        _$httpBackend = _$httpBackend_
        _topWaitingLoaderService = _topWaitingLoaderService_
        _passwordStrengthService = _passwordStrengthService_
        _AccountApi = _AccountApi_
        _AccountApiMock_ = AccountApiMock
        _topAlertService = _topAlertService_

      })
    })

    it('should exsist', () => {
      expect(!!SetPasswordController).toBe(true)
    })

    it('should mesure password strength', () => {

      let strongPassword
      let weakPassword
      let mediumPassword
      let badPassword

      SetPasswordController.onPasswordChange('123')
      badPassword = SetPasswordController.passwordStrength

      SetPasswordController.onPasswordChange('123fsdfs')
      weakPassword = SetPasswordController.passwordStrength

      SetPasswordController.onPasswordChange('123fsdfs,')
      mediumPassword = SetPasswordController.passwordStrength

      SetPasswordController.onPasswordChange(';12;3gjsa08ian1ejfns,np')
      strongPassword = SetPasswordController.passwordStrength


      expect(badPassword).toEqual(1)
      expect(weakPassword).toEqual(2)
      expect(mediumPassword).toEqual(3)
      expect(strongPassword).toEqual(4)
    })


    it('should set new password on completeRegistration', () => {
      spyOn(_topAlertService, 'success')

      _AccountApiMock_.partialUpdateAccountRoute(200, user.id, <any>{})

      SetPasswordController.completeRegistration()
      _$httpBackend.flush()
    })
  })
})
