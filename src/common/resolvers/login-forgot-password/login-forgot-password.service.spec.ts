describe('Unit testing: profitelo.resolvers.login-forgot-password', () => {
  describe('for LoginForgotPasswordResolver service >', () => {

    let AppLoginForgotPasswordResolverService
    let url = 'awesomeURL'
    let _timeout
    let mockState

    beforeEach(angular.mock.module(function($provide) {
      $provide.value('apiUrl', url)
    }))

    beforeEach(() => {

      mockState = {
        go: () => {}
      }
      
    angular.mock.module('profitelo.resolvers.login-forgot-password', function($provide) {
        $provide.value('$state',  mockState)
      })

      inject(($injector) => {
        AppLoginForgotPasswordResolverService = $injector.get('LoginForgotPasswordResolver')
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

      AppLoginForgotPasswordResolverService.resolve().then(
      () => {

      }, () => {
        spy.spy()
      })
      
      _timeout.flush()
      expect(spy.spy).toHaveBeenCalled()
      expect(mockState.go).toHaveBeenCalledWith('app.login.account')

    })


  })
})