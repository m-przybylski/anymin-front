import * as angular from 'angular'
import {NavbarHelpComponentController} from './navbar-help.controller'
import navbarHelpModule from './navbar-help'
import {INavbarHelpComponentBindings} from './navbar-help'

describe('Unit testing: navbarHelp', () => {
  return describe('for navbarHelp component >', () => {

    let rootScope: ng.IRootScopeService
    let compile: ng.ICompileService
    let component: NavbarHelpComponentController
    let bindings: INavbarHelpComponentBindings
    const validHTML =
      '<navbar-help></navbar-help>'

    function create(html: string,  bindings: INavbarHelpComponentBindings): JQuery {
      const parentScope = rootScope.$new()
      const parentBoundScope = angular.extend(parentScope, bindings)
      const elem = angular.element(html)
      const compiledElement = compile(elem)(parentBoundScope)
      parentBoundScope.$digest()
      return compiledElement
    }

    beforeEach(() => {

      angular.mock.module(navbarHelpModule)

      inject(($rootScope: ng.IRootScopeService, $compile: ng.ICompileService,
              $componentController: ng.IComponentControllerService) => {

        rootScope = $rootScope
        compile = $compile

        bindings = {
          onClick: (): void => {}
        }

        const injectors = {}

        component = $componentController<NavbarHelpComponentController, INavbarHelpComponentBindings>(
          'navbarHelp', injectors, bindings)
      })
    })

    it('should have a dummy test', inject(() => {
      expect(true).toBeTruthy()
    }))

    it('should compile the component', () => {
      const el = create(validHTML, bindings)
      expect(el.html()).toBeDefined(true)
    })

    it('should show article tab', inject(() => {
      component.changeTab()
      expect(component.isArticleTab).toBe(true)
    }))

    it('should call onClick function', inject(() => {
      spyOn(component, 'onClick')
      component.buttonCallback()
      expect(component.onClick).toHaveBeenCalled()
    }))

  })
})
