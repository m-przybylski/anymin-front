describe('Unit testing: profitelo.services.resolvers.app.login.forgot-password', () => {
  describe('for AppLoginForgotPasswordResolverService service >', () => {

    let AppLoginForgotPasswordResolverService
    let url = 'awesomeURL'

    beforeEach(module(function($provide) {
      $provide.value('apiUrl', url)
    }))

    beforeEach(() => {
      module('profitelo.services.resolvers.app.login.forgot-password')

      inject(($injector) => {
        AppLoginForgotPasswordResolverService = $injector.get('AppLoginForgotPasswordResolverService')
      })
    })

    it('should have resolve function', () => {
      expect(AppLoginForgotPasswordResolverService.resolve).toBeDefined()
    })


  })
})