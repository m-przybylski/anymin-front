namespace profitelo.components.interface.collapseTab {
import IWindowService = profitelo.services.window.IWindowService
  import ISmoothScrollingService = profitelo.services.smoothScrolling.ISmoothScrollingService
  describe('Unit testing: profitelo.components.interface.collapse-tab', () => {
  return describe('for collapseTab component >', () => {

    let scope: any
    let rootScope: ng.IRootScopeService
    let compile: ng.ICompileService
    let componentController: any
    let component: any
    let window: IWindowService
    let bindings: any
    let timeout: ng.ITimeoutService
    let log: ng.ILogService
    let validHTML = '<collapse-tab></collapse-tab>'
    let smoothScrollingService: ISmoothScrollingService

    function create(html: string) {
      scope = rootScope.$new()
      let elem = angular.element(html)
      let compiledElement = compile(elem)(scope)
      scope.$digest()
      return compiledElement
    }

    beforeEach(() => {
    angular.mock.module('templates-module')
    angular.mock.module('profitelo.components.interface.collapse-tab')

      inject(($rootScope: IRootScopeService, $compile: ng.ICompileService,
              _$componentController_: ng.IComponentControllerService, _$window_: IWindowService,
              _$timeout_: ng.ITimeoutService, _$log_: ng.ILogService) => {
        componentController = _$componentController_
        rootScope = $rootScope.$new()
        compile = $compile
        timeout = _$timeout_
        window = _$window_
        log = _$log_
      })

      bindings = {
        title: 'test'
      }


      smoothScrollingService = <ISmoothScrollingService>{
        simpleScrollTo: (_x: any)=> {
        }
      }

      component = componentController('collapseTab', {$element: create(validHTML), $scope: rootScope, $window: window, $log: log,
        smoothScrollingService: smoothScrollingService}, {})
      timeout.flush()
    })

    it('should have a dummy test', inject(() => {
      expect(true).toBeTruthy()
    }))

    it('should compile the component', () => {
      const el = create(validHTML)
      expect(el.html()).toBeDefined(true)
    })

    it('should expand collapse element on click', () => {
      const el = create(validHTML)
      const isoScope: any = el.isolateScope()

      spyOn(isoScope.$ctrl, 'toggleCollapse')
      el.find('.btn-show-more').triggerHandler('click')
      expect(isoScope.$ctrl.toggleCollapse).toHaveBeenCalled()
    })

    it('should scroll to upper element on collapse', () => {
      spyOn(smoothScrollingService, 'simpleScrollTo')
      component.toggleCollapse()
      component.toggleCollapse()
      expect(smoothScrollingService.simpleScrollTo).toHaveBeenCalled()
    })

  })
})

}
