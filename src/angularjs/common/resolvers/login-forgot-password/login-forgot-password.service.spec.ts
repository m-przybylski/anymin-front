import * as angular from 'angular'
import {ILoginForgotPasswordService} from './login-forgot-password.service'
import {IForgotPasswordStateParams} from '../../../app/login/forgot-password/forgot-password'
describe('Unit testing: profitelo.resolvers.login-forgot-password', () => {
  describe('for LoginForgotPasswordResolver service >', () => {

    let AppLoginForgotPasswordResolverService: ILoginForgotPasswordService
    const url = 'awesomeURL'
    let _timeout: ng.ITimeoutService
    let mockState: any

    beforeEach(angular.mock.module(function ($provide: ng.auto.IProvideService): void {
      $provide.value('apiUrl', url)
    }))

    beforeEach(() => {

      mockState = {
        go: (): void => {
        }
      }

      angular.mock.module('profitelo.resolvers.login-forgot-password', function ($provide: ng.auto.IProvideService): void {
        $provide.value('$state', mockState)
        $provide.value('normalizeTranslationKeyFilter', (x: string) => x)
      })

      inject(($injector: ng.auto.IInjectorService) => {
        AppLoginForgotPasswordResolverService = $injector.get<ILoginForgotPasswordService>('LoginForgotPasswordResolver')
        _timeout = $injector.get('$timeout')
      })
    })

    it('should have resolve function', () => {
      expect(AppLoginForgotPasswordResolverService.resolve).toBeDefined()
    })

    it('should handle empty phone number', () => {

      spyOn(mockState, 'go')

      const spy = {
        spy: (): void => {
        }
      }

      spyOn(spy, 'spy')

      const params: IForgotPasswordStateParams = {
        method: 'sms'
      }

      AppLoginForgotPasswordResolverService.resolve(params).then(
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
