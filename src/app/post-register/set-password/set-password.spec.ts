namespace profitelo.postRegister.setPassword {
  import IRootScopeService = profitelo.services.rootScope.IRootScopeService
  import ITopAlertService = profitelo.services.topAlert.ITopAlertService
  import IFilterService = profitelo.services.filter.IFilterService
  import ITopWaitingLoaderService = profitelo.services.topWaitingLoader.ITopWaitingLoaderService
  import IPasswordStrengthService = profitelo.services.passwordStrength.IPasswordStrengthService
  import IAccountApi = profitelo.api.IAccountApi
  describe('Unit tests: profitelo.controller.post-register.set-password>', () => {
    describe('Testing Controller: SetPasswordController', () => {

      let scope: any
      let SetPasswordController: any
      let _topWaitingLoaderService
      let _passwordStrengthService
      let _AccountApi
      let _topAlertService: ITopAlertService
      let _$httpBackend: ng.IHttpBackendService

      let _url = 'awesomeUrl'

      let resourcesExpectations: any

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

      beforeEach(angular.mock.module(($provide: ng.auto.IProvideService) => {
        $provide.value('apiUrl', _url)
      }))

      beforeEach(() => {
        angular.mock.module('profitelo.controller.post-register.set-password')
        angular.mock.module('profitelo.swaggerResources.definitions')
        angular.mock.module('profitelo.services.pro-top-waiting-loader-service')
        angular.mock.module('profitelo.services.password-strength')
        inject(($rootScope: IRootScopeService, $controller: ng.IControllerService, $filter: IFilterService,
                _topWaitingLoaderService_: ITopWaitingLoaderService, _passwordStrengthService_: IPasswordStrengthService,
                _AccountApi_: IAccountApi, _topAlertService_: ITopAlertService, _$httpBackend_: ng.IHttpBackendService,
                _AccountApiDef_: any) => {

          scope = $rootScope.$new()

          SetPasswordController = $controller('SetPasswordController', {
            $filter: $filter,
            $rootScope: $rootScope,
            $state: $state,
            topWaitingLoaderService: _topWaitingLoaderService_,
            passwordStrengthService: _passwordStrengthService_,
            User: _User,
            topAlertService: _topAlertService_,
            AccountApi: _AccountApi_
          })

          _$httpBackend = _$httpBackend_
          _topWaitingLoaderService = _topWaitingLoaderService_
          _passwordStrengthService = _passwordStrengthService_
          _AccountApi = _AccountApi_
          _topAlertService = _topAlertService_


          resourcesExpectations = {
            AccountApi: {
              partialUpdateAccount: _$httpBackend.when(_AccountApiDef_.partialUpdateAccount.method,
                _url + '/accounts/' + _User.getData())
            }
          }

        })
      })

      it('should exsist', () => {
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
        mediumPassword = SetPasswordController.passwordStrength

        SetPasswordController.onPasswordChange(';12;3gjsa08ian1ejfns,np')
        strongPassword = SetPasswordController.passwordStrength


        expect(badPassword).toEqual(1)
        expect(weakPassword).toEqual(2)
        expect(mediumPassword).toEqual(3)
        expect(strongPassword).toEqual(4)
      })


      it('should set new password on completeRegistration', () => {
        spyOn(_topAlertService, 'success')

        resourcesExpectations.AccountApi.partialUpdateAccount.respond(200)
        SetPasswordController.completeRegistration()
        _$httpBackend.flush()
      })
    })
  })
}
