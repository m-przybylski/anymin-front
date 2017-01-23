describe('Unit tests: profitelo.controller.login.account>', () => {
  describe('Testing Controller: AccountFormController', () => {

    let scope,
      AccountFormController,
      AccountApi,
      $httpBackend,
      url = 'awesomeURL',
      _mockParams = null,
      _mockState = null,
      $state = null,
      topAlertService,
      resourcesExpectations,
      communicatorService

    beforeEach(angular.mock.module(($provide) => {
      $provide.value('apiUrl', url)
    }))

    beforeEach(() => {
    angular.mock.module('profitelo.controller.login.account')
    angular.mock.module('profitelo.services.communicator')
    angular.mock.module('profitelo.swaggerResources.definitions')
      inject(($rootScope, $controller,  $filter, $injector, _proTopWaitingLoaderService_, _User_, _topAlertService_,
              _loginStateService_, _$httpBackend_, _AccountApiDef_, _communicatorService_, _RatelApiDef_, _ServiceApiDef_,
              _SessionApiDef_) => {
        $httpBackend  = _$httpBackend_
        communicatorService = _communicatorService_
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
        topAlertService = _topAlertService_
        AccountApi = $injector.get('AccountApi')
        AccountFormController = $controller('AccountFormController', {
          $rootScope: $rootScope,
          $scope: scope,
          $state: $state,
          AccountApi: AccountApi,
          proTopWaitingLoaderService: _proTopWaitingLoaderService_,
          User: _User_,
          topAlertService: _topAlertService_,
          loginStateService: _loginStateService_
        })

        resourcesExpectations = {
          AccountApi: {
            getRegistrationStatusByMsisdn: $httpBackend.when(_AccountApiDef_.getRegistrationStatusByMsisdn.method, _AccountApiDef_.getRegistrationStatusByMsisdn.url + '?msisdn=321321642')
          },
          RatelApi: {
            getRatelAuthConfig: $httpBackend.when(_RatelApiDef_.getRatelAuthConfig.method, _RatelApiDef_.getRatelAuthConfig.url)
          },
          ServiceApi: {
            getProfileServices: $httpBackend.when(_ServiceApiDef_.getProfileServices.method, _ServiceApiDef_.getProfileServices.url)
          },
          SessionApi: {
            login: $httpBackend.when(_SessionApiDef_.login.method, 'http://api.webpage.com/session')
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
      spyOn(topAlertService, 'error')
      resourcesExpectations.AccountApi.getRegistrationStatusByMsisdn.respond(400, {status: 'UNREGISTERED'})
      AccountFormController.getPhoneNumberStatus()
      $httpBackend.flush()
      expect(topAlertService.error).toHaveBeenCalled()
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
      resourcesExpectations.RatelApi.getRatelAuthConfig.respond(200, {})
      resourcesExpectations.ServiceApi.getProfileServices.respond(200, [])
      resourcesExpectations.SessionApi.login.respond(200, {})
      spyOn(communicatorService, 'authenticate')
      AccountFormController.current = 2
      AccountFormController.login()
      $httpBackend.flush()
      expect(communicatorService.authenticate).toHaveBeenCalled()
      expect($state.go).toHaveBeenCalledWith('app.dashboard.client.favourites')
    })

    it('should display error', () => {
      resourcesExpectations.SessionApi.login.respond(400, {})
      AccountFormController.current = 2
      AccountFormController.login()
      $httpBackend.flush()
      expect(AccountFormController.serverError).toBe(true)
    })

  })
})