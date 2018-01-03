import * as angular from 'angular'

import invoiceCompanyFormComponentModule from './invoice-company';
import {InvoiceCompanyFormComponentController} from './invoice-company.controller';

describe('Unit testing: profitelo.components.dashboard.invoice', () => {
  return describe('for InvoiceCompanyFormComponentController component >', () => {

    let scope: ng.IScope
    let compile: ng.ICompileService
    let componentController: ng.IComponentControllerService
    let component: InvoiceCompanyFormComponentController

    beforeEach(() => {

      angular.mock.module(invoiceCompanyFormComponentModule)

      inject(($rootScope: any, $compile: ng.ICompileService,
              _$componentController_: ng.IComponentControllerService) => {
        componentController = _$componentController_
        scope = $rootScope.$new()
        compile = $compile
      })

      component = componentController('invoiceCompany', {}, {})
    })

    it('should have a dummy test', inject(() => {
      expect(true).toBeTruthy()
    }))
  })
})
