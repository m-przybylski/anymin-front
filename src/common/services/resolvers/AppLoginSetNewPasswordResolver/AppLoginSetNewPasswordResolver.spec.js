describe('Unit testing: profitelo.services.resolvers.app.login.set-new-password', () => {
  describe('for AppLoginSetNewPasswordResolver service >', () => {

    let AppLoginSetNewPasswordResolver
    let url = 'awesomeURL'

    beforeEach(module(function($provide) {
      $provide.value('apiUrl', url)
    }))

    beforeEach(() => {
      module('profitelo.services.resolvers.app.login.set-new-password')

      inject(($injector) => {
        AppLoginSetNewPasswordResolver = $injector.get('AppLoginSetNewPasswordResolver')
      })
    })

    it('should have resolve function', () => {
      expect(AppLoginSetNewPasswordResolver.resolve).toBeDefined()
    })


  })
})