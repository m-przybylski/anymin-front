import * as angular from 'angular'
import {AccountApiMock, AccountApi} from 'profitelo-api-ng/api/api'
import {InvoiceDataResolver} from './invoice-data.resolver'
import {CompanyInfo} from 'profitelo-api-ng/model/models'

describe('Unit testing: profitelo.resolvers.invoice-data', () => {
  describe('for InvoiceDataResolver service >', () => {

    let invoiceDataResolver: InvoiceDataResolver
    let $httpBackend: ng.IHttpBackendService
    let log: ng.ILogService
    let AccountApi: AccountApi
    let AccountApiMock: AccountApiMock

    beforeEach(angular.mock.module(function ($provide: ng.auto.IProvideService) {
      $provide.value('apiUrl', 'awesomeURL')
      $provide.value('AccountApi', AccountApi)
      $provide.value('AccountApiMock', AccountApiMock)
    }))

    beforeEach(() => {
      angular.mock.module('profitelo.resolvers.invoice-data')

      inject(($injector: ng.auto.IInjectorService, _AccountApiMock_: AccountApiMock, _AccountApi_: AccountApi ) => {
        AccountApiMock = _AccountApiMock_
        AccountApi = _AccountApi_
        invoiceDataResolver = $injector.get<InvoiceDataResolver>('invoiceDataResolver')
        $httpBackend = $injector.get('$httpBackend')
        log = $injector.get('$log')
      })
    })

    it('should have resolve function', () => {
      expect(invoiceDataResolver.resolveCompanyInfo).toBeDefined()
    })

    it('should resolve company info', () => {
      const response =  <CompanyInfo>{}
      AccountApiMock.getCompanyInfoRoute(200, response)
      invoiceDataResolver.resolveCompanyInfo().then(response => {
        expect(response).toEqual(response)
      })
      $httpBackend.flush()
    })

    it('should log error', () => {
      spyOn(log, 'error')
      AccountApiMock.getCompanyInfoRoute(500)
      invoiceDataResolver.resolveCompanyInfo()
      $httpBackend.flush()
      expect(log.error).toHaveBeenCalled()
    })

    it('should return empty object on 404', () => {
      AccountApiMock.getCompanyInfoRoute(404)
      invoiceDataResolver.resolveCompanyInfo().catch(response => {
        expect(response).toEqual({})
      })
      $httpBackend.flush()
    })

  })
})
