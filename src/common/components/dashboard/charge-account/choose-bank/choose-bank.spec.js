describe('Unit testing: profitelo.components.dashboard.charge-account.choose-bank', () => {
  return describe('for chooseBank component >', () => {

    const url = 'awesomUrl/'

    let scope
    let rootScope
    let compile
    let componentController
    let component
    let bindings
    let validHTML = '<choose-bank bank-model="{value: 1}" payments-links="[{value: 1}]"></choose-bank>'

    beforeEach(module(function($provide) {
      $provide.value('apiUrl', url)
    }))

    beforeEach(() => {
      module('templates-module')
      module('profitelo.components.dashboard.charge-account.choose-bank')

      inject(($rootScope, $compile, _$componentController_) => {
        componentController = _$componentController_
        rootScope = $rootScope.$new()
        compile = $compile
      })

      bindings = {
        bankModel: {
          value: 1
        },
        paymentsLinks: [
          {value: 1}
        ]
      }

      component = componentController('chooseBank', null, bindings)

    })

    function create(html) {
      scope = rootScope.$new()
      let elem = angular.element(html)
      let compiledElement = compile(elem)(scope)
      scope.$digest()
      return compiledElement
    }

    it('should have a dummy test', inject(() => {
      expect(true).toBeTruthy()
    }))

    it('should compile the component', () => {
      let el = create(validHTML)
      expect(el.html()).toBeDefined(true)
    })



  })
})
