describe('Unit tests: profitelo.controller.login.set-new-password >', () => {
  describe('Testing Controller: SetNewPasswordController', () => {

    let scope
    let SetNewPasswordController
    let passwordStrengthService
    let resourcesExpectations
    let httpBackend
    let RecoverPasswordApiDef
    let proTopAlertService
    let _url = 'awesomeUrl'

    let tokenStatus = {
      method: 'EMAIL',
      accountObject: {
        phoneNumber: {
          prefix: '+45',
          number: '456543123'
        },
        password: 'asas'
      },
      payload: {},
      sessionId: '123fsdf'
    }


    let $state = {
      go: () => {

      }
    }

    beforeEach(angular.mock.module(function($provide) {
      $provide.value('apiUrl', _url)
    }))

    beforeEach(() => {
    angular.mock.module('profitelo.controller.login.set-new-password')
    angular.mock.module('profitelo.swaggerResources.definitions')
    angular.mock.module('profitelo.services.pro-top-alert-service')
        
      inject(($rootScope, $controller, _passwordStrengthService_, _proTopAlertService_, _RecoverPasswordApiDef_, _$httpBackend_) => {
        scope = $rootScope.$new()
        passwordStrengthService = _passwordStrengthService_
        RecoverPasswordApiDef = _RecoverPasswordApiDef_
        httpBackend = _$httpBackend_
        proTopAlertService = _proTopAlertService_
        SetNewPasswordController = $controller('SetNewPasswordController', {
          $state: $state,
          tokenStatus: tokenStatus,
          passwordStrengthService: passwordStrengthService,
          proTopAlertService: proTopAlertService
        })

        resourcesExpectations = {
          RecoverPasswordApi: {
            putRecoverPasswordMsisdn:
              httpBackend.when(RecoverPasswordApiDef.putRecoverPasswordMsisdn.method,
                RecoverPasswordApiDef.putRecoverPasswordMsisdn.url),
            putRecoverPasswordEmail:
              httpBackend.when(RecoverPasswordApiDef.putRecoverPasswordEmail.method,
                RecoverPasswordApiDef.putRecoverPasswordEmail.url)
          }
          
        }
      })


    })

    it('should exsist', ()=> {
      expect(!!SetNewPasswordController).toBe(true)
    })

    it('should check password strength', ()=> {
      let password = 'asas'
      SetNewPasswordController.onPasswordChange(password)
      expect(SetNewPasswordController.passwordStrength).toEqual(passwordStrengthService(password))
    })

    it('should submit password change by email', ()=> {
      spyOn(proTopAlertService, 'success')
      resourcesExpectations.RecoverPasswordApi.putRecoverPasswordEmail.respond(200)
      SetNewPasswordController.newPassword = 'sdfsdfsdfsdf'
      SetNewPasswordController.submitPasswordChange()
      httpBackend.flush()
      expect(proTopAlertService.success).toHaveBeenCalled()
    })

    it('should display error on server error', ()=> {
      spyOn(proTopAlertService, 'error')
      resourcesExpectations.RecoverPasswordApi.putRecoverPasswordEmail.respond(500)
      SetNewPasswordController.newPassword = 'sdfsdfsdfsdf'
      SetNewPasswordController.submitPasswordChange()
      httpBackend.flush()
      expect(proTopAlertService.error).toHaveBeenCalled()
    })

    it('should submit password change by sms', ()=> {
      spyOn(proTopAlertService, 'success')
      tokenStatus.method = 'SMS'
      resourcesExpectations.RecoverPasswordApi.putRecoverPasswordMsisdn.respond(200)
      SetNewPasswordController.submitPasswordChange()
      httpBackend.flush()
      expect(proTopAlertService.success).toHaveBeenCalled()
    })

  })
})
