describe('Unit testing: profitelo.components.interface.dropdown-primary', () => {
  return describe('for dropdownPrimary component >', () => {

    let scope
    let rootScope
    let compile
    let componentController
    let component
    let window
    let bindings
    let timeout
    let document
    let validHTML = '<dropdown-primary data-label="asd" data-icon="icon"></dropdown-primary>'
    let smoothScrolling

    function create(html) {
      scope = rootScope.$new()
      let elem = angular.element(html)
      let compiledElement = compile(elem)(scope)
      scope.$digest()
      return compiledElement
    }

    beforeEach(() => {
      angular.mock.module('templates-module')
      angular.mock.module('profitelo.components.interface.dropdown-primary')

      inject(($rootScope, $compile, _$componentController_, _$window_, _$timeout_, _$document_) => {
        componentController = _$componentController_
        rootScope = $rootScope.$new()
        compile = $compile
        timeout = _$timeout_
        window = _$window_
        document = _$document_
      })

      bindings = {
        label: 'test',
        icon: 'icon'
      }

      smoothScrolling = {
        simpleScrollTo: ()=> {
          return null
        }
      }

      const injectors = {
        $element: create(validHTML),
        $scope: rootScope,
        $window: window,
        smoothScrolling: smoothScrolling,
        $document: document
      }

      component = componentController('dropdownPrimary', injectors, bindings)
      timeout.flush()
    })

    it('should have a dummy test', inject(() => {
      expect(true).toBeTruthy()
    }))

    it('should compile the component', () => {
      const el = create(validHTML)
      expect(el.html()).toBeDefined(true)
    })
  })
})

