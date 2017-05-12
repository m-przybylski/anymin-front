import * as angular from 'angular'
import {PayoutsApiMock, PayoutsApi} from 'profitelo-api-ng/api/api'
import {PayoutsSettingsResolver} from './payouts.resolver'
import dashboardSettingsPayoutsModule from './payouts'

describe('Unit testing: profitelo.resolvers.payouts', () => {
  describe('for PayoutsSettingsResolver service >', () => {

    let payoutsSettingsResolver: PayoutsSettingsResolver
    let $httpBackend: ng.IHttpBackendService
    let log: ng.ILogService
    let PayoutsApi: PayoutsApi
    let PayoutsApiMock: PayoutsApiMock
    let q: ng.IQService

    beforeEach(angular.mock.module(function ($provide: ng.auto.IProvideService) {
      $provide.value('apiUrl', 'awesomeUrl')
      $provide.value('PayoutsApiMock', PayoutsApiMock)
      $provide.value('PayoutsApi', PayoutsApi)
    }))

    beforeEach(() => {
      angular.mock.module(dashboardSettingsPayoutsModule)

      inject(($injector: ng.auto.IInjectorService, _PayoutsApiMock_: PayoutsApiMock,
              _PayoutsApi_: PayoutsApi, $q: ng.IQService) => {
        payoutsSettingsResolver = $injector.get<PayoutsSettingsResolver>('payoutsSettingsResolver')
        $httpBackend = $injector.get('$httpBackend')
        log = $injector.get('$log')
        q = $q
        PayoutsApiMock = _PayoutsApiMock_
        PayoutsApi = _PayoutsApi_
      })
    })

    it('should have resolve function', () => {
      expect(payoutsSettingsResolver.resolve).toBeDefined()
    })

    it('should resolve payouts', () => {
      const mockPayoutsMethod = {
        payPalAccount: {
          email: 'mockEmail',
          isDefault: true
        }
      }
      PayoutsApiMock.getPayoutMethodsRoute(200, mockPayoutsMethod)
      payoutsSettingsResolver.resolve().then((response) => {
        expect(response).toEqual(mockPayoutsMethod)
      })
      $httpBackend.flush()
    })

    it('should log error', () => {
      spyOn(log, 'error')
      PayoutsApiMock.getPayoutMethodsRoute(500)
      payoutsSettingsResolver.resolve()
      $httpBackend.flush()
      expect(log.error).toHaveBeenCalled()
    })

    it('should return empty array', () => {
      spyOn(log, 'error')
      PayoutsApiMock.getPayoutMethodsRoute(404)
      payoutsSettingsResolver.resolve().then((response) => {
        expect(response).toEqual({})
      })
      $httpBackend.flush()
    })

  })
})
