describe('Unit tests: profitelo.controller.login.register>', () => {
  describe('Testing Controller: RegisterController', () => {

    let scope
    let RegisterController
    let _proTopWaitingLoaderService
    let _RegistrationApi
    let _passwordStrengthService
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

      }
    }

    let $state = {
      go: () => {

      }
    }

    beforeEach(module(function($provide) {
      $provide.value('apiUrl', _url)
    }))

    beforeEach(() => {
      module('profitelo.controller.login.register')
      module('profitelo.swaggerResources.definitions')
      inject(($rootScope, $controller, $filter, _proTopWaitingLoaderService_, _passwordStrengthService_, _RegistrationApi_, _AccountApi_, _proTopAlertService_, _UserRoles_, _$httpBackend_, _AccountApiDef_, _RegistrationApiDef_) => {
        scope = $rootScope.$new()



        RegisterController = $controller('RegisterController', {
          $filter: $filter,
          $rootScope: $rootScope,
          $state: $state,
          proTopWaitingLoaderService: _proTopWaitingLoaderService_,
          passwordStrengthService: _passwordStrengthService_,
          smsSessionId: smsSessionId,
          RegistrationApi: _RegistrationApi_,
          AccountApi: _AccountApi_,
          User: _User,
          proTopAlertService: _proTopAlertService_,
          UserRoles: _UserRoles_
        })

        _$httpBackend  = _$httpBackend_
        _proTopWaitingLoaderService = _proTopWaitingLoaderService_
        _RegistrationApi = _RegistrationApi_
        _passwordStrengthService = _passwordStrengthService_
        _AccountApi = _AccountApi_
        _proTopAlertService = _proTopAlertService_
        _UserRoles = _UserRoles_

        RegisterController.registrationSteps = {
          sessionId: '123',
          smsCode: '123'
        }


        resourcesExpectations = {
          RegistrationApi: {
            confirmVerification: _$httpBackend.when(_RegistrationApiDef_.confirmVerification.method, _RegistrationApiDef_.confirmVerification.url)
          },
          AccountApi: {
            partialUpdateAccount: _$httpBackend.when(_AccountApiDef_.partialUpdateAccount.method,  _url + '/accounts/' + _User.getData()),
            getAccountEmailExists: _$httpBackend.when(_AccountApiDef_.getAccountEmailExists.method, _AccountApiDef_.getAccountEmailExists.url)
          }
        }

      })
    })

    it('should exsist', ()=> {
      expect(!!RegisterController).toBe(true)
    })

    it('should mesure password strength', () => {

      let strongPassword
      let weakPassword
      let mediumPassword
      let badPassword

      RegisterController.onPasswordChange('123')
      badPassword = RegisterController.passwordStrength

      RegisterController.onPasswordChange('123fsdfs')
      weakPassword = RegisterController.passwordStrength

      RegisterController.onPasswordChange('123fsdfs,')
      mediumPassword= RegisterController.passwordStrength

      RegisterController.onPasswordChange(';12;3gjsa08ian1ejfns,np')
      strongPassword = RegisterController.passwordStrength


      expect(badPassword).toEqual(1)
      expect(weakPassword).toEqual(2)
      expect(mediumPassword).toEqual(3)
      expect(strongPassword).toEqual(4)
    })

    it('should request sms code status', () => {

      spyOn(_User, 'setData')

      resourcesExpectations.RegistrationApi.confirmVerification.respond(200)
      RegisterController.getSmsCodeStatus()
      _$httpBackend.flush()

      expect(RegisterController.current).toEqual(2)
      expect(_User.setData).toHaveBeenCalled()


    })


    it('should set new email', () => {
      spyOn($state, 'go')
      resourcesExpectations.AccountApi.partialUpdateAccount.respond(200)
      resourcesExpectations.AccountApi.getAccountEmailExists.respond(400)
      RegisterController.registrationSteps.email = ':email'
      RegisterController.setNewEmail()
      _$httpBackend.flush()
      expect($state.go).toHaveBeenCalledWith('app.dashboard.start')

    })

    it('should handle bad requesnt while setting new email', () => {
      spyOn(_proTopAlertService, 'error')
      resourcesExpectations.AccountApi.partialUpdateAccount.respond(500)
      resourcesExpectations.AccountApi.getAccountEmailExists.respond(400)
      RegisterController.registrationSteps.email = ':email'
      RegisterController.setNewEmail()
      _$httpBackend.flush()

      expect(_proTopAlertService.error).toHaveBeenCalledWith({ message: 'INTERFACE.API_ERROR', timeout: 4 })
    })

    it('should set new password on completeRegistration', () => {
      spyOn(_proTopAlertService, 'success')

      resourcesExpectations.AccountApi.partialUpdateAccount.respond(200)
      RegisterController.completeRegistration()
      _$httpBackend.flush()

      expect(RegisterController.current).toEqual(3)

    })



  })
})
