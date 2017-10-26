import * as angular from 'angular'
import {ILoginConfirmEmailService} from './login-confirm-email.service'
import {AccountApiMock, SessionApiMock} from 'profitelo-api-ng/api/api'
import {GetSession} from 'profitelo-api-ng/model/models'
import sessionModule from '../../services/session/session'

describe('Unit testing: profitelo.resolvers.login-confirm-email', () => {
  describe('for LoginConfirmEmailResolver service >', () => {

    let AppLoginConfirmEmailResolverService: ILoginConfirmEmailService
    const url = 'awesomeURL'
    let _timeout: ng.ITimeoutService
    const mockState = {
      go: (): void => {
      }
    }
    let _AccountApiMock: AccountApiMock
    let _SessionApiMock: SessionApiMock
    let httpBackend: ng.IHttpBackendService
    const emailToken = ':token'

    const sessionService = {
      setApiKey: (): void => {
      },
      getSession: (): void => {
      }
    }

    beforeEach(() => {
      angular.mock.module(sessionModule)
    })

    beforeEach(angular.mock.module(function ($provide: ng.auto.IProvideService): void {
      $provide.value('apiUrl', url)
      $provide.value('sessionService', sessionService)
    }))

    beforeEach(() => {
      angular.mock.module('profitelo.resolvers.login-confirm-email', function ($provide: ng.auto.IProvideService): void {
        $provide.value('$state', mockState)
        $provide.value('normalizeTranslationKeyFilter', (x: string) => x)
      })

      inject(($injector: ng.auto.IInjectorService, $q: ng.IQService) => {
        spyOn(sessionService, 'getSession').and.callFake(() => $q.resolve({}))
        AppLoginConfirmEmailResolverService = $injector.get<ILoginConfirmEmailService>('LoginConfirmEmailResolver')
        _timeout = $injector.get('$timeout')
        _AccountApiMock = $injector.get<AccountApiMock>('AccountApiMock')
        _SessionApiMock = $injector.get<SessionApiMock>('SessionApiMock')
        httpBackend = $injector.get('$httpBackend')
      })
    })

    it('should have resolve function', () => {
      expect(AppLoginConfirmEmailResolverService.resolve).toBeDefined()
    })

    it('should handle empty token', () => {

      spyOn(mockState, 'go')

      const spy = {
        spy: (): void => {
        }
      }

      spyOn(spy, 'spy')

      const stateParams = {
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

      // FIXME type
      _AccountApiMock.postAccountVerifyEmailRoute(200, emailToken, <any>{apiKey: '123'})

      _SessionApiMock.checkRoute(200, <GetSession>{})

      spyOn(mockState, 'go')

      const spy = {
        spy: (): void => {
        }
      }

      spyOn(spy, 'spy')

      const stateParams = {
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
