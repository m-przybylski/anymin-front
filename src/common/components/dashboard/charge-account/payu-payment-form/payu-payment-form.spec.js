describe('Unit testing: profitelo.components.dashboard.charge-account.payu-payment-form', () => {
  return describe('for payuPaymentFormController component >', () => {
    const url = 'awesomUrl/'

    let scope
    let compile
    let componentController
    let component
    let state
    let bindings
    let PaymentsApi
    let httpBackend
    let PaymentApiDef
    let window
    let proTopAlertService
    let resourcesExpectations
    let smoothScrolling
    let User

    function create(html) {
      scope = scope.$new()
      let elem = angular.element(html)
      let compiledElement = compile(elem)(scope)
      scope.$digest()
      return compiledElement
    }

    beforeEach(module(function($provide) {
      $provide.value('apiUrl', url)
    }))
    
    
    beforeEach(() => {
      module('templates-module')
      module('profitelo.swaggerResources.definitions')
      module('profitelo.components.dashboard.charge-account.payu-payment-form')
      module('ui.router')
      
      inject(($rootScope, $compile, _$componentController_, $httpBackend, $window, _User_,  _$state_, _PaymentsApiDef_, _proTopAlertService_, _smoothScrolling_) => {
        componentController = _$componentController_
        scope = $rootScope.$new()
        compile = $compile
        state = _$state_
        httpBackend = $httpBackend
        PaymentApiDef = _PaymentsApiDef_
        proTopAlertService = _proTopAlertService_
        window = $window
        smoothScrolling = _smoothScrolling_
        User = _User_
      })

      resourcesExpectations = {
        PaymentsApi: {
          postPayUOrder: httpBackend.when(PaymentApiDef.postPayUOrder.method, PaymentApiDef.postPayUOrder.url)
        }
      }

      User.getData = (param) => {
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

      component = componentController('payuPaymentForm', null, bindings)
      
      expect(component.amountMethodModal).toBeDefined()
    })

    it('should have a dummy test', inject(() => {
      expect(true).toBeTruthy()
    }))

    it('should redirect to app.dashboard.start on form error', inject(() => {
      bindings.validAction =  () => {
        return true
      }
      component = componentController('payuPaymentForm', null, bindings)

      spyOn(state, 'go')
      resourcesExpectations.PaymentsApi.postPayUOrder.respond(400)
      component.sendPayment()
      httpBackend.flush()
      expect(state.go).toHaveBeenCalled()
    }))
    
    it('should redirect to payu', inject(() => {
      
      bindings.amountMethodModal.email = 'BOBiARTUR@profitelo.pl'
      component = componentController('payuPaymentForm', null, bindings)
      
      spyOn(window, 'open')
      resourcesExpectations.PaymentsApi.postPayUOrder.respond(200)
      component.sendPayment()
      httpBackend.flush()
      expect(window.open).toHaveBeenCalled()
    }))
    
    it('should scroll to bank-section', inject(() => {
      spyOn(smoothScrolling, 'simpleScrollTo')
      bindings.amountMethodModal.payMethodValue = undefined
      component = componentController('payuPaymentForm', null, bindings)
      resourcesExpectations.PaymentsApi.postPayUOrder.respond(200)
      component.sendPayment()
      expect(smoothScrolling.simpleScrollTo).toHaveBeenCalled()
    }))

  })
})

