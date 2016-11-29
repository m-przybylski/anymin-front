describe('Unit testing: profitelo.components.interface.top-modal-navbar', () => {
  return describe('for topModalNavbar component >', () => {

    let scope
    let rootScope
    let compile
    let componentController
    let component
    const validHTML = '<top-modal-navbar></top-modal-navbar>'

    function create(html) {
      scope = rootScope.$new()
      let elem = angular.element(html)
      let compiledElement = compile(elem)(scope)
      scope.$digest()
      return compiledElement
    }

    beforeEach(() => {
      module('templates-module')
      module('ui.router')
      module('profitelo.components.interface.top-modal-navbar')

      inject(($rootScope, $compile, _$componentController_, _$state_, $window) => {
        componentController = _$componentController_
        rootScope = $rootScope
        compile = $compile

        const injectors = {
          $element: create(validHTML),
          $scope: rootScope,
          $state: _$state_,
          $window: $window
        }

        const bindings = {
          title: 'test'
        }

        component = componentController('topModalNavbar', injectors, bindings)
      })
    })

    it('should have a dummy test', () => {
      expect(true).toBeTruthy()
    })

    it('should compile the component', () => {
      const el = create(validHTML)
      expect(el.html()).toBeDefined(true)
    })

  })
})

