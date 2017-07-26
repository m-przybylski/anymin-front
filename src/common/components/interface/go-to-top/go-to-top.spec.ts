import * as angular from 'angular'
import IRootScopeService = profitelo.services.rootScope.IRootScopeService
import {SmoothScrollingService} from '../../../services/smooth-scrolling/smooth-scrolling.service'
import {IWindowService} from '../../../services/window/window.service'

describe('Unit testing: profitelo.components.interface.go-to-top', () => {
  return describe('for goToTop component >', () => {

    let scope: any
    let rootScope: ng.IRootScopeService
    let compile: ng.ICompileService
    let smoothScrollingService: SmoothScrollingService
    let componentController: any
    let component: any
    let window
    let bindings: any
    const validHTML = '<go-to-top></go-to-top>'

    function create(html: string): JQuery {
      scope = rootScope.$new()
      const elem = angular.element(html)
      const compiledElement = compile(elem)(scope)
      scope.$digest()
      return compiledElement
    }

    beforeEach(() => {

      angular.mock.module('profitelo.components.interface.go-to-top')

      inject(($rootScope: IRootScopeService, $compile: ng.ICompileService,
              _$componentController_: ng.IComponentControllerService, _$window_: IWindowService,
              _smoothScrollingService_: SmoothScrollingService) => {
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
      const el = create(validHTML)
      expect(el.html()).toBeDefined(true)
    })

    it('should call smoothScrollingService', () => {
      const el = create(validHTML)
      spyOn(smoothScrollingService, 'simpleScrollTo')
      el.find('.go-to-top').triggerHandler('click')
      expect(smoothScrollingService.simpleScrollTo).toHaveBeenCalledWith('body')
    })

  })
})
