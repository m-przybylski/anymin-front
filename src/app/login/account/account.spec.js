describe('Unit tests: profitelo.controller.login.account>', () => {
  describe('Testing Controller: AccountFormController', () => {

    let scope,
      AccountFormController,
      AccountApi,
      $httpBackend,
      url = 'awesomeURL',
      registrationResendPOST  = null,
      _mockParams = null,
      _mockState = null,
      $state = null,
      proTopAlertService,
      resourcesExpectations

    beforeEach(module(function($provide) {
      $provide.value('apiUrl', url)
    }))

    beforeEach(() => {
      module('profitelo.controller.login.account')
      module('profitelo.swaggerResources.definitions')
      inject(($rootScope, $controller,  $filter, $injector, _proTopWaitingLoaderService_, _User_, _proTopAlertService_, _loginStateService_, _$httpBackend_, _AccountApiDef_) => {
        $httpBackend  = _$httpBackend_
        scope = $rootScope.$new()
        _mockParams = {
          phoneNumber: {
            prefix: 321,
            number: 321321321
          },
          password: 'RANDOM_PASSWORD'
        }
        scope.phoneNumberForm = {
          '$setPristine': () => {}
        }
        _mockState = {
          go: (param, obj) => {
            return true
          }
        }
        $state = _mockState
        scope.passwordForm = scope.phoneNumberForm
        proTopAlertService = _proTopAlertService_
        AccountApi = $injector.get('AccountApi')
        AccountFormController = $controller('AccountFormController', {
          $rootScope: $rootScope,
          $scope: scope,
          $state: $state,
          AccountApi: AccountApi,
          proTopWaitingLoaderService: _proTopWaitingLoaderService_,
          User: _User_,
          proTopAlertService: _proTopAlertService_,
          loginStateService: _loginStateService_
        })

        resourcesExpectations = {
          AccountApi: {
            getRegistrationStatusByMsisdn: $httpBackend.when(_AccountApiDef_.getRegistrationStatusByMsisdn.method, _AccountApiDef_.getRegistrationStatusByMsisdn.url + '?msisdn=321321642')
          }
        }
        AccountFormController.account = _mockParams
      })
    })

    it('should have a dummy test', () => {
      expect(true).toBeTruthy()
    })

    it('should exsist', ()=> {
      expect(!!AccountFormController).toBe(true)
    })

    it('should current equals 1', ()=> {
      expect(AccountFormController.current).toEqual(1)
    })

    it('should clear form and back to phone-number view', ()=> {
      AccountFormController.current = 2
      AccountFormController.account.password = 'dasdasdasdsadasdas'
      AccountFormController.backToPhoneNumber()
      expect(AccountFormController.current).toEqual(1)
      expect(AccountFormController.account.password).toBeNull()
    })

    it('should go to password view', () => {
      resourcesExpectations.AccountApi.getRegistrationStatusByMsisdn.respond(200, {status: 'REGISTERED'})
      AccountFormController.getPhoneNumberStatus()
      $httpBackend.flush()
      expect(AccountFormController.current).toEqual(2)
    })

    it('should redirect to register ', () => {
      spyOn($state, 'go')
      resourcesExpectations.AccountApi.getRegistrationStatusByMsisdn.respond(200, {status: 'UNREGISTERED'})
      AccountFormController.getPhoneNumberStatus()
      $httpBackend.flush()
      expect($state.go).toHaveBeenCalledWith('app.login.register')
    })

    it('should get error response', () => {
      spyOn(proTopAlertService, 'error')
      resourcesExpectations.AccountApi.getRegistrationStatusByMsisdn.respond(400, {status: 'UNREGISTERED'})
      AccountFormController.getPhoneNumberStatus()
      $httpBackend.flush()
      expect(proTopAlertService.error).toHaveBeenCalled()
    })

    it('should redirect to forgot-password', () => {
      spyOn($state, 'go')
      resourcesExpectations.AccountApi.getRegistrationStatusByMsisdn.respond(200, {status: 'NO_PASSWORD'})
      AccountFormController.getPhoneNumberStatus()
      $httpBackend.flush()
      expect($state.go).toHaveBeenCalledWith('app.login.forgot-password')
    })

    it('should login user', () => {
      spyOn($state, 'go')
      registrationResendPOST = $httpBackend.when('POST', 'http://api.webpage.com/session')
      AccountFormController.current = 2
      registrationResendPOST.respond(200, {})
      AccountFormController.login()
      $httpBackend.flush()
      expect($state.go).toHaveBeenCalledWith('app.dashboard.start')
    })
    it('should display error', () => {
      registrationResendPOST = $httpBackend.when('POST', 'http://api.webpage.com/session')
      AccountFormController.current = 2
      registrationResendPOST.respond(400, {})
      AccountFormController.login()
      $httpBackend.flush()
      expect(AccountFormController.serverError).toBe(true)
    })

  })
})