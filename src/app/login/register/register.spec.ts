describe('Unit tests: profitelo.controller.login.register>', () => {
  describe('Testing Controller: RegisterController', () => {

    let scope
    let RegisterController
    let _proTopWaitingLoaderService
    let _RegistrationApi
    let _AccountApi
    let _proTopAlertService
    let _UserRoles
    let _$httpBackend

    let _url = 'awesomeUrl'

    let resourcesExpectations

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

    beforeEach(angular.mock.module(($provide) => {
      $provide.value('apiUrl', _url)
    }))

    beforeEach(() => {
    angular.mock.module('profitelo.controller.login.register')
    angular.mock.module('profitelo.swaggerResources.definitions')
      inject(($rootScope, $controller, $filter, _proTopWaitingLoaderService_, _RegistrationApi_, _AccountApi_,
              _proTopAlertService_, _UserRoles_, _$httpBackend_, _AccountApiDef_, _RegistrationApiDef_,
              _loginStateService_) => {

        scope = $rootScope.$new()

        RegisterController = $controller('RegisterController', {
          $filter: $filter,
          $state: $state,
          $rootScope: $rootScope,
          proTopWaitingLoaderService: _proTopWaitingLoaderService_,
          User: _User,
          proTopAlertService: _proTopAlertService_,
          UserRoles: _UserRoles_,
          smsSessionId: smsSessionId,
          RegistrationApi: _RegistrationApi_,
          AccountApi: _AccountApi_,
          loginStateService: _loginStateService_
        })

        _$httpBackend  = _$httpBackend_
        _proTopWaitingLoaderService = _proTopWaitingLoaderService_
        _RegistrationApi = _RegistrationApi_
        _AccountApi = _AccountApi_
        _proTopAlertService = _proTopAlertService_
        _UserRoles = _UserRoles_

        RegisterController.registrationSteps = {
          sessionId: '123',
          smsCode: '123'
        }

        resourcesExpectations = {
          RegistrationApi: {
            confirmVerification: _$httpBackend.when(_RegistrationApiDef_.confirmVerification.method,
              _RegistrationApiDef_.confirmVerification.url)
          },
          AccountApi: {
            partialUpdateAccount: _$httpBackend.when(_AccountApiDef_.partialUpdateAccount.method,
              _url + '/accounts/' + _User.getData()),
            getAccountEmailExists: _$httpBackend.when(_AccountApiDef_.getAccountEmailExists.method,
              _AccountApiDef_.getAccountEmailExists.url)
          }
        }

      })
    })

    it('should exsist', ()=> {
      expect(!!RegisterController).toBe(true)
    })

    it('should request sms code status', () => {

      spyOn(_User, 'setData')

      resourcesExpectations.RegistrationApi.confirmVerification.respond(200)
      RegisterController.getSmsCodeStatus()
      _$httpBackend.flush()

      expect(_User.setData).toHaveBeenCalled()
    })
  })
})
