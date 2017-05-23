import * as angular from 'angular'
import {NavbarNotificationsComponentController} from './navbar-notifications.controller'
import navbarNotificationsModule from './navbar-notifications'
import {INavbarNotificationsComponentBindings} from './navbar-notifications'
import {ModalsService} from '../../../services/modals/modals.service'

describe('Unit testing: navbarNotifications', () => {
  return describe('for navbarNotifications component >', () => {

    let rootScope: ng.IRootScopeService
    let compile: ng.ICompileService
    let component: NavbarNotificationsComponentController
    let bindings: INavbarNotificationsComponentBindings
    let q: ng.IQService
    const validHTML =
      '<navbar-notifications></navbar-notifications>'

    const userService = {
      getUser: () => {
        return q.resolve({})
      }
    }

    function create(html: string,  bindings: INavbarNotificationsComponentBindings) {
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

      angular.mock.module(navbarNotificationsModule)

      inject(($rootScope: ng.IRootScopeService, $compile: ng.ICompileService,
              $componentController: ng.IComponentControllerService, $q: ng.IQService,
              _modalsService_: ModalsService) => {

        rootScope = $rootScope
        compile = $compile
        q = $q

        bindings = {
          isNotificationsTab: true,
          isInvitationsTab: false,
          onClick: () => {}
        }

        const injectors = {
          userService: userService,
          $element: create(validHTML, bindings),
          modalServie: _modalsService_
        }

        component = $componentController<NavbarNotificationsComponentController, INavbarNotificationsComponentBindings>(
          'navbarNotifications', injectors, bindings)
      })
    })

    it('should have a dummy test', inject(() => {
      expect(true).toBeTruthy()
    }))

    it('should compile the component', () => {
      const el = create(validHTML, bindings)
      expect(el.html()).toBeDefined(true)
    })

    it('should show notifications', inject(() => {
      component.showNotifications()
      expect(component.isNotificationsTab).toBe(true)
      expect(component.isInvitationsTab).toBe(false)
    }))

    it('should show invitations', inject(() => {
      component.showInvitations()
      expect(component.isNotificationsTab).toBe(false)
      expect(component.isInvitationsTab).toBe(true)
      expect(component.areInvitationsDisplayed).toBe(true)
    }))

    it('should open modal', inject((modalsService: ModalsService) => {
      spyOn(modalsService, 'createInvitationsModal')
      component.openNotificationDescriptions()
      expect(modalsService.createInvitationsModal).toHaveBeenCalled()
    }))

    it('should call onClick function', inject(() => {
      spyOn(component, 'onClick')
      component.buttonCallback()
      expect(component.onClick).toHaveBeenCalled()
    }))

  })
})
