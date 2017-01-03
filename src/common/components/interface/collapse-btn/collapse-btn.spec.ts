describe('Unit testing: profitelo.components.interface.collapse-btn', () => {
  return describe('for collapseBtn component >', () => {

    let scope
    let rootScope
    let compile
    let componentController
    let component
    let window
    let validHTML = '<collapse-btn></collapse-btn>'

    function create(html) {
      scope = rootScope.$new()
      let elem = angular.element(html)
      let compiledElement = compile(elem)(scope)
      scope.$digest()
      return compiledElement
    }

    beforeEach(() => {
    angular.mock.module('templates-module')
    angular.mock.module('profitelo.components.interface.collapse-btn')

      inject(($rootScope, $compile, _$componentController_, _$window_, _$timeout_, _$log_) => {
        componentController = _$componentController_
        rootScope = $rootScope.$new()
        compile = $compile
        window = _$window_

        const injectors = {
          $element: create(validHTML),
          $scope: rootScope,
          $window: window,
          $timeout: _$timeout_,
          $log: _$log_
        }

        component = componentController('collapseBtn', injectors, {})
      })
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

