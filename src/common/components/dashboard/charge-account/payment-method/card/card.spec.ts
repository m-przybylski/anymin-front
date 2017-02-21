namespace profitelo.components.dashboard.chargeAccount.paymentMethod.cardPaymentForm {

  describe('Unit testing: profitelo.components.dashboard.charge-account.card', () => {
    return describe('for CardPaymentFormComponentController component >', () => {

      let rootScope: ng.IScope
      let compile: ng.ICompileService
      let component: CardPaymentFormComponentController

      const validHTML: string = '<card-payment-form></card-payment-form>'

      function create(html: string) {
        const parentScope: ng.IScope = rootScope.$new()
        const elem = angular.element(html)
        const compiledElement = compile(elem)(parentScope)
        parentScope.$digest()
        return compiledElement
      }

      beforeEach(() => {
        angular.mock.module('templates-module')
        angular.mock.module('profitelo.directives.interface.pro-input')
        angular.mock.module('profitelo.directives.interface.pro-checkbox')
        angular.mock.module('profitelo.components.dashboard.charge-account.card')

        inject(($rootScope: ng.IRootScopeService, $compile: ng.ICompileService,
                $componentController: ng.IComponentControllerService) => {

          rootScope = $rootScope.$new()
          compile = $compile

          const injectors = {
            $element: create(validHTML)
          }

          component = $componentController<CardPaymentFormComponentController, {}>('cardPaymentForm', injectors, {})
        })
      })

      it('should have a dummy test', inject(() => {
        expect(true).toBeTruthy()
      }))
    })
  })
}
