describe('Unit testing: profitelo.components.interface.go-to-top', () => {
  return describe('for goToTop component >', () => {
    
    let scope
    let rootScope
    let compile
    let smoothScrollingService
    let componentController
    let component
    let window
    let bindings
    let validHTML = '<go-to-top></go-to-top>'

    function create(html) {
      scope = rootScope.$new()
      let elem = angular.element(html)
      let compiledElement = compile(elem)(scope)
      scope.$digest()
      return compiledElement
    }

    beforeEach(() => {
    angular.mock.module('templates-module')
    angular.mock.module('profitelo.components.interface.go-to-top')

      inject(($rootScope, $compile, _$componentController_, _$window_, _smoothScrollingService_) => {
        componentController = _$componentController_
        rootScope = $rootScope.$new()
        compile = $compile
        window = _$window_
        smoothScrollingService = _smoothScrollingService_

      })

      bindings = {
        title: 'test'
      }

      component = componentController('goToTop', {$element: create(validHTML), $scope: rootScope}, {})
    })

    it('should have a dummy test', inject(() => {
      expect(true).toBeTruthy()
    }))

    it('should compile the component', () => {
      let el = create(validHTML)
      expect(el.html()).toBeDefined(true)
    })

    it('should call smoothScrollingService', () => {
      let el = create(validHTML)
      spyOn(smoothScrollingService, 'simpleScrollTo')
      el.find('.go-to-top').triggerHandler('click')
      expect(smoothScrollingService.simpleScrollTo).toHaveBeenCalledWith('body')
    })

  })
})

