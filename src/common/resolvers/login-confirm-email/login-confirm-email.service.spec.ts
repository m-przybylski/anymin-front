namespace profitelo.resolvers.loginConfirmEmail {
  import ISessionApiMock = profitelo.api.ISessionApiMock
  import IAccountApiMock = profitelo.api.IAccountApiMock
  import GetSession = profitelo.api.GetSession
  describe('Unit testing: profitelo.resolvers.login-confirm-email', () => {
    describe('for LoginConfirmEmailResolver service >', () => {

      let AppLoginConfirmEmailResolverService: ILoginConfirmEmailService
      let url = 'awesomeURL'
      let _timeout: ng.ITimeoutService
      const mockState = {
        go: () => {
        }
      }
      let _AccountApiMock: IAccountApiMock
      let _SessionApiMock: ISessionApiMock
      let httpBackend: ng.IHttpBackendService
      let emailToken = ':token'

      beforeEach(angular.mock.module(function ($provide: ng.auto.IProvideService) {
        $provide.value('apiUrl', url)
      }))

      beforeEach(() => {
        angular.mock.module('profitelo.resolvers.login-confirm-email', function ($provide: ng.auto.IProvideService) {
          $provide.value('$state', mockState)
        })

        inject(($injector: ng.auto.IInjectorService) => {
          AppLoginConfirmEmailResolverService = $injector.get<ILoginConfirmEmailService>('LoginConfirmEmailResolver')
          _timeout = $injector.get('$timeout')
          _AccountApiMock = $injector.get<IAccountApiMock>('AccountApiMock')
          _SessionApiMock = $injector.get<ISessionApiMock>('SessionApiMock')
          httpBackend = $injector.get('$httpBackend')
        })
      })

      it('should have resolve function', () => {
        expect(AppLoginConfirmEmailResolverService.resolve).toBeDefined()
      })


      it('should handle empty token', () => {

        spyOn(mockState, 'go')

        let spy = {
          spy: () => {
          }
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

        //FIXME type
        _AccountApiMock.postAccountVerifyEmailRoute(200, emailToken, <any>{apiKey: '123'})
        _SessionApiMock.checkRoute(200, <GetSession>{})

        spyOn(mockState, 'go')

        let spy = {
          spy: () => {
          }
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
  })
}
