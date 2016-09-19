describe('Unit testing: profitelo.components.dashboard.charge-account.payu-payment-form', () => {
  return describe('for payuPaymentFormController component >', () => {
    const url = 'awesomUrl/'

    let scope
    let rootScope
    let compile
    let componentController
    let component
    let state
    let bindings
    let PaymentsApi
    let _httpBackend
    let PaymentApiDef
    let window
    let proTopAlertService
    let resourcesExpectations

    beforeEach(module(function($provide) {
      $provide.value('apiUrl', url)
    }))
    

    beforeEach(() => {
      module('templates-module')
      module('profitelo.swaggerResources.definitions')
      module('profitelo.components.dashboard.charge-account.payu-payment-form')
      module('ui.router')
      
      inject(($rootScope, $compile, _$componentController_, $httpBackend,_PaymentsApi_, _$state_, _PaymentsApiDef_, _proTopAlertService_, $window) => {
        componentController = _$componentController_
        rootScope = $rootScope.$new()
        compile = $compile
        state = _$state_
        PaymentsApi = _PaymentsApi_
        _httpBackend = $httpBackend
        PaymentApiDef = _PaymentsApiDef_
        proTopAlertService = _proTopAlertService_
        window = $window
      })

      resourcesExpectations = {
        PaymentsApi: {
          postPayUOrder: _httpBackend.when(PaymentApiDef.postPayUOrder.method, PaymentApiDef.postPayUOrder.url)
        }
      }
      
      bindings = {
        amountMethodModal: {
          firstName: 'DUMB_NAME',
          lastName: 'DUMB_LASTNAME',
          email: 'DUMB_EMAIL',
          payMethodValue: '1',
          amountModel: {
            amount: '2122'
          },
          paymentSystemModel: {
            id: 1
          }
        }
      }

      component = componentController('payuPaymentForm',null, bindings)
      
      expect(component.amountMethodModal).toBeDefined();
    })

    it('should have a dummy test', inject(() => {
      expect(true).toBeTruthy()
    }))

    it('should redirect to app.dashboard.start on form error', inject(() => {
      bindings.validAction =  () => {
        return true
      }
      component = componentController('payuPaymentForm',null, bindings)
      spyOn(state, 'go')
      resourcesExpectations.PaymentsApi.postPayUOrder.respond(400)
      component.sendPayment()
      _httpBackend.flush()
      expect(state.go).toHaveBeenCalled()
    }))
    
    it('should open payu cart', inject(() => {
      spyOn(window, 'open')
      resourcesExpectations.PaymentsApi.postPayUOrder.respond(200)
      component.sendPayment()
      _httpBackend.flush()
      expect(window.open).toHaveBeenCalled()
    }))
  })
})

