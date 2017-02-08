describe('Unit testing: profitelo.components.dashboard.charge-account.payu-payment-form', () => {
  return describe('for payuPaymentFormController component >', () => {
    const url = 'awesomUrl/'

    let scope
    let compile
    let componentController
    let component
    let state
    let bindings
    let httpBackend
    let PaymentApiDef
    let window
    let topAlertService
    let resourcesExpectations
    let smoothScrollingService
    let User

    beforeEach(angular.mock.module(function($provide) {
      $provide.value('apiUrl', url)
    }))


    beforeEach(() => {
    angular.mock.module('templates-module')
    angular.mock.module('profitelo.swaggerResources.definitions')
    angular.mock.module('profitelo.components.dashboard.charge-account.payu-payment-form')
    angular.mock.module('ui.router')

      inject(($rootScope, $compile, _$componentController_, $httpBackend, $window, _User_,  _$state_, _PaymentsApiDef_, _topAlertService_, _smoothScrollingService_) => {
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

