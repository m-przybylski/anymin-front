namespace profitelo.login.register {
  import ITopWaitingLoaderService = profitelo.services.topWaitingLoader.ITopWaitingLoaderService
  import ITopAlertService = profitelo.services.topAlert.ITopAlertService
  import IFilterService = profitelo.services.filter.IFilterService
  import ILoginStateService = profitelo.services.loginState.ILoginStateService
  import IAccountApi = profitelo.api.IAccountApi
  import IRegistrationApi = profitelo.api.IRegistrationApi
  import IRegistrationApiMock = profitelo.api.IRegistrationApiMock
  import AccountWithExtras = profitelo.api.AccountWithExtras

  describe('Unit tests: profitelo.controller.login.register>', () => {
    describe('Testing Controller: RegisterController', () => {

      let scope: any
      let RegisterController: any
      let _topWaitingLoaderService: ITopWaitingLoaderService
      let _RegistrationApi: IRegistrationApi
      let _AccountApi: IAccountApi
      let _topAlertService: ITopAlertService
      let _UserRoles: any
      let _$httpBackend: ng.IHttpBackendService
      let _RegistrationApiMock: IRegistrationApiMock

      let _url = 'awesomeUrl'

      let smsSessionId = {
        accountObject: {
          phoneNumber: {
            prefix: '+45',
            number: '456543123'
          },
          password: ''
        },
        sessionId: '123fsdf'
      }


      let _User = {
        getData: () => {
          return 1
        },
        setData: () => {
        },
        setApiKeyHeader: () => {
        },
        clearUser: () => {
        }
      }

      let $state = {
        go: () => {

        }
      }

      beforeEach(angular.mock.module(($provide: ng.auto.IProvideService) => {
        $provide.value('apiUrl', _url)
      }))

      beforeEach(() => {
        angular.mock.module('profitelo.controller.login.register')
        inject(($rootScope: IRootScopeService, $controller: ng.IControllerService, $filter: IFilterService,
                _topWaitingLoaderService_: ITopWaitingLoaderService, _RegistrationApi_: IRegistrationApi,
                _AccountApi_: IAccountApi, _topAlertService_: ITopAlertService, _UserRoles_: any,
                _$httpBackend_: ng.IHttpBackendService, _RegistrationApiMock_: IRegistrationApiMock,
                _loginStateService_: ILoginStateService) => {

          scope = $rootScope.$new()

          RegisterController = $controller('RegisterController', {
            $filter: $filter,
            $state: $state,
            $rootScope: $rootScope,
            topWaitingLoaderService: _topWaitingLoaderService_,
            User: _User,
            topAlertService: _topAlertService_,
            UserRoles: _UserRoles_,
            smsSessionId: smsSessionId,
            RegistrationApi: _RegistrationApi_,
            AccountApi: _AccountApi_,
            loginStateService: _loginStateService_
          })

          _$httpBackend = _$httpBackend_
          _topWaitingLoaderService = _topWaitingLoaderService_
          _RegistrationApi = _RegistrationApi_
          _AccountApi = _AccountApi_
          _topAlertService = _topAlertService_
          _RegistrationApiMock = _RegistrationApiMock_
          _UserRoles = _UserRoles_

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

        spyOn(_User, 'setData')

        //FIXME
        _RegistrationApiMock.confirmVerification(200, <AccountWithExtras>{})
        RegisterController.getSmsCodeStatus()
        _$httpBackend.flush()

        expect(_User.setData).toHaveBeenCalled()
      })
    })
  })
}
