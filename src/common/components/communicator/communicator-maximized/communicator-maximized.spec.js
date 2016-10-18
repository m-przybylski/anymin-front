describe('Unit testing: profitelo.components.communicator.communicator-maximized', () => {
  return describe('for communicatorMaximized component >', () => {

    const url = 'awesomUrl/'

    let scope
    let rootScope
    let compile
    let componentController
    let component
    let validHTML = '<communicator-maximized></communicator-maximized>'

    beforeEach(module(function($provide) {
      $provide.value('apiUrl', url)
    }))

    beforeEach(() => {
      module('templates-module')
      module('profitelo.components.communicator.communicator-maximized')

      inject(($rootScope, $compile, _$componentController_) => {
        componentController = _$componentController_
        rootScope = $rootScope.$new()
        compile = $compile
      })

      component = componentController('communicatorMaximized', null, {})

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
