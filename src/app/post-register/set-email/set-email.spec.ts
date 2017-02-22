namespace profitelo.postRegister.setEmail {

  import ITopWaitingLoaderService = profitelo.services.topWaitingLoader.ITopWaitingLoaderService
  import ITopAlertService = profitelo.services.topAlert.ITopAlertService
  import IFilterService = profitelo.services.filter.IFilterService
  import IAccountApi = profitelo.api.IAccountApi
  import IAccountApiMock = profitelo.api.IAccountApiMock

  describe('Unit tests: profitelo.controller.post-register.set-email>', () => {
    describe('Testing Controller: SetEmailController', () => {

      let scope: any
      let SetEmailController: any
      let _topWaitingLoaderService: ITopWaitingLoaderService
      let _AccountApi: IAccountApi
      let _topAlertService: ITopAlertService
      let _AccountApiMock: IAccountApiMock
      let _$httpBackend: ng.IHttpBackendService

      const _url = 'awesomeUrl'

      const _User = {
        getData: () => {
          return 1
        },
        setData: () => {
        },
        setApiKeyHeader: () => {
        }
      }

      const $state = {
        go: () => {
        }
      }

      beforeEach(angular.mock.module(function ($provide: ng.auto.IProvideService) {
        $provide.value('apiUrl', _url)
      }))

      beforeEach(() => {
        angular.mock.module('profitelo.controller.post-register.set-email')
        inject(($rootScope: IRootScopeService, $controller: ng.IControllerService, $filter: IFilterService,
                _topWaitingLoaderService_: ITopWaitingLoaderService, _AccountApi_: IAccountApi, _topAlertService_: ITopAlertService,
                _$httpBackend_: ng.IHttpBackendService, AccountApiMock: IAccountApiMock) => {

          scope = $rootScope.$new()

          SetEmailController = $controller('SetEmailController', {
            $filter: $filter,
            $state: $state,
            topWaitingLoaderService: _topWaitingLoaderService_,
            User: _User,
            topAlertService: _topAlertService_,
            AccountApi: _AccountApi_
          })

          _AccountApiMock = AccountApiMock
          _$httpBackend = _$httpBackend_
          _topWaitingLoaderService = _topWaitingLoaderService_
          _AccountApi = _AccountApi_
          _topAlertService = _topAlertService_
        })
      })

      it('should exsist', () => {
        expect(!!SetEmailController).toBe(true)
      })

      it('should set new email', () => {
        spyOn($state, 'go')
        //FIXME
        _AccountApiMock.partialUpdateAccountRoute(200, String(_User.getData()), <any>{})
        _AccountApiMock.getAccountEmailExistsRoute(400, 'email')
        SetEmailController.setNewEmail()
        _$httpBackend.flush()

        expect($state.go).toHaveBeenCalledWith('app.dashboard.client.favourites')
      })

      it('should handle bad requesnt while setting new email', () => {
        spyOn(_topAlertService, 'error')
        _AccountApiMock.partialUpdateAccountRoute(500, String(_User.getData()))
        _AccountApiMock.getAccountEmailExistsRoute(400, 'email')
        SetEmailController.setNewEmail()
        _$httpBackend.flush()

        expect(_topAlertService.error).toHaveBeenCalledWith({message: 'INTERFACE.API_ERROR', timeout: 4})
      })
    })
  })
}
