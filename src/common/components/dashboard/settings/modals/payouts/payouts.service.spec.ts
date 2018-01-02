import * as angular from 'angular'
import {PayoutsApiMock} from 'profitelo-api-ng/api/api'
import {PayoutsModalService} from './payouts.service'
import payoutsModalModule from './payouts'
import {httpCodes} from '../../../../../classes/http-codes'
import {ErrorHandlerService} from '../../../../../services/error-handler/error-handler.service'

describe('Unit testing: profitelo.components.settings.modals.payouts', () => {
  describe('for PayoutsModalService service >', () => {

    let payoutsModalService: PayoutsModalService

    beforeEach(angular.mock.module(function ($provide: ng.auto.IProvideService): void {
      $provide.value('apiUrl', 'awesomeUrl')
    }))

    beforeEach(() => {
      angular.mock.module(payoutsModalModule)

      inject(($injector: ng.auto.IInjectorService) => {
        payoutsModalService = $injector.get<PayoutsModalService>('payoutsModalService')
      })
    })

    it('should put payout methods',
      (done) => inject(($httpBackend: ng.IHttpBackendService, PayoutsApiMock: PayoutsApiMock) => {
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
    }))

    it('should show error when put payout methods fails',
      (done) => inject((errorHandler: ErrorHandlerService, $httpBackend: ng.IHttpBackendService,
                        PayoutsApiMock: PayoutsApiMock) => {
      spyOn(errorHandler, 'handleServerError')
      PayoutsApiMock.putPayoutMethodRoute(httpCodes.badRequest)
      payoutsModalService.putPayoutMethod({}).catch( _error => {
        expect(errorHandler.handleServerError).toHaveBeenCalled()
        done()
      })
      $httpBackend.flush()
    }))

  })
})
