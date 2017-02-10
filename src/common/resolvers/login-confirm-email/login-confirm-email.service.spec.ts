namespace profitelo.resolvers.loginConfirmEmail {
describe('Unit testing: profitelo.resolvers.login-confirm-email', () => {
  describe('for LoginConfirmEmailResolver service >', () => {

    let AppLoginConfirmEmailResolverService: ILoginConfirmEmailService
    let url = 'awesomeURL'
    let _timeout: ng.ITimeoutService
    let mockState: any
    let resourcesExpectations: any
    let _AccountApiDef: any
    let _SessionApiDef: any
    let httpBackend: ng.IHttpBackendService
    let emailToken = ':token'

    beforeEach(angular.mock.module(function($provide: ng.auto.IProvideService) {
      $provide.value('apiUrl', url)
    }))

    beforeEach(() => {

      mockState = {
        go: () => {}
      }

    angular.mock.module('profitelo.swaggerResources.definitions')
    angular.mock.module('profitelo.resolvers.login-confirm-email', function($provide: ng.auto.IProvideService) {
        $provide.value('$state',  mockState)
      })

      inject(($injector: ng.auto.IInjectorService) => {
        AppLoginConfirmEmailResolverService = $injector.get<ILoginConfirmEmailService>('LoginConfirmEmailResolver')
        _timeout = $injector.get('$timeout')
        _AccountApiDef = $injector.get('AccountApiDef')
        _SessionApiDef = $injector.get('SessionApiDef')
        httpBackend = $injector.get('$httpBackend')
      })

      resourcesExpectations = {
        AccountApi: {
          postAccountVerifyEmail: httpBackend.when(_AccountApiDef.postAccountVerifyEmail.method, _AccountApiDef.postAccountVerifyEmail.url)
        },
        SessionApi: {
          check: httpBackend.when(_SessionApiDef.check.method, _SessionApiDef.check.url)
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

      httpBackend.flush()
      _timeout.flush()
      expect(spy.spy).toHaveBeenCalled()

    })


  })
})}
