namespace profitelo.login.account {
  import ITopAlertService = profitelo.services.topAlert.ITopAlertService
  import ICommunicatorService = profitelo.services.communicator.ICommunicatorService
  import ITopWaitingLoaderService = profitelo.services.topWaitingLoader.ITopWaitingLoaderService
  import ILoginStateService = profitelo.services.loginState.ILoginStateService
  import IAccountApi = profitelo.api.IAccountApi
  import IRatelApiMock = profitelo.api.IRatelApiMock
  import IServiceApiMock = profitelo.api.IServiceApiMock
  import ISessionApiMock = profitelo.api.ISessionApiMock
  import IAccountApiMock = profitelo.api.IAccountApiMock
  import SignedAgent = profitelo.api.SignedAgent

  describe('Unit tests: profitelo.controller.login.account>', () => {
    describe('Testing Controller: AccountFormController', () => {

      let scope: any,
        AccountFormController: any,
        AccountApi: IAccountApi,
        $httpBackend: ng.IHttpBackendService,
        url = 'awesomeURL',
        _mockParams: any = null,
        _mockState: any = null,
        _RatelApiMock: IRatelApiMock,
        _AccountApiMock: IAccountApiMock,
        _ServiceApiMock: IServiceApiMock,
        _SessionApiMock: ISessionApiMock,
        $state: ng.ui.IStateService,
        topAlertService: ITopAlertService,
        communicatorService: ICommunicatorService

      beforeEach(angular.mock.module(($provide: ng.auto.IProvideService) => {
        $provide.value('apiUrl', url)
      }))

      beforeEach(() => {
        angular.mock.module('profitelo.controller.login.account')
        angular.mock.module('profitelo.services.communicator')
        inject(($rootScope: IRootScopeService, $controller: ng.IControllerService, $injector: ng.auto.IInjectorService,
                _topWaitingLoaderService_: ITopWaitingLoaderService, _User_: any, _topAlertService_: ITopAlertService,
                _loginStateService_: ILoginStateService, _$httpBackend_: ng.IHttpBackendService, AccountApiMock: IAccountApiMock,
                _communicatorService_: ICommunicatorService, RatelApiMock: IRatelApiMock, ServiceApiMock: IServiceApiMock,
                SessionApiMock: ISessionApiMock) => {

          _AccountApiMock = AccountApiMock
          _RatelApiMock = RatelApiMock
          _ServiceApiMock = ServiceApiMock
          _SessionApiMock = SessionApiMock

          $httpBackend = _$httpBackend_
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
          AccountApi = $injector.get<IAccountApi>('AccountApi')
          AccountFormController = $controller('AccountFormController', {
            $rootScope: $rootScope,
            $scope: scope,
            $state: $state,
            AccountApi: AccountApi,
            topWaitingLoaderService: _topWaitingLoaderService_,
            User: _User_,
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
        _AccountApiMock.getRegistrationStatusByMsisdnRoute(200, '321321642', {status: 'REGISTERED'})

        AccountFormController.getPhoneNumberStatus()
        $httpBackend.flush()
        expect(AccountFormController.current).toEqual(2)
      })

      it('should redirect to register ', () => {
        spyOn($state, 'go')
        _AccountApiMock.getRegistrationStatusByMsisdnRoute(200, '321321642', {status: 'UNREGISTERED'})
        AccountFormController.getPhoneNumberStatus()
        $httpBackend.flush()
        expect($state.go).toHaveBeenCalledWith('app.login.register')
      })

      it('should get error response', () => {
        spyOn(topAlertService, 'error')
        _AccountApiMock.getRegistrationStatusByMsisdnRoute(400, '321321642', {status: 'UNREGISTERED'})
        AccountFormController.getPhoneNumberStatus()
        $httpBackend.flush()
        expect(topAlertService.error).toHaveBeenCalled()
      })

      it('should redirect to forgot-password', () => {
        spyOn($state, 'go')
        _AccountApiMock.getRegistrationStatusByMsisdnRoute(200, '321321642', {status: 'NO_PASSWORD'})
        AccountFormController.getPhoneNumberStatus()
        $httpBackend.flush()
        expect($state.go).toHaveBeenCalledWith('app.login.forgot-password')
      })

      it('should login user', () => {
        spyOn($state, 'go')
        //FIXME remove type mappings
        _RatelApiMock.getRatelAuthConfigRoute(200, '321321642', <SignedAgent>{})
        _ServiceApiMock.getProfileServicesRoute(200, '1', [])
        $httpBackend.when('POST', 'http://api.webpage.com/session').respond(200, {})

        spyOn(communicatorService, 'authenticate')
        AccountFormController.current = 2
        AccountFormController.login()
        $httpBackend.flush()
        expect(communicatorService.authenticate).toHaveBeenCalled()
        expect($state.go).toHaveBeenCalledWith('app.dashboard.client.favourites')
      })

      it('should display error', () => {
        $httpBackend.when('POST', 'http://api.webpage.com/session').respond(400, {})

        AccountFormController.current = 2
        AccountFormController.login()
        $httpBackend.flush()
        expect(AccountFormController.serverError).toBe(true)
      })

    })
  })
}
