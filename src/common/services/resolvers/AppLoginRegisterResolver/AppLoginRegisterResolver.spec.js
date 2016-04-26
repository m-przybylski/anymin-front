describe('Unit testing: profitelo.services.resolvers.app.login.register', () => {
  describe('for AppLoginRegisterResolver service >', () => {

    let AppLoginRegisterResolver
    let url = 'awesomeURL'

    beforeEach(module(function($provide) {
      $provide.value('apiUrl', url)
    }))

    beforeEach(() => {
      module('profitelo.services.resolvers.app.login.register')

      inject(($injector) => {
        AppLoginRegisterResolver = $injector.get('AppLoginRegisterResolver')
      })
    })

    it('should have resolve function', () => {
      expect(AppLoginRegisterResolver.resolve).toBeDefined()
    })


  })
})