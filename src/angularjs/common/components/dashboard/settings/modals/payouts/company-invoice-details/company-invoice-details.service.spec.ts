import * as angular from 'angular'
import {AccountApiMock} from 'profitelo-api-ng/api/api'
import {CompanyInvoiceDetailsModalService} from './company-invoice-details.service'
import invoiceDetailsModalModule from './company-invoice-details'
import {httpCodes} from '../../../../../../../common/classes/http-codes'
import {ErrorHandlerService} from '../../../../../../../common/services/error-handler/error-handler.service'

describe('Unit testing: profitelo.components.settings.payouts.modals.company-invoice-details', () => {
  describe('for CompanyInvoiceDetailsModalService service >', () => {

    let companyInvoiceDetailsModalService: CompanyInvoiceDetailsModalService

    beforeEach(() => {
      angular.mock.module(invoiceDetailsModalModule)
    })

    beforeEach(angular.mock.module(function ($provide: ng.auto.IProvideService): void {
      $provide.value('apiUrl', 'awesomeUrl')
    }))

    beforeEach(() => {
      inject(($injector: ng.auto.IInjectorService) => {
        companyInvoiceDetailsModalService =
          $injector.get<CompanyInvoiceDetailsModalService>('companyInvoiceDetailsModalService')
      })
    })

    it('should post company invoice details',
      (done) => inject(($httpBackend: ng.IHttpBackendService, AccountApiMock: AccountApiMock) => {
        const mockPostCompanyInvoiceDetails = {
          vatNumber: '1231231212',
          companyName: 'companyName',
          address: {
          address: 'address',
            postalCode: '21-212',
            city: 'KR',
            countryISO: 'PL'
        },
        email: 'email@com.pl',
        }
        const response = {
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
        AccountApiMock.postCompanyPayoutInvoiceDetailsRoute(httpCodes.ok, response)
        companyInvoiceDetailsModalService.saveInvoiceDetails(mockPostCompanyInvoiceDetails)
          .then((response) => {
          expect(response).toEqual(response)
          done()
        })
        $httpBackend.flush()
      }))

    it('should show error when post company invoice details fails',
      (done) => inject(($httpBackend: ng.IHttpBackendService, errorHandler: ErrorHandlerService,
                        AccountApiMock: AccountApiMock) => {
        const mockPostCompanyInvoiceDetails = {
          vatNumber: '1231231212',
          companyName: 'companyName',
          address: {
            address: 'address',
            postalCode: '21-212',
            city: 'KR',
            countryISO: 'PL'
          },
          email: 'email@com.pl',
        }
        spyOn(errorHandler, 'handleServerError')
        AccountApiMock.postCompanyPayoutInvoiceDetailsRoute(httpCodes.internalServerError)
        companyInvoiceDetailsModalService.saveInvoiceDetails(mockPostCompanyInvoiceDetails).catch( _error => {
          expect(errorHandler.handleServerError).toHaveBeenCalled()
          done()
        })
        $httpBackend.flush()
      }))

  })
})
