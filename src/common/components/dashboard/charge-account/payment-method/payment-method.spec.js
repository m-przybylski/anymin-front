describe('Unit testing: profitelo.components.dashboard.charge-account.payment-method', () => {
  return describe('for paymentMethod component >', () => {

    const url = 'awesomUrl/'

    let scope
    let rootScope
    let compile
    let componentController
    let component
    let bindings
    let validHTML = '<payment-method payment-systems = "[{id: 1, imgSrc: dsadad}, {id: 1, imgSrc: dsadad}, {id: 1, imgSrc: dsadad}]"></payment-method>'

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
      module('profitelo.components.dashboard.charge-account.payment-method')

      inject(($rootScope, $compile, _$componentController_) => {
        componentController = _$componentController_
        rootScope = $rootScope.$new()
        compile = $compile
      })
      bindings = {
        paymentSystems: [{id: 1, imgSrc: 'wwww'},{id: 2, imgSrc: 'wwww'},{id:3, imgSrc: 'wwww'}]
      }

      component = componentController('paymentMethod',null, bindings)

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
