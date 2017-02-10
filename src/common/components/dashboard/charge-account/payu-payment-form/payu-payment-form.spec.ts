namespace profitelo.components.dashboard.chargeAccount.payuPaymentForm {
import IWindowService = profitelo.services.window.IWindowService
  import ISmoothScrollingService = profitelo.services.smoothScrolling.ISmoothScrollingService
  import ITopAlertService = profitelo.services.topAlert.ITopAlertService
  describe('Unit testing: profitelo.components.dashboard.charge-account.payu-payment-form', () => {
  return describe('for payuPaymentFormController component >', () => {
    const url = 'awesomUrl/'

    let scope: any
    let compile: ng.ICompileService
    let componentController: any
    let component: any
    let state: ng.ui.IStateService
    let bindings: any
    let httpBackend: ng.IHttpBackendService
    let PaymentApiDef: any
    let window: IWindowService
    let topAlertService
    let resourcesExpectations: any
    let smoothScrollingService: ISmoothScrollingService
    let User: any

    beforeEach(angular.mock.module(function($provide: ng.auto.IProvideService) {
      $provide.value('apiUrl', url)
    }))


    beforeEach(() => {
    angular.mock.module('templates-module')
    angular.mock.module('profitelo.swaggerResources.definitions')
    angular.mock.module('profitelo.components.dashboard.charge-account.payu-payment-form')
    angular.mock.module('ui.router')

      inject(($rootScope: IRootScopeService, $compile: ng.ICompileService,
              _$componentController_: ng.IComponentControllerService, $httpBackend: ng.IHttpBackendService,
              $window: IWindowService, _User_: any,  _$state_: ng.ui.IStateService, _PaymentsApiDef_: any,
              _topAlertService_: ITopAlertService, _smoothScrollingService_: ISmoothScrollingService) => {
        componentController = _$componentController_
        scope = $rootScope.$new()
        compile = $compile
        state = _$state_
        httpBackend = $httpBackend
        PaymentApiDef = _PaymentsApiDef_
        topAlertService = _topAlertService_
        window = $window
        smoothScrollingService = _smoothScrollingService_
        User = _User_
      })

      resourcesExpectations = {
        PaymentsApi: {
          postPayUOrder: httpBackend.when(PaymentApiDef.postPayUOrder.method, PaymentApiDef.postPayUOrder.url)
        }
      }

      User.getData = () => {
        return 'BOBiARTUR@profitelo.pl'
      }

      bindings = {
        amountMethodModal: {
          firstName: 'DUMB_NAME',
          lastName: 'DUMB_LASTNAME',
          payMethodValue: '1',
          amountModel: {
            amount: '2122'
          },
          paymentSystemModel: {
            id: 1
          }
        }
      }

      component = componentController('payuPaymentForm', {}, bindings)

      expect(component.amountMethodModal).toBeDefined()
    })

    it('should have a dummy test', inject(() => {
      expect(true).toBeTruthy()
    }))

    it('should redirect to app.dashboard.client.activities on form error', inject(() => {
      bindings.validAction =  () => {
        return true
      }
      component = componentController('payuPaymentForm', {}, bindings)
      component.$onInit()

      spyOn(state, 'go')
      resourcesExpectations.PaymentsApi.postPayUOrder.respond(400)
      component.sendPayment()
      httpBackend.flush()
      expect(state.go).toHaveBeenCalled()
    }))

    it('should redirect to payu', inject(() => {
      bindings.amountMethodModal.email = 'testacc@profitelo.pl'
      component = componentController('payuPaymentForm', {}, bindings)
      component.$onInit()

      spyOn(window, 'open')
      resourcesExpectations.PaymentsApi.postPayUOrder.respond(200)
      component.sendPayment()
      httpBackend.flush()
      expect(window.open).toHaveBeenCalled()
    }))

    it('should scroll to bank-section', inject(() => {
      spyOn(smoothScrollingService, 'simpleScrollTo')
      bindings.amountMethodModal.payMethodValue = undefined
      component = componentController('payuPaymentForm', {}, bindings)
      resourcesExpectations.PaymentsApi.postPayUOrder.respond(200)
      component.sendPayment()
      expect(smoothScrollingService.simpleScrollTo).toHaveBeenCalled()
    }))

  })
})

}
