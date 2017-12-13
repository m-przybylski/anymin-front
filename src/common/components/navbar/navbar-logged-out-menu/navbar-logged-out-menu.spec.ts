import * as angular from 'angular'
import {NavbarLoggedOutMenuComponentController} from './navbar-logged-out-menu.controller'
import {INavbarLoggedOutMenuComponentBindings, default as navbarLoggedOutMenuModule} from './navbar-logged-out-menu'

describe('Unit testing: navbar-logged-out-menu', () => {
  return describe('for navbar-logged-out-menu component >', () => {

    let rootScope: ng.IRootScopeService
    let compile: ng.ICompileService
    let component: NavbarLoggedOutMenuComponentController
    let bindings: INavbarLoggedOutMenuComponentBindings
    const validHTML =
      '<navbar-logged-out-menu</navbar-logged-out-menu>'

    function create(html: string,  bindings: INavbarLoggedOutMenuComponentBindings): JQuery {
      const parentScope = rootScope.$new()
      const parentBoundScope = angular.extend(parentScope, bindings)
      const elem = angular.element(html)
      const compiledElement = compile(elem)(parentBoundScope)
      parentBoundScope.$digest()
      return compiledElement
    }

    beforeEach(() => {

      angular.mock.module(navbarLoggedOutMenuModule)

      inject(($rootScope: ng.IRootScopeService, $compile: ng.ICompileService,
              $componentController: ng.IComponentControllerService) => {

        rootScope = $rootScope
        compile = $compile

        bindings = {
        }

        const injectors = {
          $element: create(validHTML, bindings)
        }

        component = $componentController<NavbarLoggedOutMenuComponentController, INavbarLoggedOutMenuComponentBindings>(
          'navbarLoggedOutMenu', injectors, bindings)
      })
    })

    it('should have a dummy test', inject(() => {
      expect(true).toBeTruthy()
    }))

    it('should compile the component', () => {
      const el = create(validHTML, bindings)
      expect(el.html()).toBeDefined(true)
    })

    it('should show help menu', () => {
      component.toggleHelpMenuShow()
      expect(component.isHelpMenuShow).toBe(true)
    })

  })
})
