namespace profitelo.resolvers.loginSetNewPassword {
describe('Unit testing: profitelo.resolvers.login-set-new-password', () => {
  describe('for LoginSetNewPasswordResolver service >', () => {

    let AppLoginSetNewPasswordResolver: ILoginSetNewPasswordService
    let url = 'awesomeURL'
    let _timeout: ng.ITimeoutService
    let stateParams: any
    let mockState: any

    beforeEach(angular.mock.module(function($provide: ng.auto.IProvideService) {
      $provide.value('apiUrl', url)
    }))

    beforeEach(() => {

      stateParams = {
        token: ''
      }

      mockState = {
        go: () => {}
      }

    angular.mock.module('profitelo.resolvers.login-set-new-password', function($provide: ng.auto.IProvideService) {
        $provide.value('$state', mockState)
      })

      inject(($injector: ng.auto.IInjectorService) => {
        AppLoginSetNewPasswordResolver = $injector.get<ILoginSetNewPasswordService>('LoginSetNewPasswordResolver')
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
})}
