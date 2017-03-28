namespace profitelo.components.interface.slider {
import IRootScopeService = profitelo.services.rootScope.IRootScopeService
  describe('Unit testing: profitelo.components.interface.slider', () => {
  return describe('for slider component >', () => {

    let scope: any
    let rootScope: ng.IRootScopeService
    let compile: ng.ICompileService
    let componentController: any
    let component: any
    let timeout: ng.ITimeoutService
    let validHTML = '<slider data-ng-transclude data-controlls="controlls" data-move-slides="-2"></slider>'

    function create(html: string) {
      scope = rootScope.$new()
      let elem = angular.element(html)
      let compiledElement = compile(elem)(scope)
      scope.$digest()
      return compiledElement
    }

    beforeEach(() => {

    angular.mock.module('profitelo.components.interface.slider')

      inject(($rootScope: IRootScopeService, $compile: ng.ICompileService,
              _$componentController_: ng.IComponentControllerService, _$timeout_: ng.ITimeoutService) => {
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
}
