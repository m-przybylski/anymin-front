describe('Unit testing: profitelo.components.communicator.communicator-minimized', () => {
  return describe('for messengerMaximized component >', () => {

    const url = 'awesomeURL'
    let scope
    let rootScope
    let compile
    let componentController
    let component
    let validHTML = '<communicator-minimized></communicator-minimized>'

    function create(html) {
      scope = rootScope.$new()
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
      module('profitelo.components.communicator.communicator-minimized')

      inject(($rootScope, $compile, $timeout, _$componentController_, _$window_) => {
        componentController = _$componentController_
        rootScope = $rootScope.$new()
        compile = $compile
      })

      component = componentController('communicatorMinimized', {
        $element: create(validHTML),
        $scope: rootScope
      }, {
        maximizeCommunicator: () => {}
      })
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

