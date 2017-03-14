import * as angular from "angular"
import {InvoiceDataResolver} from "./invoice-data.resolver"

describe('Unit testing: profitelo.resolvers.invoice-data', () => {
  describe('for InvoiceDataResolver service >', () => {

    let url = 'awesomeURL'
    let InvoiceDataResolver: InvoiceDataResolver
    let $httpBackend: ng.IHttpBackendService
    let log

    beforeEach(angular.mock.module(function ($provide: ng.auto.IProvideService) {
      $provide.value('apiUrl', url)
    }))

    beforeEach(() => {
      angular.mock.module('profitelo.resolvers.invoice-data')

      inject(($injector: ng.auto.IInjectorService) => {
        InvoiceDataResolver = $injector.get<InvoiceDataResolver>('InvoiceDataResolver')
        $httpBackend = $injector.get('$httpBackend')
        log = $injector.get('$log')
      })

    })

  })
})
