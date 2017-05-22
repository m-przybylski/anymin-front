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
    let document: ng.IDocumentService
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
      $provide.value('styleConstant', {})
    }))

    beforeEach(() => {

      angular.mock.module(navbarLoggedInMenuModule)

      inject(($rootScope: ng.IRootScopeService, $compile: ng.ICompileService,
              $componentController: ng.IComponentControllerService, $q: ng.IQService,
              _$document_: ng.IDocumentService) => {

        rootScope = $rootScope
        compile = $compile
        q = $q
        document = _$document_

        bindings = {
        }
        const injectors = {
          userService: userService,
          $element: create(validHTML, bindings),
          $document: document
        }

        component = $componentController<NavbarLoggedInMenuComponentController, INavbarLoggedInMenuComponentBindings>(
          'navbarLoggedInMenu', injectors, bindings)
      })
    })

    it('should have a dummy test', inject(() => {
      expect(true).toBeTruthy()
    }))

    it('should compile the component', () => {
      const el = create(validHTML, bindings)
      expect(el.html()).toBeDefined(true)
    })

    it('should show notifications tab', () => {
      component.toggleNotificationsTabShow()
      expect(component.isNotificationsMenuShow).toBe(true)
      expect(component.areNotificationsDisplayed).toBe(true)
      expect(component.isNotificationsTab).toBe(true)
      expect(component.isInvitationsTab).toBe(false)
    })

    it('should show invitations tab', () => {
      component.toggleInvitationsTabShow()
      expect(component.isNotificationsMenuShow).toBe(true)
      expect(component.areInvitationsDisplayed).toBe(true)
      expect(component.isNotificationsTab).toBe(false)
      expect(component.isInvitationsTab).toBe(true)
    })

    it('should show notifications menu', () => {
      component.toggleNotificationsMenuShow()
      expect(component.isNotificationsMenuShow).toBe(true)
    })

  })
})
