import * as angular from "angular"
import {CardPaymentFormComponentController, ICardPaymentFormComponentBindings} from "./card"
import userModule from "../../../../../services/user/user"
import {PaymentsApiMock} from "../../../../../api/api/PaymentsApi"
import apiModule from "../../../../../api/api.module"
describe('Unit testing:profitelo.components.dashboard.charge-account.payment-method.card', () => {
  return describe('for cardPaymentForm component >', () => {

    let httpBackend: ng.IHttpBackendService
    let rootScope: ng.IRootScopeService
    let compile: ng.ICompileService
    let component: CardPaymentFormComponentController

    const validHTML: string = '<card-payment-form amount-method-modal="amountMethodModal"' +
      'payments-links="paymentsLinks" payment-country-id="paymentCountryId"></card-payment-form>'

    function create(html: string, bindings: ICardPaymentFormComponentBindings) {
      const parentScope = rootScope.$new()
      const parentBoundScope = angular.extend(parentScope, bindings)
      const elem = angular.element(html)
      const compiledElement = compile(elem)(parentBoundScope)
      parentBoundScope.$digest()
      return compiledElement
    }

    const bindings: ICardPaymentFormComponentBindings = {
      amountMethodModal: {
        amountModel: {
          cashAmount: {
            amount: '123123',
            currency: 'PLN'
          }
        },
        paymentSystemModel: {
          id: 'asdasd'
        }
      },
      paymentsLinks: [],
      paymentCountryId: 'asd2232323'
    }

    const userService = {
      getUser: () => {
      }
    }

    beforeEach(() => {
      angular.mock.module(userModule)
    })

    beforeEach(angular.mock.module(($provide: ng.auto.IProvideService) => {
      $provide.value('apiUrl', 'awesomeUrl')
      $provide.value('userService', userService)
    }))

    beforeEach(() => {
      //angular.mock.module('templates-module')
      angular.mock.module(apiModule)
      angular.mock.module('profitelo.components.braintree-form')
      angular.mock.module('profitelo.components.dashboard.charge-account.payment-method.card')

      inject(($rootScope: ng.IRootScopeService, $compile: ng.ICompileService,
              $componentController: ng.IComponentControllerService,
              $httpBackend: ng.IHttpBackendService, PaymentsApiMock: PaymentsApiMock, $q: ng.IQService) => {

        spyOn(userService, 'getUser').and.callFake(() => $q.resolve({}))

        rootScope = $rootScope
        compile = $compile
        httpBackend = $httpBackend

        PaymentsApiMock.getClientTokenRoute(200, {token: '123'})

        component = $componentController<CardPaymentFormComponentController, ICardPaymentFormComponentBindings>(
          'cardPaymentForm', {}, bindings)
      })
    })

    it('should have a dummy test', inject(() => {
      expect(true).toBeTruthy()
    }))

    it('should compile the component', () => {
      let el = create(validHTML, bindings)
      expect(el.html()).toBeDefined(true)
    })
  })
})
