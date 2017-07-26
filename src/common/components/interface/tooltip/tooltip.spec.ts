import * as angular from 'angular'
import tooltipModule from './tooltip'
import {ITooltipComponentBindings} from './tooltip'
import {TooltioComponentController} from './tooltip.controller'

describe('Unit testing: profitelo.components.interface.tooltip', () => {
  return describe('for tooltip component >', () => {

    let rootScope: ng.IRootScopeService
    let compile: ng.ICompileService
    let component: TooltioComponentController
    let timeout: ng.ITimeoutService

    const validHTML =
      '<tooltip data-tooltip-text="string"></tooltip>'

    const bindings: ITooltipComponentBindings = {
      tooltipText: 'string'
    }

    function create(html: string): JQuery {
      const parentScope: ng.IScope = rootScope.$new()
      const elem = angular.element(html)
      const compiledElement = compile(elem)(parentScope)
      parentScope.$digest()
      return compiledElement
    }

    beforeEach(() => {
      angular.mock.module(tooltipModule)
    })

    beforeEach(() => {
      inject(($rootScope: ng.IRootScopeService, $compile: ng.ICompileService, $timeout: ng.ITimeoutService,
              $componentController: ng.IComponentControllerService) => {

        rootScope = $rootScope
        compile = $compile
        timeout = $timeout

        const injectors = {
          $element: create(validHTML)
        }

        component = $componentController<TooltioComponentController, {}>('tooltip', injectors, bindings)
        component.$onInit()
        timeout.flush()
      })
    })

    it('should have a dummy test', inject(() => {
      expect(true).toBeTruthy()
    }))

    it('should compile the component', () => {
      const element: JQuery = create(validHTML)
      expect(element.html()).toBeDefined(true)
    })
    it('should onEnter', () => {
      spyOn(component, 'isHover')
      component.onEnter()
      expect(component.isHover).toBe(true)
    })
    it('should onLeave', () => {
      spyOn(component, 'isHover')
      component.onLeave()
      expect(component.isHover).toBe(false)
    })
  })
})
