import * as angular from 'angular'
import summaryChargeAccountModule from './summary-charge-account';
import {SummaryChargeAccountComponentController} from './summary-charge-account.controller';

describe('Unit testing: profitelo.components.dashboard.charge-account.summary-charge-account', () => {
  return describe('for SummaryChargeAccountComponentController component >', () => {

    let rootScope: ng.IScope
    let compile: ng.ICompileService
    let component: SummaryChargeAccountComponentController

    const validHTML = '<summary-charge-account></summary-charge-account>'

    function create(html: string): JQuery {
      const parentScope: ng.IScope = rootScope.$new()
      const elem = angular.element(html)
      const compiledElement = compile(elem)(parentScope)
      parentScope.$digest()
      return compiledElement
    }

    beforeEach(() => {

      angular.mock.module(summaryChargeAccountModule)

      inject(($rootScope: ng.IRootScopeService, $compile: ng.ICompileService,
              $componentController: ng.IComponentControllerService) => {

        rootScope = $rootScope.$new()
        compile = $compile

        const injectors = {
          $element: create(validHTML)
        }

        component = $componentController<SummaryChargeAccountComponentController, {}>('summaryChargeAccount', injectors, {})
      })
    })

    it('should have a dummy test', inject(() => {
      expect(true).toBeTruthy()
    }))
  })
})
