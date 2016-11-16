describe('Unit testing: profitelo.components.interface.slider', () => {
  return describe('for slider component >', () => {
    

    let scope
    let rootScope
    let compile
    let componentController
    let component
    let timeout
    let validHTML = '<slider data-ng-transclude data-controlls="controlls" data-move-slides="-2"></slider>'

    function create(html) {
      scope = rootScope.$new()
      let elem = angular.element(html)
      let compiledElement = compile(elem)(scope)
      scope.$digest()
      return compiledElement
    }

    beforeEach(() => {
      module('templates-module')
      module('profitelo.components.interface.slider')

      inject(($rootScope, $compile, _$componentController_, _$timeout_) => {
        componentController = _$componentController_
        rootScope = $rootScope.$new()
        compile = $compile
        timeout = _$timeout_
      })
      
      component = componentController('slider', {$element: create(validHTML), $scope: scope}, {})
      timeout.flush()
      component.nextSlide()
      component.prevSlide()
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
