import * as angular from 'angular'


import {IWindowService} from '../../../services/window/window.service'
  describe('Unit testing: profitelo.components.interface.collapse-btn', () => {
  return describe('for collapseBtn component >', () => {

    let scope: any
    let rootScope: ng.IRootScopeService
    let compile: ng.ICompileService
    let componentController: any
    let component: any
    let window
    let stylesObject
    const validHTML = '<collapse-btn data-title="title" data-icon="icon"></collapse-btn>'

    function create(html: string): JQuery {
      scope = rootScope.$new()
      const elem = angular.element(html)
      const compiledElement = compile(elem)(scope)
      scope.$digest()
      return compiledElement
    }

    const bindings = {
      title: '@',
      icon: '@'
    }

    beforeEach(() => {

    angular.mock.module('pascalprecht.translate')
    angular.mock.module('profitelo.components.interface.collapse-btn')

      inject(($rootScope: any, $compile: ng.ICompileService,
              _$componentController_: ng.IComponentControllerService, _$window_: IWindowService, _$log_: ng.ILogService) => {
        componentController = _$componentController_
        rootScope = $rootScope.$new()
        compile = $compile
        window = _$window_

        const injectors = {
          $element: create(validHTML),
          $scope: rootScope,
          $window: window,
          $log: _$log_
        }

        stylesObject = {
          minHeight: 1
        }

        component = componentController('collapseBtn', injectors, bindings)
      })
    })

    it('should have a dummy test', inject(() => {
      expect(true).toBeTruthy()
    }))

    it('should compile the component', () => {
      const el = create(validHTML)
      expect(el.html()).toBeDefined(true)
    })

    it('should collapseToggle', () => {
      const el = create(validHTML)
      el.find('.btn.collapse-btn-header').triggerHandler('click')
    })

    it('should collapseToggle', () => {
      component.stylesObject.height = 12
      component.collapseToggle()
      component.collapseToggle()
      expect(component.stylesObject.height).toEqual(0)
    })
  })
})
