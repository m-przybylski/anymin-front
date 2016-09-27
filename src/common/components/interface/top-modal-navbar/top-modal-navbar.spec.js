describe('Unit testing: profitelo.components.interface.top-modal-navbar', () => {
  return describe('for topModalNavbar component >', () => {

    let scope
    let rootScope
    let compile
    let componentController
    let component
    let window
    let bindings
    let validHTML = '<top-modal-navbar></top-modal-navbar>'

    function create(html) {
      scope = rootScope.$new()
      let elem = angular.element(html)
      let compiledElement = compile(elem)(scope)
      scope.$digest()
      return compiledElement
    }

    beforeEach(() => {
      module('templates-module')
      module('profitelo.components.interface.top-modal-navbar')

      inject(($rootScope, $compile, _$componentController_, _$window_) => {
        componentController = _$componentController_
        rootScope = $rootScope.$new()
        compile = $compile
        window = _$window_
      })

      bindings = {
        title: 'test'
      }

      component = componentController('topModalNavbar', {$element: create(validHTML), $scope: rootScope}, {})
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

