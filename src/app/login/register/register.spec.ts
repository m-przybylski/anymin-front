import * as angular from 'angular'
import IRootScopeService = profitelo.services.rootScope.IRootScopeService
import {RegistrationApi, RegistrationApiMock, AccountApi} from 'profitelo-api-ng/api/api'
import {GetSession} from 'profitelo-api-ng/model/models'
import {TopAlertService} from '../../../common/services/top-alert/top-alert.service'
import {TopWaitingLoaderService} from '../../../common/services/top-waiting-loader/top-waiting-loader.service'
import {LoginStateService} from '../../../common/services/login-state/login-state.service'
import {IFilterService} from '../../../common/services/filter/filter.service'
import sessionModule from '../../../common/services/session/session'
import {IPromise} from 'angular'

describe('Unit tests: profitelo.controller.login.register>', () => {
  describe('Testing Controller: RegisterController', () => {

    let scope: any
    let RegisterController: any
    let _topWaitingLoaderService: TopWaitingLoaderService
    let _RegistrationApi: RegistrationApi
    let _AccountApi: AccountApi
    let _topAlertService: TopAlertService
    let _$httpBackend: ng.IHttpBackendService
    let _RegistrationApiMock: RegistrationApiMock
    let q: ng.IQService

    const _url = 'awesomeUrl'

    const smsSessionId = {
      accountObject: {
        phoneNumber: {
          prefix: '+45',
          number: '456543123'
        },
        password: ''
      },
      sessionId: '123fsdf'
    }

    const sessionService = {
      setApiKey: (): void => {
      },
      getSession: (): IPromise<void> => q.resolve()
    }

    const $state = {
      go: (): void => {

      }
    }

    beforeEach(() => {
      angular.mock.module(sessionModule)
    })

    beforeEach(angular.mock.module(($provide: ng.auto.IProvideService) => {
      $provide.value('apiUrl', _url)
      $provide.value('sessionService', sessionService)
    }))

    beforeEach(() => {
      angular.mock.module('profitelo.controller.login.register')
      inject(($rootScope: IRootScopeService, $controller: ng.IControllerService, $filter: IFilterService,
              _topWaitingLoaderService_: TopWaitingLoaderService, _RegistrationApi_: RegistrationApi,
              _AccountApi_: AccountApi, _topAlertService_: TopAlertService,
              _$httpBackend_: ng.IHttpBackendService, _RegistrationApiMock_: RegistrationApiMock,
              _loginStateService_: LoginStateService, $q: ng.IQService) => {

        scope = $rootScope.$new()

        RegisterController = $controller('RegisterController', {
          $filter: $filter,
          $state: $state,
          $rootScope: $rootScope,
          topWaitingLoaderService: _topWaitingLoaderService_,
          sessionService: sessionService,
          topAlertService: _topAlertService_,
          smsSessionId: smsSessionId,
          RegistrationApi: _RegistrationApi_,
          AccountApi: _AccountApi_,
          loginStateService: _loginStateService_
        })
        q = $q
        _$httpBackend = _$httpBackend_
        _topWaitingLoaderService = _topWaitingLoaderService_
        _RegistrationApi = _RegistrationApi_
        _AccountApi = _AccountApi_
        _topAlertService = _topAlertService_
        _RegistrationApiMock = _RegistrationApiMock_

        RegisterController.registrationSteps = {
          sessionId: '123',
          smsCode: '123'
        }

      })
    })

    it('should exsist', () => {
      expect(!!RegisterController).toBe(true)
    })

    it('should request sms code status', () => {

      spyOn(sessionService, 'getSession')

      // FIXME
      _RegistrationApiMock.confirmVerificationRoute(200, <GetSession>{})
      RegisterController.getSmsCodeStatus()
      _$httpBackend.flush()

      expect(sessionService.getSession).toHaveBeenCalled()
    })
  })
})
