describe('Unit tests: profitelo.controller.post-register.set-email>', () => {
  describe('Testing Controller: SetEmailController', () => {

    let scope
    let SetEmailController
    let _topWaitingLoaderService
    let _AccountApi
    let _topAlertService
    let _$httpBackend
    let resourcesExpectations

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

    beforeEach(angular.mock.module(function($provide) {
      $provide.value('apiUrl', _url)
    }))

    beforeEach(() => {
    angular.mock.module('profitelo.controller.post-register.set-email')
    angular.mock.module('profitelo.swaggerResources.definitions')
      inject(($rootScope, $controller, $filter, _topWaitingLoaderService_, _AccountApi_, _topAlertService_,
              _$httpBackend_, _AccountApiDef_) => {

        scope = $rootScope.$new()

        SetEmailController = $controller('SetEmailController', {
          $filter: $filter,
          $state: $state,
          topWaitingLoaderService: _topWaitingLoaderService_,
          User: _User,
          topAlertService: _topAlertService_,
          AccountApi: _AccountApi_
        })

        _$httpBackend  = _$httpBackend_
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

    it('should exsist', ()=> {
      expect(!!SetEmailController).toBe(true)
    })

    it('should set new email', () => {
      spyOn($state, 'go')
      resourcesExpectations.AccountApi.partialUpdateAccount.respond(200)
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

      expect(_topAlertService.error).toHaveBeenCalledWith({ message: 'INTERFACE.API_ERROR', timeout: 4 })
    })
  })
})
