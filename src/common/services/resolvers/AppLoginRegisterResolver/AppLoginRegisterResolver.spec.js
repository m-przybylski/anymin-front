describe('Unit testing: profitelo.services.resolvers.app.login.register', () => {
  describe('for AppLoginRegisterResolver service >', () => {

    let AppLoginRegisterResolver
    let url = 'awesomeURL'
    let _timeout
    let mockState

    beforeEach(module(function($provide) {
      $provide.value('apiUrl', url)
    }))

    beforeEach(() => {

      mockState = {
        go: () => {}
      }


      module('profitelo.services.resolvers.app.login.register', function($provide) {
        $provide.value('$state', mockState)
      })

      inject(($injector) => {
        AppLoginRegisterResolver = $injector.get('AppLoginRegisterResolver')
        _timeout = $injector.get('$timeout')
      })
    })


    it('should have resolve function', () => {
      expect(AppLoginRegisterResolver.resolve).toBeDefined()
    })

    it('should handle empty phone number', () => {

      spyOn(mockState, 'go')

      let spy = {
        spy: () => {}
      }

      spyOn(spy, 'spy')

      AppLoginRegisterResolver.resolve().then(
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