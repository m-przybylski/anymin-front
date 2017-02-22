namespace profitelo.postRegister.setEmail {

  import ITopWaitingLoaderService = profitelo.services.topWaitingLoader.ITopWaitingLoaderService
  import ITopAlertService = profitelo.services.topAlert.ITopAlertService
  import IFilterService = profitelo.services.filter.IFilterService
  import IAccountApi = profitelo.api.IAccountApi

  describe('Unit tests: profitelo.controller.post-register.set-email>', () => {
    describe('Testing Controller: SetEmailController', () => {

      let scope: any
      let SetEmailController: any
      let _topWaitingLoaderService: ITopWaitingLoaderService
      let _AccountApi: IAccountApi
      let _topAlertService: ITopAlertService
      let _$httpBackend: ng.IHttpBackendService
      let resourcesExpectations: any

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
        angular.mock.module('profitelo.swaggerResources.definitions')
        inject(($rootScope: IRootScopeService, $controller: ng.IControllerService, $filter: IFilterService,
                _topWaitingLoaderService_: ITopWaitingLoaderService, _AccountApi_: IAccountApi, _topAlertService_: ITopAlertService,
                _$httpBackend_: ng.IHttpBackendService, _AccountApiDef_: any) => {

          scope = $rootScope.$new()

          SetEmailController = $controller('SetEmailController', {
            $filter: $filter,
            $state: $state,
            topWaitingLoaderService: _topWaitingLoaderService_,
            User: _User,
            topAlertService: _topAlertService_,
            AccountApi: _AccountApi_
          })

          _$httpBackend = _$httpBackend_
          _topWaitingLoaderService = _topWaitingLoaderService_
          _AccountApi = _AccountApi_
          _topAlertService = _topAlertService_


          resourcesExpectations = {
            AccountApi: {
              partialUpdateAccount: _$httpBackend.when(_AccountApiDef_.partialUpdateAccount.method,
                _url + '/accounts/' + _User.getData()),
              getAccountEmailExists: _$httpBackend.when(_AccountApiDef_.getAccountEmailExists.method,
                _url + '/accounts/exists/email')
            }
          }
        })
      })

      it('should exsist', () => {
        expect(!!SetEmailController).toBe(true)
      })

      it('should set new email', () => {
        spyOn($state, 'go')
        resourcesExpectations.AccountApi.partialUpdateAccount.respond(200, {})
        resourcesExpectations.AccountApi.getAccountEmailExists.respond(400)
        SetEmailController.setNewEmail()
        _$httpBackend.flush()

        expect($state.go).toHaveBeenCalledWith('app.dashboard.client.favourites')
      })

      it('should handle bad requesnt while setting new email', () => {
        spyOn(_topAlertService, 'error')
        resourcesExpectations.AccountApi.partialUpdateAccount.respond(500)
        resourcesExpectations.AccountApi.getAccountEmailExists.respond(400)
        SetEmailController.setNewEmail()
        _$httpBackend.flush()

        expect(_topAlertService.error).toHaveBeenCalledWith({message: 'INTERFACE.API_ERROR', timeout: 4})
      })
    })
  })
}
