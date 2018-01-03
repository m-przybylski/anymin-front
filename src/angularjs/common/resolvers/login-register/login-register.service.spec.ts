import {ILoginRegisterService} from './login-register.service'
import * as angular from 'angular'
import {LoginStateService} from "../../services/login-state/login-state.service"

describe('Unit testing: profitelo.resolvers.login-register', () => {
  describe('for LoginRegisterResolver service >', () => {

    const url = 'awesomeURL'
    let AppLoginRegisterResolver: ILoginRegisterService
    let _timeout: ng.ITimeoutService
    let mockState: any
    let $log: ng.ILogService
    let loginStateService: LoginStateService
    beforeEach(() => {
      angular.mock.module('profitelo.resolvers.login-register')
    })

    beforeEach(angular.mock.module(function ($provide: ng.auto.IProvideService): void {
      $provide.value('apiUrl', url)
      $provide.value('$state', mockState)
      $provide.value('normalizeTranslationKeyFilter', (x: string) => x)
    }))

    beforeEach(() => {

      mockState = {
        go: (): void => {
        }
      }

      inject(($injector: ng.auto.IInjectorService) => {
        AppLoginRegisterResolver = $injector.get<ILoginRegisterService>('LoginRegisterResolver')
        _timeout = $injector.get('$timeout')
        $log = $injector.get('$log')
        loginStateService = $injector.get<LoginStateService>('LoginRegisterResolver')
      })
    })

    it('should have resolve function', () => {
      expect(AppLoginRegisterResolver.resolve).toBeDefined()
    })

    it('should handle empty phone number', () => {
      spyOn(mockState, 'go')

      AppLoginRegisterResolver.resolve()

      _timeout.flush()
      expect(mockState.go).toHaveBeenCalledWith('app.login.account')

    })
  })
})
