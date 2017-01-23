describe('Unit testing: profitelo.components.interface.collapse-tab', () => {
  return describe('for collapseTab component >', () => {

    let scope
    let rootScope
    let compile
    let componentController
    let component
    let window
    let bindings
    let timeout
    let log
    let validHTML = '<collapse-tab></collapse-tab>'
    let smoothScrollingService

    function create(html) {
      scope = rootScope.$new()
      let elem = angular.element(html)
      let compiledElement = compile(elem)(scope)
      scope.$digest()
      return compiledElement
    }

    beforeEach(() => {
    angular.mock.module('templates-module')
    angular.mock.module('profitelo.components.interface.collapse-tab')

      inject(($rootScope, $compile, _$componentController_, _$window_, _$timeout_, _$log_) => {
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
      

      smoothScrollingService = {
        simpleScrollTo: ()=> {
          return null
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
      const isoScope = el.isolateScope()

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

