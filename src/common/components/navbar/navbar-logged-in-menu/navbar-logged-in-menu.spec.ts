import * as angular from 'angular'
import {NavbarLoggedInMenuComponentController} from './navbar-logged-in-menu.controller'
import {INavbarLoggedInMenuComponentBindings, default as navbarLoggedInMenuModule} from './navbar-logged-in-menu'


describe('Unit testing: navbar-logged-in-menu', () => {
  return describe('for navbar-logged-in-menu component >', () => {

    let rootScope: ng.IRootScopeService
    let compile: ng.ICompileService
    let component: NavbarLoggedInMenuComponentController
    let q: ng.IQService
    let bindings: INavbarLoggedInMenuComponentBindings
    const validHTML =
      '<navbar-logged-in-menu</navbar-logged-in-menu>'

    const userService = {
      getUser: () => {
        return q.resolve({})
      }
    }

    function create(html: string,  bindings: INavbarLoggedInMenuComponentBindings) {
      const parentScope = rootScope.$new()
      const parentBoundScope = angular.extend(parentScope, bindings)
      const elem = angular.element(html)
      const compiledElement = compile(elem)(parentBoundScope)
      parentBoundScope.$digest()
      return compiledElement
    }

    beforeEach(angular.mock.module(($provide: ng.auto.IProvideService) => {
      $provide.value('userService', userService)
      $provide.value('topAlertService', {})
    }))

    beforeEach(() => {

      angular.mock.module(navbarLoggedInMenuModule)

      inject(($rootScope: ng.IRootScopeService, $compile: ng.ICompileService,
              $componentController: ng.IComponentControllerService, $q: ng.IQService) => {

        rootScope = $rootScope
        compile = $compile
        q = $q

        bindings = {
        }
        const injectors = {
          userService: userService,
          $element: create(validHTML, bindings)
        }

        component = $componentController<NavbarLoggedInMenuComponentController, INavbarLoggedInMenuComponentBindings>(
          'navbarLoggedInMenu', injectors, bindings)
      })
    })

    it('should have a dummy test', inject(() => {
      expect(true).toBeTruthy()
    }))

    it('should compile the component', () => {
      let el = create(validHTML, bindings)
      expect(el.html()).toBeDefined(true)
    })


  })
})
