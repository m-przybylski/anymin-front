describe('Unit tests: profitelo.controller.login.forgot-password >', () => {
  describe('Testing Controller: ForgotPasswordController', () => {

    let scope
    let ForgotPasswordController
    let resourcesExpectations
    let httpBackend
    let RecoverPasswordApiDef
    const _url = 'awesomeUrl'

    let account = {
      accountObject: {
        phoneNumber: {
          prefix: '+45',
          number: '456543123'
        },
        password: ''
      },
      sessionId: '123fsdf'
    }

    const $state = {
      go: _ => _
    }

    beforeEach(angular.mock.module(($provide) => {
      $provide.value('apiUrl', _url)
    }))

    beforeEach(() => {
    angular.mock.module('profitelo.controller.login.forgot-password')
    angular.mock.module('profitelo.swaggerResources.definitions')
    angular.mock.module('profitelo.services.pro-top-waiting-loader-service')
      inject(($rootScope, $controller, _proTopWaitingLoaderService_, _$httpBackend_, _RecoverPasswordApiDef_) => {
        scope = $rootScope.$new()
        httpBackend = _$httpBackend_
        RecoverPasswordApiDef = _RecoverPasswordApiDef_
        ForgotPasswordController = $controller('ForgotPasswordController', {
          $state: $state,
          account: account,
          proTopWaitingLoaderService: _proTopWaitingLoaderService_
        })
        
        resourcesExpectations = {
          RecoverPasswordApi: {
            postRecoverPasswordVerifyMsisdn: 
              httpBackend.when(RecoverPasswordApiDef.postRecoverPasswordVerifyMsisdn.method, 
              RecoverPasswordApiDef.postRecoverPasswordVerifyMsisdn.url)
          }
        }
      })
    })

    it('should exsist', ()=> {
      expect(!!ForgotPasswordController).toBe(true)
    })

    it('should redirect to app-login.set-new-password', ()=> {
      spyOn($state, 'go')
      resourcesExpectations.RecoverPasswordApi.postRecoverPasswordVerifyMsisdn.respond(200)
      ForgotPasswordController.submitSmsVerificationCode()
      httpBackend.flush()
      expect($state.go).toHaveBeenCalledWith( 'app.login.set-new-password', Object({ token: 'undefined', method: 'sms' }) )
    })

    it('should display error on server error', ()=> {
      resourcesExpectations.RecoverPasswordApi.postRecoverPasswordVerifyMsisdn.respond(500)
      ForgotPasswordController.submitSmsVerificationCode()
      httpBackend.flush()
      expect(ForgotPasswordController.serverError).toBe(true)
    })

    it('should redirect to app.login.forgot-password', ()=> {
      spyOn($state, 'go')
      ForgotPasswordController.forceSmsRecovery()
      expect($state.go).toHaveBeenCalledWith(  'app.login.forgot-password', Object({ method: 'sms' }), Object({ reload: true })  )
    })

  })
})
