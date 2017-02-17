namespace profitelo.components.dashboard.invoiceCompany {

  describe('Unit testing: profitelo.components.dashboard.invoice', () => {
    return describe('for InvoiceCompanyFormComponentController component >', () => {

      let scope: ng.IScope
      let compile: ng.ICompileService
      let componentController: ng.IComponentControllerService
      let component: InvoiceCompanyFormComponentController

      beforeEach(() => {
        angular.mock.module('templates-module')
        angular.mock.module('profitelo.components.dashboard.invoice')

        inject(($rootScope: IRootScopeService, $compile: ng.ICompileService,
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
}
