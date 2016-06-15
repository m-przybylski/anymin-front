describe('Unit testing: profitelo.services.resolvers.app.login.confirm-email', () => {
  describe('for AppLoginConfirmEmailResolverService service >', () => {

    let AppLoginConfirmEmailResolverService
    let url = 'awesomeURL'
    let _timeout
    let mockState
    let resourcesExpectations
    let _AccountApiDef
    let _SessionApiDef
    let $httpBackend
    let emailToken = ':token'

    beforeEach(module(function($provide) {
      $provide.value('apiUrl', url)
    }))

    beforeEach(() => {

      mockState = {
        go: () => {}
      }

      module('profitelo.swaggerResources.definitions')
      module('profitelo.services.resolvers.app.login.confirm-email', function($provide) {
        $provide.value('$state',  mockState)
      })

      inject(($injector) => {
        AppLoginConfirmEmailResolverService = $injector.get('AppLoginConfirmEmailResolverService')
        _timeout = $injector.get('$timeout')
        _AccountApiDef = $injector.get('AccountApiDef')
        _SessionApiDef = $injector.get('SessionApiDef')
        $httpBackend = $injector.get('$httpBackend')

      })

      resourcesExpectations = {
        AccountApi: {
          postAccountVerifyEmail: $httpBackend.when(_AccountApiDef.postAccountVerifyEmail.method, _AccountApiDef.postAccountVerifyEmail.url)
        },
        SessionApi: {
          check: $httpBackend.when(_SessionApiDef.check.method, _SessionApiDef.check.url)
        }
      }


    })

    it('should have resolve function', () => {
      expect(AppLoginConfirmEmailResolverService.resolve).toBeDefined()
    })


    it('should handle empty token', () => {

      spyOn(mockState, 'go')

      let spy = {
        spy: () => {}
      }

      spyOn(spy, 'spy')

      let stateParams = {
        token: ''
      }

      AppLoginConfirmEmailResolverService.resolve(stateParams).then(
      () => {

      }, () => {
        spy.spy()
      })

      _timeout.flush()
      expect(spy.spy).toHaveBeenCalled()
      expect(mockState.go).toHaveBeenCalledWith('app.login.account')

    })

    it('should handle good token', () => {

      resourcesExpectations.AccountApi.postAccountVerifyEmail.respond(200, {apiKey: '123'})
      resourcesExpectations.SessionApi.check.respond(200, {})

      spyOn(mockState, 'go')

      let spy = {
        spy: () => {}
      }

      spyOn(spy, 'spy')

      let stateParams = {
        token: emailToken
      }

      AppLoginConfirmEmailResolverService.resolve(stateParams).then(
        () => {
          spy.spy()
        }, () => {

        })

      $httpBackend.flush()
      _timeout.flush()
      expect(spy.spy).toHaveBeenCalled()

    })


  })
})