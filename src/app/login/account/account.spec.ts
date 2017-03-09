import * as angular from "angular"
import IRootScopeService = profitelo.services.rootScope.IRootScopeService
import {AccountApi, AccountApiMock} from "../../../common/api/api/AccountApi"
import {RatelApiMock} from "../../../common/api/api/RatelApi"
import {ServiceApiMock} from "../../../common/api/api/ServiceApi"
import {SessionApiMock} from "../../../common/api/api/SessionApi"
import {TopAlertService} from "../../../common/services/top-alert/top-alert.service"
import {LoginStateService} from "../../../common/services/login-state/login-state.service"
import {TopWaitingLoaderService} from "../../../common/services/top-waiting-loader/top-waiting-loader.service"
import "./account"
import sessionModule from "../../../common/services/session/session"
import communicatorModule from "../../../common/components/communicator/communicator"

describe('Unit tests: profitelo.controller.login.account>', () => {
  describe('Testing Controller: AccountFormController', () => {

    let scope: any,
      AccountFormController: any,
      AccountApi: AccountApi,
      $httpBackend: ng.IHttpBackendService,
      url = 'awesomeURL',
      _mockParams: any = null,
      _mockState: any = null,
      _RatelApiMock: RatelApiMock,
      _AccountApiMock: AccountApiMock,
      _ServiceApiMock: ServiceApiMock,
      _SessionApiMock: SessionApiMock,
      $state: ng.ui.IStateService,
      topAlertService: TopAlertService

    const sessionService = {
      login: () => {
      },
      getSession: () => {
      }
    }
    const communicatorService = {
      authenticate: () => {
      }
    }

    beforeEach(() => {
      angular.mock.module(sessionModule)
      angular.mock.module(communicatorModule)
    })

    beforeEach(angular.mock.module(($provide: ng.auto.IProvideService) => {
      $provide.value('apiUrl', url)
      $provide.value('sessionService', sessionService)
      $provide.value('communicatorService', communicatorService)
    }))

    beforeEach(() => {
      angular.mock.module('profitelo.controller.login.account')
      angular.mock.module(communicatorModule)
      inject(($rootScope: IRootScopeService, $controller: ng.IControllerService, $injector: ng.auto.IInjectorService,
              _topWaitingLoaderService_: TopWaitingLoaderService, _topAlertService_: TopAlertService,
              _loginStateService_: LoginStateService, _$httpBackend_: ng.IHttpBackendService, AccountApiMock: AccountApiMock,
              RatelApiMock: RatelApiMock, ServiceApiMock: ServiceApiMock,
              SessionApiMock: SessionApiMock, $q: ng.IQService) => {

        spyOn(sessionService, 'getSession').and.returnValue($q.resolve())

        _AccountApiMock = AccountApiMock
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
          '$setPristine': () => {
          }
        }
        _mockState = {
          go: (_param: any, _obj: any) => {
            return true
          }
        }
        $state = _mockState
        scope.passwordForm = scope.phoneNumberForm
        topAlertService = _topAlertService_
        AccountApi = $injector.get<AccountApi>('AccountApi')
        AccountFormController = $controller('AccountFormController', {
          $rootScope: $rootScope,
          $scope: scope,
          $state: $state,
          AccountApi: AccountApi,
          topWaitingLoaderService: _topWaitingLoaderService_,
          sessionService: sessionService,
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
      _AccountApiMock.getRegistrationStatusByMsisdnRoute(200, '321321642', <any>{status: 'REGISTERED'})

      AccountFormController.getPhoneNumberStatus()
      $httpBackend.flush()
      expect(AccountFormController.current).toEqual(2)
    })

    it('should redirect to register ', () => {
      spyOn($state, 'go')
      _AccountApiMock.getRegistrationStatusByMsisdnRoute(200, '321321642', <any>{status: 'UNREGISTERED'})
      AccountFormController.getPhoneNumberStatus()
      $httpBackend.flush()
      expect($state.go).toHaveBeenCalledWith('app.login.register')
    })

    it('should get error response', () => {
      spyOn(topAlertService, 'error')
      _AccountApiMock.getRegistrationStatusByMsisdnRoute(400, '321321642', <any>{status: 'UNREGISTERED'})
      AccountFormController.getPhoneNumberStatus()
      $httpBackend.flush()
      expect(topAlertService.error).toHaveBeenCalled()
    })

    it('should redirect to forgot-password', () => {
      spyOn($state, 'go')
      _AccountApiMock.getRegistrationStatusByMsisdnRoute(200, '321321642', <any>{status: 'NO_PASSWORD'})
      AccountFormController.getPhoneNumberStatus()
      $httpBackend.flush()
      expect($state.go).toHaveBeenCalledWith('app.login.forgot-password')
    })

    it('should login user', inject(($q: ng.IQService) => {
      spyOn(sessionService, 'login').and.returnValue($q.resolve())
      spyOn($state, 'go')

      spyOn(communicatorService, 'authenticate')
      AccountFormController.current = 2
      AccountFormController.login()
      scope.$digest()

      expect(communicatorService.authenticate).toHaveBeenCalled()
      expect($state.go).toHaveBeenCalledWith('app.dashboard.client.favourites')
    }))

    it('should display error', inject(($q: ng.IQService) => {
      spyOn(sessionService, 'login').and.returnValue($q.reject())

      AccountFormController.current = 2
      AccountFormController.login()
      scope.$digest()
      expect(AccountFormController.serverError).toBe(true)
    }))

  })
})
