namespace profitelo.resolvers.loginForgotPassword {

  import IForgotPasswordStateParams = profitelo.login.forgotPassword.IForgotPasswordStateParams
  describe('Unit testing: profitelo.resolvers.login-forgot-password', () => {
  describe('for LoginForgotPasswordResolver service >', () => {

    let AppLoginForgotPasswordResolverService: ILoginForgotPasswordService
    let url = 'awesomeURL'
    let _timeout: ng.ITimeoutService
    let mockState: any

    beforeEach(angular.mock.module(function($provide: ng.auto.IProvideService) {
      $provide.value('apiUrl', url)
    }))

    beforeEach(() => {

      mockState = {
        go: () => {}
      }

    angular.mock.module('profitelo.resolvers.login-forgot-password', function($provide: ng.auto.IProvideService) {
        $provide.value('$state',  mockState)
      })

      inject(($injector: ng.auto.IInjectorService) => {
        AppLoginForgotPasswordResolverService = $injector.get<ILoginForgotPasswordService>('LoginForgotPasswordResolver')
        _timeout = $injector.get('$timeout')
      })
    })

    it('should have resolve function', () => {
      expect(AppLoginForgotPasswordResolverService.resolve).toBeDefined()
    })


    it('should handle empty phone number', () => {

      spyOn(mockState, 'go')

      let spy = {
        spy: () => {}
      }

      spyOn(spy, 'spy')

      const params: IForgotPasswordStateParams = {
        method: 'sms'
      }

      AppLoginForgotPasswordResolverService.resolve(params).then(
      () => {

      }, () => {
        spy.spy()
      })

      _timeout.flush()
      expect(spy.spy).toHaveBeenCalled()
      expect(mockState.go).toHaveBeenCalledWith('app.login.account')

    })


  })
})}
