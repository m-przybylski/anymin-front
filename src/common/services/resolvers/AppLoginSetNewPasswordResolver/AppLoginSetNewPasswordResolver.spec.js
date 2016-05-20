describe('Unit testing: profitelo.services.resolvers.app.login.set-new-password', () => {
  describe('for AppLoginSetNewPasswordResolver service >', () => {

    let AppLoginSetNewPasswordResolver
    let url = 'awesomeURL'
    let _timeout
    let stateParams
    let mockState

    beforeEach(module(function($provide) {
      $provide.value('apiUrl', url)
    }))

    beforeEach(() => {

      stateParams = {
        token: ''
      }

      mockState = {
        go: () => {}
      }

      module('profitelo.services.resolvers.app.login.set-new-password', function($provide) {
        $provide.value('$state', mockState)
      })

      inject(($injector) => {
        AppLoginSetNewPasswordResolver = $injector.get('AppLoginSetNewPasswordResolver')
        _timeout = $injector.get('$timeout')
      })
    })


    it('should have resolve function', () => {
      expect(AppLoginSetNewPasswordResolver.resolve).toBeDefined()
    })

    it('should handle empty token', () => {

      let spy = {
        spy: () => {}
      }

      spyOn(spy, 'spy')

      AppLoginSetNewPasswordResolver.resolve(stateParams).then(() => {
      }, () => {
        spy.spy()
      })

      _timeout.flush()
      expect(spy.spy).toHaveBeenCalled()


    })


  })
})