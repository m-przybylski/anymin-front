import * as angular from 'angular'
import {PayPalPaymentFormComponentController} from './paypal.controller'
import paypalModule from './paypal'

describe('Unit testing: profitelo.components.dashboard.charge-account.payment-method.paypal', () => {
  return describe('for PayPalPaymentFormComponentController component >', () => {

    let rootScope: ng.IScope
    let compile: ng.ICompileService
    let component: PayPalPaymentFormComponentController

    const validHTML = '<payment-formpal-pay></payment-formpal-pay>'

    function create(html: string): JQuery {
      const parentScope: ng.IScope = rootScope.$new()
      const elem = angular.element(html)
      const compiledElement = compile(elem)(parentScope)
      parentScope.$digest()
      return compiledElement
    }

      beforeEach(() => {
        angular.mock.module(paypalModule)
      })

      beforeEach(angular.mock.module(($provide: ng.auto.IProvideService) => {
        $provide.value('apiUrl', 'awesomeUrl')
        $provide.value('paypalFactory', {Button: {
          render: (): void => {}
        }})
      }))

      beforeEach(() => {
        angular.mock.module('profitelo.components.dashboard.charge-account.payment-method.paypal')

        inject(($rootScope: ng.IRootScopeService, $compile: ng.ICompileService, paypalFactory: any,
                $componentController: ng.IComponentControllerService) => {

        rootScope = $rootScope.$new()
        compile = $compile

          const injectors = {
            $element: create(validHTML),
            paypalFactory: paypalFactory,
            $state: {}
          }

        component = $componentController<PayPalPaymentFormComponentController, {}>('paypalPaymentForm', injectors, {})
      })
    })

    it('should have a dummy test', inject(() => {
      expect(true).toBeTruthy()
    }))
  })
})
