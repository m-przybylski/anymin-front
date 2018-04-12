import * as angular from 'angular'

import {
  SessionApiMock, ServiceApiMock, RatelApiMock, RegistrationApi, RegistrationApiMock} from 'profitelo-api-ng/api/api'
import {TopAlertService} from '../../../common/services/top-alert/top-alert.service'
import {LoginStateService} from '../../../common/services/login-state/login-state.service'
import {TopWaitingLoaderService} from '../../../common/services/top-waiting-loader/top-waiting-loader.service'
import './account'
import userModule from '../../../common/services/user/user'
import {UserService} from '../../../common/services/user/user.service'
import {Config} from '../../../../config';
import {IRootScopeService} from '../../../common/services/root-scope/root-scope.service';
import {StateService} from '@uirouter/angularjs'
import loggerMockModule from '../../../common/services/logger/logger.mock';

describe('Unit tests: profitelo.controller.login.account>', () => {
  describe('Testing Controller: AccountFormController', () => {

    let scope: any,
      AccountFormController: any,
      RegistrationApi: RegistrationApi,
      $httpBackend: ng.IHttpBackendService,
      _mockParams: any = null,
      _mockState: any = null,
      _RatelApiMock: RatelApiMock,
      _RegistrationApiMock: RegistrationApiMock,
      _ServiceApiMock: ServiceApiMock,
      _SessionApiMock: SessionApiMock,
      $state: StateService,
      topAlertService: TopAlertService

    const userService = {
      login: (): void => {
      },
      logout: (): void => {
      }
    },
      url = 'awesomeURL'

      beforeEach(() => {
      angular.mock.module(userModule)
    })

    beforeEach(angular.mock.module(($provide: ng.auto.IProvideService) => {
      $provide.value('apiUrl', url)
      $provide.value('userService', UserService)
    }))

    beforeEach(() => {
      angular.mock.module('profitelo.controller.login.account')
      angular.mock.module(loggerMockModule);
      inject(($rootScope: IRootScopeService, $controller: ng.IControllerService, $injector: ng.auto.IInjectorService,
              _topWaitingLoaderService_: TopWaitingLoaderService, _topAlertService_: TopAlertService,
              _loginStateService_: LoginStateService, _$httpBackend_: ng.IHttpBackendService,
              RegistrationApiMock: RegistrationApiMock, RatelApiMock: RatelApiMock, ServiceApiMock: ServiceApiMock,
              SessionApiMock: SessionApiMock) => {

        _RegistrationApiMock = RegistrationApiMock
        _RatelApiMock = RatelApiMock
        _ServiceApiMock = ServiceApiMock
        _SessionApiMock = SessionApiMock

        $httpBackend = _$httpBackend_
        scope = $rootScope.$new()
        _mockParams = {
          phoneNumber: {
            prefix: 321,
            number: 321321321
          },
          password: 'RANDOM_PASSWORD'
        }
        scope.phoneNumberForm = {
          '$setPristine': (): void => {
          }
        }
        _mockState = {
          go: (_param: any, _obj: any): boolean => {
            return true
          }
        }
        $state = _mockState
        scope.passwordForm = scope.phoneNumberForm
        topAlertService = _topAlertService_
        RegistrationApi = $injector.get<RegistrationApi>('RegistrationApi')
        AccountFormController = $controller('AccountFormController', {
          $rootScope: $rootScope,
          $scope: scope,
          $state: $state,
          RegistrationApi: RegistrationApi,
          topWaitingLoaderService: _topWaitingLoaderService_,
          userService: userService,
          topAlertService: _topAlertService_,
          loginStateService: _loginStateService_
        })

        AccountFormController.account = _mockParams
      })
    })

    it('should have a dummy test', () => {
      expect(true).toBeTruthy()
    })

    it('should exsist', () => {
      expect(!!AccountFormController).toBe(true)
    })

    it('should current equals 1', () => {
      expect(AccountFormController.current).toEqual(1)
    })

    it('should clear form and back to phone-number view', () => {
      AccountFormController.current = 2
      AccountFormController.account.password = 'dasdasdasdsadasdas'
      AccountFormController.backToPhoneNumber()
      expect(AccountFormController.current).toEqual(1)
      expect(AccountFormController.account.password).toBeNull()
    })

    it('should go to password view', () => {
      AccountFormController.isPending = false
      AccountFormController.phoneNumber = '555555555';
      AccountFormController.prefix = '000';
      _RegistrationApiMock.checkRegistrationStatusRoute(200, '000555555555', <any>{status: 'REGISTERED'})

      AccountFormController.getPhoneNumberStatus()
      $httpBackend.flush()
      expect(AccountFormController.current).toEqual(2)
    })

    it('should redirect to register ', () => {
      spyOn($state, 'go')
      AccountFormController.phoneNumber = '555555555';
      AccountFormController.prefix = '000';
      _RegistrationApiMock.checkRegistrationStatusRoute(200, '000555555555', <any>{status: 'UNREGISTERED'})
      AccountFormController.getPhoneNumberStatus()
      $httpBackend.flush()
      expect($state.go).toHaveBeenCalledWith('app.login.register')
    })

    it('should get error response', () => {
      AccountFormController.phoneNumber = '555555555';
      AccountFormController.prefix = '000';
      _RegistrationApiMock.checkRegistrationStatusRoute(400, '000555555555', <any>{status: 'UNREGISTERED'})
      AccountFormController.getPhoneNumberStatus()
      $httpBackend.flush()
    })

    it('should redirect to forgot-password', () => {
      spyOn($state, 'go')
      AccountFormController.phoneNumber = '555555555';
      AccountFormController.prefix = '000';
      _RegistrationApiMock.checkRegistrationStatusRoute(200, '000555555555', <any>{status: 'NO_PASSWORD'})
      AccountFormController.getPhoneNumberStatus()
      $httpBackend.flush()
      expect($state.go).toHaveBeenCalledWith('app.login.forgot-password', {method: 'sms'})
    })

    if (!Config.isPlatformForExpert)
      it('should login user', inject(($q: ng.IQService) => {
        spyOn(userService, 'login').and.returnValue($q.resolve())
        spyOn($state, 'go')

        AccountFormController.current = 2
        AccountFormController.login()
        scope.$digest()

        expect($state.go).toHaveBeenCalledWith('app.dashboard.client.favourites')
      }))
  })
})
