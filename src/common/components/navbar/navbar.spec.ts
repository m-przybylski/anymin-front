import * as angular from 'angular'
import {NavbarComponentController} from './navbar.controller'
import navbarModule from './navbar'
import {INavbarComponentBindings} from './navbar'
import {UserService} from '../../services/user/user.service'
import {NavbarExpertVisibilityService} from './navbar-expert-visibility/navbar-expert-visibility.service'

describe('Unit testing: navbar', () => {
  return describe('for navbar component >', () => {

    let rootScope: ng.IRootScopeService
    let compile: ng.ICompileService
    let component: NavbarComponentController
    let q: ng.IQService
    let bindings: INavbarComponentBindings
    const validHTML: string =
      '<navbar data-search-value="assa"></navbar>'

    const searchInputQueryValue = 'searchInputQueryValue'
    let navbarExpertVisibilityService: NavbarExpertVisibilityService

    const userService: UserService  = <UserService>{
      getUser: {}
    }

    const window = {
      pageYOffset: 20,
    }

    const document = {
      bind: (_name: string, callback: (event: any) => void): void => {
        callback({target: 'asdasd'})
      }
    }

    function create(html: string) {
      const parentScope: ng.IScope = rootScope.$new()
      const elem = angular.element(html)
      const compiledElement = compile(elem)(parentScope)
      parentScope.$digest()
      return compiledElement
    }

    beforeEach(angular.mock.module(($provide: ng.auto.IProvideService): void => {
      $provide.value('apiUrl', 'awesomeUrl/')
    }))

    beforeEach(() => {

      angular.mock.module(navbarModule)

      inject(($rootScope: ng.IRootScopeService, $compile: ng.ICompileService,
              _navbarExpertVisibilityService_: NavbarExpertVisibilityService,
              $componentController: ng.IComponentControllerService, $q: ng.IQService) => {

        rootScope = $rootScope
        compile = $compile
        q = $q
        navbarExpertVisibilityService = _navbarExpertVisibilityService_

        spyOn(userService, 'getUser').and.returnValue($q.resolve({}))
        spyOn(navbarExpertVisibilityService, 'getExpertVisibility').and.returnValue($q.resolve({}))

        bindings = {
          searchInputQueryValue
        }

        const injectors = {
          userService,
          $element: create(validHTML),
          $document: document,
          $window: window,
          navbarExpertVisibilityService
        }

        component = $componentController<NavbarComponentController, INavbarComponentBindings>(
          'navbar', injectors, bindings)
      })
    })

    it('should have a dummy test', inject(() => {
      expect(true).toBeTruthy()
    }))

    it('should compile the component', () => {
      const el = create(validHTML)
      expect(el.html()).toBeDefined(true)
    })

    it('should collapsed search', inject(() => {
      component.onSearchCollapsed()
      expect(component.isNavigationCollapsed).toBe(false)
    }))

    it('should collapsed search on mobile', inject(() => {
      component.onMobileMenuCollapsed()
      expect(component.isNavigationCollapsed).toBe(true)
    }))

  })
})
