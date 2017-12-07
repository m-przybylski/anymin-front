import * as angular from 'angular'
import {PayoutsApiMock, PayoutsApi} from 'profitelo-api-ng/api/api'
import {PayoutsModalService} from './payouts.service'
import payoutsModalModule from './payouts'
import {httpCodes} from '../../../../../../../common/classes/http-codes'

describe('Unit testing: profitelo.components.settings.modals.payouts', () => {
  describe('for PayoutsModalService service >', () => {

    let payoutsModalService: PayoutsModalService
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
      angular.mock.module(payoutsModalModule)

      inject(($injector: ng.auto.IInjectorService,
              _PayoutsApiMock_: PayoutsApiMock,
              _PayoutsApi_: PayoutsApi,
              $q: ng.IQService) => {
        payoutsModalService = $injector.get<PayoutsModalService>('payoutsModalService')
        $httpBackend = $injector.get('$httpBackend')
        log = $injector.get('$log')
        q = $q
        PayoutsApiMock = _PayoutsApiMock_
        PayoutsApi = _PayoutsApi_
      })
    })

    it('should put payout methods', (done) => {
      const mockPayoutsMethod = {
        payPalAccount: {
          email: 'mockEmail@com.pl'
        }
      }
      PayoutsApiMock.putPayoutMethodRoute(httpCodes.ok, mockPayoutsMethod)
      payoutsModalService.putPayoutMethod(mockPayoutsMethod).then((response) => {
        expect(response).toEqual(mockPayoutsMethod)
        done()
      })
      $httpBackend.flush()
    })

  })
})
