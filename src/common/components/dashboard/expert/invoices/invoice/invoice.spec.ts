import * as angular from 'angular'
import IRootScopeService = profitelo.services.rootScope.IRootScopeService;
import IScope = angular.IScope;
import expertInvoiceModule from './invoice'
import {ExpertInvoiceComponentController} from './invoice.controller';

describe('Unit testing: profitelo.components.dashboard.expert.invoices.invoice', () => {
  return describe('for exertLastActivitiesList >', () => {

    let scope: IScope
    let rootScope: ng.IRootScopeService
    let compile: ng.ICompileService
    let componentController: ng.IComponentControllerService
    let component: ExpertInvoiceComponentController
    let validHTML = '<expert-invoice></expert-invoice>'

    function create(html: string) {
      scope = rootScope.$new()
      let elem = angular.element(html)
      let compiledElement = compile(elem)(scope)
      scope.$digest()
      return compiledElement
    }

    beforeEach(() => {

      angular.mock.module(expertInvoiceModule)

      inject(($rootScope: IRootScopeService, $compile: ng.ICompileService,
              _$componentController_: ng.IComponentControllerService) => {
        componentController = _$componentController_
        rootScope = $rootScope.$new()
        compile = $compile
        component = _$componentController_<ExpertInvoiceComponentController, {}>('expertInvoice', {}, {})
      })

    })

    it('should have a dummy test', inject(() => {
      expect(true).toBeTruthy()
    }))
    it('should compile the directive', () => {
      let el = create(validHTML)
      expect(el.html()).toBeDefined(true)
    })
  })
})
