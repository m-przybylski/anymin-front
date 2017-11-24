import * as angular from 'angular'
import {NavbarAvailbilityComponentController} from './navbar-availbility.controller'
import {PresenceApi} from 'profitelo-api-ng/api/api'
import {ProfiteloWebsocketService} from '../../../services/profitelo-websocket/profitelo-websocket.service'
import {NavbarAvailbilityComponentService} from './navbar-availbility.service'
import navbarAvailbilityModule from './navbar-availbility'
import {ErrorHandlerService} from '../../../services/error-handler/error-handler.service'

describe('Unit testing: navbar-logged-in-menu', () => {
  return describe('for navbar-availbility component >', () => {

    let rootScope: ng.IRootScopeService
    let compile: ng.ICompileService
    let component: NavbarAvailbilityComponentController
    let bindings: any
    let document: ng.IDocumentService
    const validHTML =
      '<navbar-availbility></navbar-availbility>'
    let navbarAvailbilityComponentService: NavbarAvailbilityComponentService
    let errorHandler: ErrorHandlerService

    function create(html: string, {}): JQuery {
      const parentScope = rootScope.$new()
      const parentBoundScope = angular.extend(parentScope, bindings)
      const elem = angular.element(html)
      const compiledElement = compile(elem)(parentBoundScope)
      parentBoundScope.$digest()
      return compiledElement
    }

    beforeEach(angular.mock.module(($provide: ng.auto.IProvideService) => {
      $provide.value('apiUrl', 'awesomeUrl/')
    }))

    beforeEach(() => {

      angular.mock.module(navbarAvailbilityModule)

      inject(($rootScope: ng.IRootScopeService, $compile: ng.ICompileService,
              $componentController: ng.IComponentControllerService,
              profiteloWebsocket: ProfiteloWebsocketService,
              _navbarAvailbilityComponentService_: NavbarAvailbilityComponentService,
              $q: ng.IQService,
              _errorHandler_: ErrorHandlerService,
              _$document_: ng.IDocumentService, PresenceApi: PresenceApi
      ) => {

        rootScope = $rootScope
        compile = $compile
        document = _$document_
        navbarAvailbilityComponentService = _navbarAvailbilityComponentService_
        errorHandler = _errorHandler_

        spyOn(navbarAvailbilityComponentService, 'getExpertVisibilityRoute').and.returnValue($q.resolve({}))

        bindings = {}
        const injectors = {
          $element: create(validHTML, bindings),
          $document: document,
          PresenceApi,
          errorHandler,
          navbarAvailbilityComponentService,
          profiteloWebsocket
        }

        component = $componentController<NavbarAvailbilityComponentController, {}>(
          'navbarAvailbility', injectors, bindings)
      })
    })

    it('should have a dummy test', inject(() => {
      expect(true).toBeTruthy()
    }))

    it('should compile the component', () => {
      const el = create(validHTML, bindings)
      expect(el.html()).toBeDefined(true)
    })

    it('should open dropdown ', () => {
      component.toggleButton()
      expect(component.isOpen).toBe(true)
    })

    it('should open and close dropdown ', () => {
      component.toggleButton()
      component.toggleButton()
      expect(component.isOpen).toBe(false)
    })

    it('should click on document and close availbility dropdown', () => {
      document.trigger('click')
      document.bind(event)
      rootScope.$digest()
      expect(component.isOpen).toBeFalsy()
    })

  })
})
