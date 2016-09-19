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
    let resourcesExpectations
    let validHTML = '<payu-payment-form ></payu-payment-form>'

    beforeEach(module(function($provide) {
      $provide.value('apiUrl', url)
    }))

    function create(html) {
      scope = rootScope.$new()
      let elem = angular.element(html)
      let compiledElement = compile(elem)(scope)
      scope.$digest()
      return compiledElement
    }

    beforeEach(() => {
      module('templates-module')
      module('profitelo.swaggerResources.definitions')
      module('profitelo.components.dashboard.charge-account.payu-payment-form')
      module('ui.router')
      
      inject(($rootScope, $compile, _$componentController_, $httpBackend,_PaymentsApi_, _$state_, _PaymentApiDef_) => {
        componentController = _$componentController_
        rootScope = $rootScope.$new()
        compile = $compile
        state = _$state_
        PaymentsApi = _PaymentsApi_
        _httpBackend = $httpBackend
        PaymentApiDef = _PaymentApiDef_
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
        },
        validAction: () => {
          return true
        }
      }

      component = componentController('payuPaymentForm',null, bindings)
      
      expect(component.amountMethodModal).toBeDefined();
    })

    it('should have a dummy test', inject(() => {
      expect(true).toBeTruthy()
    }))

    it('should call isValid', inject(() => {
      let sendPayment = jasmine.createSpy('sendPayment');
      component.sendPayment()
      expect(sendPayment).toBeCalled()
    }))

  })
})

