describe('Unit testing: profitelo.components.communicator.communicator-maximized.messenger.messenger-maximized', () => {
  return describe('for messengerMaximized component >', () => {

    let scope
    let rootScope
    let compile
    let smoothScrolling
    let componentController
    let component
    let window
    let validHTML = '<messenger-maximized></messenger-maximized>'

    function create(html) {
      scope = rootScope.$new()
      let elem = angular.element(html)
      let compiledElement = compile(elem)(scope)
      scope.$digest()
      return compiledElement
    }

    beforeEach(() => {
      module('templates-module')
      module('profitelo.components.communicator.communicator-maximized.messenger.messenger-maximized')

      inject(($rootScope, $compile, _$componentController_, _$window_, _smoothScrolling_) => {
        componentController = _$componentController_
        rootScope = $rootScope.$new()
        compile = $compile
        window = _$window_
        smoothScrolling = _smoothScrolling_

      })

      component = componentController('messengerMaximized', {$element: create(validHTML), $scope: rootScope}, {})
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

