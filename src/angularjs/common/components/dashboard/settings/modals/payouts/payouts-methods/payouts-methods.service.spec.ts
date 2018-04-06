import * as angular from 'angular'
import {PayoutsApiMock} from 'profitelo-api-ng/api/api'
import {PayoutsMethodsModalService} from './payouts-methods.service'
import {default as payoutsMethodsModalModule} from './payouts-methods'
import {httpCodes} from '../../../../../../../common/classes/http-codes'
import {ErrorHandlerService} from '../../../../../../services/error-handler/error-handler.service'

describe('Unit testing: profitelo.components.settings.modals.payouts.payouts-methods', () => {
  describe('for PayoutsMethodsModalService service >', () => {

    let payoutsMethodsModalService: PayoutsMethodsModalService

    beforeEach(angular.mock.module(function ($provide: ng.auto.IProvideService): void {
      $provide.value('apiUrl', 'awesomeUrl')
    }))

    beforeEach(() => {
      angular.mock.module(payoutsMethodsModalModule)

      inject(($injector: ng.auto.IInjectorService) => {
        payoutsMethodsModalService = $injector.get<PayoutsMethodsModalService>('payoutsMethodsModalService')
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
        payoutsMethodsModalService.putPayoutMethod(mockPayoutsMethod).then((response) => {
        expect(response).toEqual(mockPayoutsMethod)
        done()
      })
      $httpBackend.flush()
    }))

    it('should show error when put payout methods fails',
      (done) => inject((errorHandler: ErrorHandlerService, $httpBackend: ng.IHttpBackendService,
                        PayoutsApiMock: PayoutsApiMock) => {
      spyOn(errorHandler, 'handleServerError')
      PayoutsApiMock.putPayoutMethodRoute(httpCodes.internalServerError)
        payoutsMethodsModalService.putPayoutMethod({}).catch( _error => {
        expect(errorHandler.handleServerError).toHaveBeenCalled()
        done()
      })
      $httpBackend.flush()
    }))

  })
})
