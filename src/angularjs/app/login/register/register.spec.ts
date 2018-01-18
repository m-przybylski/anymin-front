import * as angular from 'angular'

import {RegistrationApi, RegistrationApiMock, AccountApi} from 'profitelo-api-ng/api/api'
import apiModule from 'profitelo-api-ng/api.module'
import {TopAlertService} from '../../../common/services/top-alert/top-alert.service'
import {TopWaitingLoaderService} from '../../../common/services/top-waiting-loader/top-waiting-loader.service'
import {LoginStateService} from '../../../common/services/login-state/login-state.service'
import {IFilterService} from '../../../common/services/filter/filter.service'
import {IRootScopeService} from '../../../common/services/root-scope/root-scope.service';

describe('Unit tests: profitelo.controller.login.register>', () => {
  describe('Testing Controller: RegisterController', () => {

    let scope: any
    let RegisterController: any
    let _topWaitingLoaderService: TopWaitingLoaderService
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

    const sessionServiceWrapper = {
      setApiKey: (): void => {
      },
      getSession: (): Promise<any> => Promise.resolve({})
    }

    const $state = {
      go: (): void => {

      }
    }

    beforeEach(() => {
      angular.mock.module(apiModule)
    })

    beforeEach(angular.mock.module(($provide: ng.auto.IProvideService) => {
      $provide.value('apiUrl', _url)
    }))

    beforeEach(() => {
      angular.mock.module('profitelo.controller.login.register')
      inject(($rootScope: IRootScopeService, $controller: ng.IControllerService, $filter: IFilterService,
              _topWaitingLoaderService_: TopWaitingLoaderService, RegistrationApi: RegistrationApi,
              AccountApi: AccountApi, _topAlertService_: TopAlertService,
              _$httpBackend_: ng.IHttpBackendService, RegistrationApiMock: RegistrationApiMock,
              _loginStateService_: LoginStateService, $q: ng.IQService) => {

        scope = $rootScope.$new()

        RegisterController = $controller('RegisterController', {
          $filter,
          $state,
          $rootScope,
          topWaitingLoaderService: _topWaitingLoaderService_,
          sessionServiceWrapper,
          topAlertService: _topAlertService_,
          smsSessionId,
          RegistrationApi,
          AccountApi,
          loginStateService: _loginStateService_
        })
        q = $q
        _$httpBackend = _$httpBackend_
        _topWaitingLoaderService = _topWaitingLoaderService_
        _topAlertService = _topAlertService_
        _RegistrationApiMock = RegistrationApiMock

        RegisterController.registrationSteps = {
          sessionId: '123',
          smsCode: '123'
        }

      })
    })

    it('should exsist', () => {
      expect(!!RegisterController).toBe(true)
    })
  })
})
