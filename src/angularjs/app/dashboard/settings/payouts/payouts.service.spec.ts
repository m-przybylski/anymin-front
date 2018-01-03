import * as angular from 'angular'
import {PayoutsApiMock, AccountApiMock} from 'profitelo-api-ng/api/api'
import {PayoutsService} from './payouts.service'
import dashboardSettingsPayoutsModule from './payouts'
import {httpCodes} from '../../../../common/classes/http-codes'
import {ErrorHandlerService} from '../../../../common/services/error-handler/error-handler.service'

describe('Unit testing: profitelo.dashboard.settings.payouts', () => {
  describe('for PayoutsSettingsResolver service >', () => {

    let payoutsService: PayoutsService

    beforeEach(angular.mock.module(function ($provide: ng.auto.IProvideService): void {
      $provide.value('apiUrl', 'awesomeUrl')
    }))

    beforeEach(() => {
      angular.mock.module(dashboardSettingsPayoutsModule)

      inject(($injector: ng.auto.IInjectorService) => {
        payoutsService = $injector.get<PayoutsService>('payoutsService')
      })
    })

    it('should get payout methods',
      (done) => inject(($httpBackend: ng.IHttpBackendService, PayoutsApiMock: PayoutsApiMock) => {
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
    }))

    it('should put payout methods',
      (done) => inject(($httpBackend: ng.IHttpBackendService, PayoutsApiMock: PayoutsApiMock) => {
      const mockPayoutsMethod = {}
      PayoutsApiMock.putPayoutMethodRoute(httpCodes.ok, mockPayoutsMethod)
      payoutsService.putPayoutMethod().then((response) => {
        expect(response).toEqual(mockPayoutsMethod)
        done()
      })
      $httpBackend.flush()
    }))

    it('should show error when put payout methods fails',
      (done) => inject(($httpBackend: ng.IHttpBackendService, errorHandler: ErrorHandlerService,
                        PayoutsApiMock: PayoutsApiMock) => {
      spyOn(errorHandler, 'handleServerError')
      PayoutsApiMock.putPayoutMethodRoute(httpCodes.badRequest)
      payoutsService.putPayoutMethod().catch( _error => {
        expect(errorHandler.handleServerError).toHaveBeenCalled()
        done()
      })
      $httpBackend.flush()
    }))

    it('should log error when get payout methods fails',
      (done) => inject(($httpBackend: ng.IHttpBackendService, $log: ng.ILogService,
                        PayoutsApiMock: PayoutsApiMock) => {
      spyOn($log, 'error')
      PayoutsApiMock.getPayoutMethodsRoute(httpCodes.badRequest)
      payoutsService.getPayoutMethods().catch( _error => {
        expect($log.error).toHaveBeenCalled()
        done()
      })
      $httpBackend.flush()
    }))

    it('should get company invoice details',
      (done) => inject(($httpBackend: ng.IHttpBackendService, AccountApiMock: AccountApiMock) => {
        const mockCompanyInvoiceDetails = {
          id: 'id',
          accountId: 'id',
          vatNumber: '1231231212',
          companyName: 'companyName',
          vat: 23,
          address: {
            address: 'address',
            postalCode: '21-212',
            city: 'KR',
            countryISO: 'PL'
          },
          email: 'email@com.pl',
          createdAt: new Date()
        }
        AccountApiMock.getCompanyPayoutInvoiceDetailsRoute(httpCodes.ok, mockCompanyInvoiceDetails)
        payoutsService.getCompanyPayoutsInvoiceDetails().then((response) => {
          expect(response).toEqual(mockCompanyInvoiceDetails)
          done()
        })
        $httpBackend.flush()
      }))

    it('should log error when get company invoice details fails',
      (done) => inject(($httpBackend: ng.IHttpBackendService, $log: ng.ILogService,
                        AccountApiMock: AccountApiMock) => {
        spyOn($log, 'error')
        AccountApiMock.getCompanyPayoutInvoiceDetailsRoute(httpCodes.badRequest)
        payoutsService.getCompanyPayoutsInvoiceDetails().catch( _error => {
          expect($log.error).toHaveBeenCalled()
          done()
        })
        $httpBackend.flush()
      }))

  })
})
