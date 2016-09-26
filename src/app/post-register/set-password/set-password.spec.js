describe('Unit tests: profitelo.controller.post-register.set-password>', () => {
  describe('Testing Controller: SetPasswordController', () => {

    let scope
    let SetPasswordController
    let _proTopWaitingLoaderService
    let _passwordStrengthService
    let _AccountApi
    let _proTopAlertService
    let _$httpBackend

    let _url = 'awesomeUrl'

    let resourcesExpectations

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

    beforeEach(module(($provide) => {
      $provide.value('apiUrl', _url)
    }))

    beforeEach(() => {
      module('profitelo.controller.post-register.set-password')
      module('profitelo.swaggerResources.definitions')
      inject(($rootScope, $controller, $filter, _proTopWaitingLoaderService_, _passwordStrengthService_, _AccountApi_,
              _proTopAlertService_, _$httpBackend_, _AccountApiDef_) => {

        scope = $rootScope.$new()

        SetPasswordController = $controller('SetPasswordController', {
          $filter: $filter,
          $rootScope: $rootScope,
          $state: $state,
          proTopWaitingLoaderService: _proTopWaitingLoaderService_,
          passwordStrengthService: _passwordStrengthService_,
          User: _User,
          proTopAlertService: _proTopAlertService_,
          AccountApi: _AccountApi_
        })

        _$httpBackend  = _$httpBackend_
        _proTopWaitingLoaderService = _proTopWaitingLoaderService_
        _passwordStrengthService = _passwordStrengthService_
        _AccountApi = _AccountApi_
        _proTopAlertService = _proTopAlertService_


        resourcesExpectations = {
          AccountApi: {
            partialUpdateAccount: _$httpBackend.when(_AccountApiDef_.partialUpdateAccount.method,
              _url + '/accounts/' + _User.getData())
          }
        }

      })
    })

    it('should exsist', ()=> {
      expect(!!SetPasswordController).toBe(true)
    })

    it('should mesure password strength', () => {

      let strongPassword
      let weakPassword
      let mediumPassword
      let badPassword

      SetPasswordController.onPasswordChange('123')
      badPassword = SetPasswordController.passwordStrength

      SetPasswordController.onPasswordChange('123fsdfs')
      weakPassword = SetPasswordController.passwordStrength

      SetPasswordController.onPasswordChange('123fsdfs,')
      mediumPassword= SetPasswordController.passwordStrength

      SetPasswordController.onPasswordChange(';12;3gjsa08ian1ejfns,np')
      strongPassword = SetPasswordController.passwordStrength


      expect(badPassword).toEqual(1)
      expect(weakPassword).toEqual(2)
      expect(mediumPassword).toEqual(3)
      expect(strongPassword).toEqual(4)
    })


    it('should set new password on completeRegistration', () => {
      spyOn(_proTopAlertService, 'success')

      resourcesExpectations.AccountApi.partialUpdateAccount.respond(200)
      SetPasswordController.completeRegistration()
      _$httpBackend.flush()
    })
  })
})
