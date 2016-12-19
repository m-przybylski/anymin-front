describe('Unit testing: profitelo.components.interface.drop-down', () => {
  return describe('for dropDown component >', () => {

    let scope
    let rootScope
    let compile
    let componentController
    let component
    let window
    let bindings
    let timeout
    let scope
    let document
    let validHTML = '<drop-down data-label="asd" data-icon="icon"></drop-down>'
    let smoothScrolling

    function create(html) {
      scope = rootScope.$new()
      let elem = angular.element(html)
      let compiledElement = compile(elem)(scope)
      scope.$digest()
      return compiledElement
    }

    beforeEach(() => {
      module('templates-module')
      module('profitelo.components.interface.drop-down')

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

      component = componentController('dropDown', {$element: create(validHTML), $scope: rootScope, $window: window,
        smoothScrolling: smoothScrolling, $document: document}, bindings)
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

