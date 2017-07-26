import * as angular from 'angular'
import {NavbarNotificationsComponentController} from './navbar-notifications.controller'
import navbarNotificationsModule from './navbar-notifications'
import {ProfileApiMock} from 'profitelo-api-ng/api/api'
import {INavbarNotificationsComponentBindings} from './navbar-notifications'
import {ModalsService} from '../../../services/modals/modals.service'

describe('Unit testing: navbarNotifications', () => {
  return describe('for navbarNotifications component >', () => {

    let rootScope: ng.IRootScopeService
    let compile: ng.ICompileService
    let component: NavbarNotificationsComponentController
    let bindings: INavbarNotificationsComponentBindings
    let ProfileApiMock: ProfileApiMock
    let httpBackend: ng.IHttpBackendService
    let q: ng.IQService
    const validHTML =
      '<navbar-notifications></navbar-notifications>'

    const userService = {
      getUser: (): ng.IPromise<{}> => {
        return q.resolve({})
      }
    }

    const state = <ng.ui.IStateService>{
      go: (_to: string): ng.IPromise<{}> => q.resolve({})
    }

    function create(html: string,  bindings: INavbarNotificationsComponentBindings): JQuery {
      const parentScope = rootScope.$new()
      const parentBoundScope = angular.extend(parentScope, bindings)
      const elem = angular.element(html)
      const compiledElement = compile(elem)(parentBoundScope)
      parentBoundScope.$digest()
      return compiledElement
    }

    beforeEach(angular.mock.module(($provide: ng.auto.IProvideService) => {
      $provide.value('userService', userService)
      $provide.value('apiUrl', 'awesomeUrl/')
      $provide.value('ProfileApi', ProfileApiMock)
      $provide.value('ProfileApiMock', ProfileApiMock)
      $provide.value('topAlertService', {})
    }))

    beforeEach(() => {

      angular.mock.module(navbarNotificationsModule)

      inject(($rootScope: ng.IRootScopeService, $compile: ng.ICompileService,
              $componentController: ng.IComponentControllerService, $q: ng.IQService,
              $httpBackend: ng.IHttpBackendService, _modalsService_: ModalsService,
              _ProfileApiMock_: ProfileApiMock) => {

        rootScope = $rootScope
        compile = $compile
        q = $q
        httpBackend = $httpBackend
        ProfileApiMock = _ProfileApiMock_
        bindings = {
          isNotificationsTab: true,
          isInvitationsTab: false,
          onClick: (): void => {}
        }

        const injectors = {
          userService: userService,
          $element: create(validHTML, bindings),
          modalService: _modalsService_,
          ProfileApi: ProfileApiMock,
          $state: state
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
