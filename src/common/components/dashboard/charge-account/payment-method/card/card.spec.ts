namespace profitelo.components.dashboard.chargeAccount.paymentMethod.cardPaymentForm {

  import IPaymentsApiMock = profitelo.api.IPaymentsApiMock
  describe('Unit testing:profitelo.components.dashboard.charge-account.payment-method.card', () => {
    return describe('for cardPaymentForm component >', () => {

      let httpBackend: ng.IHttpBackendService
      let rootScope: ng.IRootScopeService
      let compile: ng.ICompileService
      let component: CardPaymentFormComponentController

      const validHTML: string = '<card-payment-form></card-payment-form>'

      function create(html: string, bindings: {}) {
        const parentScope = rootScope.$new()
        const parentBoundScope = angular.extend(parentScope, bindings)
        const elem = angular.element(html)
        const compiledElement = compile(elem)(parentBoundScope)
        parentBoundScope.$digest()
        return compiledElement
      }

      const userService = {
        getUser: () => {}
      }

      beforeEach(() => {
        angular.mock.module('profitelo.services.user')
      })

      beforeEach(angular.mock.module(($provide: ng.auto.IProvideService) => {
        $provide.value('apiUrl', 'awesomeUrl')
        $provide.value('userService', userService)
      }))

      beforeEach(() => {
        angular.mock.module('templates-module')
        angular.mock.module('profitelo.api.PaymentsApi')
        angular.mock.module('profitelo.components.braintree-form')
        angular.mock.module('profitelo.components.dashboard.charge-account.payment-method.card')

        inject(($rootScope: ng.IRootScopeService, $compile: ng.ICompileService,
              $componentController: ng.IComponentControllerService,
              $httpBackend: ng.IHttpBackendService, PaymentsApiMock: IPaymentsApiMock, $q: ng.IQService) => {

          spyOn(userService, 'getUser').and.callFake(() => $q.resolve({}))

          rootScope = $rootScope
          compile = $compile
          httpBackend = $httpBackend

          PaymentsApiMock.getClientTokenRoute(200, {token: '123'})

          component = $componentController<CardPaymentFormComponentController, {}>(
          'cardPaymentForm', {}, {})
        })
      })

      it('should have a dummy test', inject(() => {
        expect(true).toBeTruthy()
      }))

      it('should compile the component', () => {
        let el = create(validHTML, {})
        expect(el.html()).toBeDefined(true)
      })
    })
  })
}
