import {ILoginRegisterService} from './login-register.service'
import * as angular from 'angular'

describe('Unit testing: profitelo.resolvers.login-register', () => {
  describe('for LoginRegisterResolver service >', () => {

    let AppLoginRegisterResolver: ILoginRegisterService
    let url = 'awesomeURL'
    let _timeout: ng.ITimeoutService
    let mockState: any

    beforeEach(angular.mock.module(function ($provide: ng.auto.IProvideService) {
      $provide.value('apiUrl', url)
    }))

    beforeEach(() => {

      mockState = {
        go: () => {
        }
      }


      angular.mock.module('profitelo.resolvers.login-register', function ($provide: ng.auto.IProvideService) {
        $provide.value('$state', mockState)
      })

      inject(($injector: ng.auto.IInjectorService) => {
        AppLoginRegisterResolver = $injector.get<ILoginRegisterService>('LoginRegisterResolver')
        _timeout = $injector.get('$timeout')
      })
    })


    it('should have resolve function', () => {
      expect(AppLoginRegisterResolver.resolve).toBeDefined()
    })

    it('should handle empty phone number', () => {

      spyOn(mockState, 'go')

      let spy = {
        spy: () => {
        }
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
