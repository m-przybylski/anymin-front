import * as angular from 'angular'
import {NavbarLoggedInMenuComponentController} from './navbar-logged-in-menu.controller'
import {INavbarLoggedInMenuComponentBindings, default as navbarLoggedInMenuModule} from './navbar-logged-in-menu'
import {ProfileApiMock} from 'profitelo-api-ng/api/api'
import navbarAvailbilityModule from '../navbar-availbility/navbar-availbility'

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
      getUser: (): ng.IPromise<{}> => {
        return q.resolve({})
      }
    }

    function create(html: string,  bindings: INavbarLoggedInMenuComponentBindings): JQuery {
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
      $provide.value('apiUrl', 'awesomeUrl/')
    }))

    beforeEach(() => {

      angular.mock.module(navbarLoggedInMenuModule)
      angular.mock.module(navbarAvailbilityModule)

      inject(($rootScope: ng.IRootScopeService, $compile: ng.ICompileService,
              $componentController: ng.IComponentControllerService, $q: ng.IQService,
              _$document_: ng.IDocumentService, ProfileApiMock: ProfileApiMock) => {

        rootScope = $rootScope
        compile = $compile
        q = $q
        document = _$document_

        bindings = {
        }
        const injectors = {
          userService: userService,
          $element: create(validHTML, bindings),
          $document: document,
          ProfileApi: ProfileApiMock
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
      expect(component.isAnyMenuShow).toBe(true)
    })

    it('should show help menu', () => {
      component.toggleHelpMenuShow()
      expect(component.isHelpMenuShow).toBe(true)
      expect(component.isNotificationsMenuShow).toBe(false)
      expect(component.isAnyMenuShow).toBe(true)
    })

  })
})
