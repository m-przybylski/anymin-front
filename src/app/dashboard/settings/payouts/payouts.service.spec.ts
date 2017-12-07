import * as angular from 'angular'
import {PayoutsApiMock, PayoutsApi} from 'profitelo-api-ng/api/api'
import {PayoutsService} from './payouts.service'
import dashboardSettingsPayoutsModule from './payouts'
import {httpCodes} from '../../../../common/classes/http-codes'

describe('Unit testing: profitelo.dashboard.settings.payouts', () => {
  describe('for PayoutsSettingsResolver service >', () => {

    let payoutsService: PayoutsService
    let $httpBackend: ng.IHttpBackendService
    let log: ng.ILogService
    let PayoutsApi: PayoutsApi
    let PayoutsApiMock: PayoutsApiMock
    let q: ng.IQService

    beforeEach(angular.mock.module(function ($provide: ng.auto.IProvideService): void {
      $provide.value('apiUrl', 'awesomeUrl')
      $provide.value('PayoutsApiMock', PayoutsApiMock)
      $provide.value('PayoutsApi', PayoutsApi)
    }))

    beforeEach(() => {
      angular.mock.module(dashboardSettingsPayoutsModule)

      inject(($injector: ng.auto.IInjectorService, _PayoutsApiMock_: PayoutsApiMock,
              _PayoutsApi_: PayoutsApi, $q: ng.IQService) => {
        payoutsService = $injector.get<PayoutsService>('payoutsService')
        $httpBackend = $injector.get('$httpBackend')
        log = $injector.get('$log')
        q = $q
        PayoutsApiMock = _PayoutsApiMock_
        PayoutsApi = _PayoutsApi_
      })
    })

    it('should get payout methods', (done) => {
      const mockPayoutsMethod = {
        payPalAccount: {
          email: 'mockEmail@com.pl'
        }
      }
      PayoutsApiMock.getPayoutMethodsRoute(httpCodes.ok, mockPayoutsMethod)
      payoutsService.getPayoutMethods().then((response) => {
        expect(response).toEqual(mockPayoutsMethod)
        done()
      })
      $httpBackend.flush()
    })

    it('should put payout methods', (done) => {
      const mockPayoutsMethod = {}
      PayoutsApiMock.putPayoutMethodRoute(httpCodes.ok, mockPayoutsMethod)
      payoutsService.putPayoutMethod().then((response) => {
        expect(response).toEqual(mockPayoutsMethod)
        done()
      })
      $httpBackend.flush()
    })

  })
})
