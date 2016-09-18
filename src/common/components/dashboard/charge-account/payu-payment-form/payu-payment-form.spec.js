describe('Unit testing: profitelo.components.dashboard.charge-account.payu-payment-form', () => {
  return describe('for payuPaymentFormController component >', () => {
    const url = 'awesomUrl/'

    let scope
    let rootScope
    let compile
    let componentController
    let component
    let bindings
    let validHTML = '<payu-payment-form></payu-payment-form>'

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
      module('profitelo.components.dashboard.charge-account.payu-payment-form')

      inject(($rootScope, $compile, _$componentController_) => {
        componentController = _$componentController_
        rootScope = $rootScope.$new()
        compile = $compile
      })
      bindings = {

      }

      component = componentController('payuPaymentForm',null, bindings)

    })

    it('should have a dummy test', inject(() => {
      expect(true).toBeTruthy()
    }))

    it('should compile the component', () => {
      let el = create(validHTML)
      expect(el.html()).toBeDefined(true)
    })
  })
})

