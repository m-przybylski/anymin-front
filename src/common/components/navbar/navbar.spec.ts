import * as angular from 'angular'
import {NavbarComponentController} from './navbar.controller'
import navbarModule from './navbar'
import {INavbarComponentBindings} from './navbar'

describe('Unit testing: navbar', () => {
  return describe('for navbar component >', () => {

    let rootScope: ng.IRootScopeService
    let compile: ng.ICompileService
    let component: NavbarComponentController
    let q: ng.IQService
    let bindings: INavbarComponentBindings
    const validHTML =
      '<navbar></navbar>'

    const userService = {
      getUser: () => {
        return q.resolve({})
      }
    }

    const window = {
      pageYOffset: 20,
    }

    const document = {
      bind: (_name: string, callback: (event: any) => void) => {
        callback({target: 'asdasd'})
      }
    }

    function create(html: string,  bindings: INavbarComponentBindings) {
      const parentScope = rootScope.$new()
      const parentBoundScope = angular.extend(parentScope, bindings)
      const elem = angular.element(html)
      const compiledElement = compile(elem)(parentBoundScope)
      parentBoundScope.$digest()
      return compiledElement
    }

    beforeEach(angular.mock.module(function ($provide: ng.auto.IProvideService) {
      $provide.value('apiUrl', 'awesomeUrl/')
    }))

    beforeEach(angular.mock.module(($provide: ng.auto.IProvideService) => {
      $provide.value('userService', userService)
      $provide.value('styleConstant', {})
      $provide.value('topAlertService', {})
      $provide.value('$window', window)
    }))

    beforeEach(() => {

      angular.mock.module(navbarModule)

      inject(($rootScope: ng.IRootScopeService, $compile: ng.ICompileService,
              $componentController: ng.IComponentControllerService, $q: ng.IQService) => {

        rootScope = $rootScope
        compile = $compile
        q = $q

        bindings = {
          searchModel: 'sdfsdf'
        }
        const injectors = {
          userService: userService,
          $element: create(validHTML, bindings),
          $document: document,
          $window: window
        }

        component = $componentController<NavbarComponentController, INavbarComponentBindings>(
          'navbar', injectors, bindings)
      })
    })

    it('should have a dummy test', inject(() => {
      expect(true).toBeTruthy()
    }))

    it('should compile the component', () => {
      const el = create(validHTML, bindings)
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
