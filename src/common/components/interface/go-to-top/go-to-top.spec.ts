namespace profitelo.components.interface.goToTop {
import ISmoothScrollingService = profitelo.services.smoothScrolling.ISmoothScrollingService
  import IWindowService = profitelo.services.window.IWindowService
  describe('Unit testing: profitelo.components.interface.go-to-top', () => {
  return describe('for goToTop component >', () => {

    let scope: any
    let rootScope: ng.IRootScopeService
    let compile: ng.ICompileService
    let smoothScrollingService: ISmoothScrollingService
    let componentController: any
    let component: any
    let window
    let bindings: any
    let validHTML = '<go-to-top></go-to-top>'

    function create(html: string) {
      scope = rootScope.$new()
      let elem = angular.element(html)
      let compiledElement = compile(elem)(scope)
      scope.$digest()
      return compiledElement
    }

    beforeEach(() => {
    angular.mock.module('templates-module')
    angular.mock.module('profitelo.components.interface.go-to-top')

      inject(($rootScope: IRootScopeService, $compile: ng.ICompileService,
              _$componentController_: ng.IComponentControllerService, _$window_: IWindowService,
              _smoothScrollingService_: ISmoothScrollingService) => {
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

}
