namespace profitelo.components.dashboard.chargeAccount.paymentMethod.paypalPaymentForm {

  describe('Unit testing: profitelo.components.dashboard.charge-account.payment-method.paypal', () => {
    return describe('for PayPalPaymentFormComponentController component >', () => {

      let rootScope: ng.IScope
      let compile: ng.ICompileService
      let component: PayPalPaymentFormComponentController

      const validHTML: string = '<payment-formpal-pay></payment-formpal-pay>'

      function create(html: string) {
        const parentScope: ng.IScope = rootScope.$new()
        const elem = angular.element(html)
        const compiledElement = compile(elem)(parentScope)
        parentScope.$digest()
        return compiledElement
      }

      beforeEach(() => {
        angular.mock.module('templates-module')
        angular.mock.module('profitelo.components.dashboard.charge-account.payment-method.paypal')

        inject(($rootScope: ng.IRootScopeService, $compile: ng.ICompileService,
                $componentController: ng.IComponentControllerService) => {

          rootScope = $rootScope.$new()
          compile = $compile

          const injectors = {
            $element: create(validHTML)
          }

          component = $componentController<PayPalPaymentFormComponentController, {}>('paypalPaymentForm', injectors, {})
        })
      })

      it('should have a dummy test', inject(() => {
        expect(true).toBeTruthy()
      }))
    })
  })
}
