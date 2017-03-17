import * as angular from 'angular'
import IRootScopeService = profitelo.services.rootScope.IRootScopeService
import {IWindowService} from '../../../services/window/window.service'
describe('Unit testing: profitelo.components.interface.show-more-text', () => {
  return describe('for showMoreTextController component >', () => {

    let scope: any
    let rootScope: ng.IRootScopeService
    let compile: ng.ICompileService
    let componentController: any
    let component: any
    let window: IWindowService
    let validHTML = '<show-more-text data-text="text"></show-more-text>'
    const bindings = {
      text: 'Sample text'
    }

    function create(html: string) {
      scope = rootScope.$new()
      let elem = angular.element(html)
      let compiledElement = compile(elem)(scope)
      scope.$digest()
      return compiledElement
    }

    beforeEach(() => {

      angular.mock.module('profitelo.components.interface.show-more-text')

      inject(($rootScope: IRootScopeService, $compile: ng.ICompileService,
              _$componentController_: ng.IComponentControllerService, _$window_: IWindowService,
              _$timeout_: ng.ITimeoutService, _$log_: ng.ILogService) => {
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

        component = componentController('showMoreText', injectors, bindings)
        component.$onInit()
      })
    })

    it('should have a dummy test', inject(() => {
      expect(true).toBeTruthy()
    }))

    it('should expand collapse element on click', () => {
      const el = create(validHTML)
      el.find('.btn-show-more').triggerHandler('click')
    })

    it('should isCollapsed false', () => {
      component.descriptionStyles.height = 10
      component.showMoreText()
      component.showMoreText()
      expect(component.descriptionStyles.height).toEqual(0)
    })

  })
})
