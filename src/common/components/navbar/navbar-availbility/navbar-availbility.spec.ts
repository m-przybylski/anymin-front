import * as angular from 'angular'
import {NavbarAvailbilityComponentController} from './navbar-availbility.controller'
import {PresenceApi} from 'profitelo-api-ng/api/api'
import {ProfiteloWebsocketService} from '../../../services/profitelo-websocket/profitelo-websocket.service'
import {NavbarAvailbilityService} from './navbar-availbility.service'
import navbarAvailbilityModule from './navbar-availbility'
import {ErrorHandlerService} from '../../../services/error-handler/error-handler.service'
import profiteloWebsocketModule from '../../../services/profitelo-websocket/profitelo-websocket'
import {PresenceApiMock} from 'profitelo-api-ng/api/PresenceApi'
import {GetExpertVisibility} from 'profitelo-api-ng/model/GetExpertVisibility'
import {CallbacksService} from '../../../services/callbacks/callbacks.service'

describe('Unit testing: navbar-availbility', () => {
  return describe('for navbar-availbility component >', () => {

    let rootScope: ng.IRootScopeService
    let compile: ng.ICompileService
    let component: NavbarAvailbilityComponentController
    let bindings: any
    let document: ng.IDocumentService
    const validHTML =
      '<navbar-availbility></navbar-availbility>'
    let errorHandler: ErrorHandlerService

    let presenceApiMock: PresenceApiMock

    let navbarAvailbilityService: any = {
    }
    let $httpBackend: ng.IHttpBackendService

    const callbacksFactory: any = {
      getInstance: (keys: string[]): CallbacksService => {
        return new CallbacksService(this.$timeout, keys)
      }
    }

    function create(html: string, {}): JQuery {
      const parentScope = rootScope.$new()
      const parentBoundScope = angular.extend(parentScope, bindings)
      const elem = angular.element(html)
      const compiledElement = compile(elem)(parentBoundScope)
      parentBoundScope.$digest()
      return compiledElement
    }

    beforeEach(angular.mock.module(($provide: ng.auto.IProvideService) => {
      $provide.value('apiUrl', 'awesomeUrl')
      $provide.value('navbarAvailbilityService', NavbarAvailbilityService)
      $provide.value('normalizeTranslationKeyFilter', (x: string) => x)
      $provide.value('presenceApiMock', PresenceApiMock)
      $provide.value('callbacksService', CallbacksService)
      $provide.value('callbacksFactory', callbacksFactory)
    }))

    beforeEach(() => {
      angular.mock.module(navbarAvailbilityModule)
      angular.mock.module(profiteloWebsocketModule)

      inject(($rootScope: ng.IRootScopeService,
              $compile: ng.ICompileService,
              $componentController: ng.IComponentControllerService,
              profiteloWebsocket: ProfiteloWebsocketService,
              _navbarAvailbilityService_: NavbarAvailbilityService,
              _errorHandler_: ErrorHandlerService,
              _$httpBackend_: ng.IHttpBackendService,
              _$document_: ng.IDocumentService,
              _PresenceApiMock_: PresenceApiMock) => {

        rootScope = $rootScope
        compile = $compile
        document = _$document_
        navbarAvailbilityService = _navbarAvailbilityService_
        errorHandler = _errorHandler_
        presenceApiMock = _PresenceApiMock_
        $httpBackend = _$httpBackend_

        presenceApiMock.expertVisibilityRoute(200, {visibility: GetExpertVisibility.VisibilityEnum.Visible})

        bindings = {}

        const injectors = {
          $element: create(validHTML, bindings),
          $document: document,
          PresenceApi,
          errorHandler,
          navbarAvailbilityService,
          profiteloWebsocket,
          presenceApiMock
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

    it('should open and close dropdown unclick on document', () => {
      component.toggleButton()
      const el = create(validHTML, bindings)
      el.trigger('click')
      el.bind(event)
      rootScope.$digest()
      expect(component.isOpen).toBe(true)
    })

    it('should open and close dropdown unclick on document', () => {
      document.trigger('click')
      document.bind(event)
      rootScope.$digest()
      expect(component.isOpen).toBe(false)
    })

    it('should change visibility on visible', () => {
      component.selectVisibleOption()
      presenceApiMock.expertVisibleRoute(204, {visibility: GetExpertVisibility.VisibilityEnum.Visible})
      navbarAvailbilityService.getExpertVisibility().then(() => {
        expect(component.isVisiblePresentsChecked).toBe(true)
      })
      $httpBackend.flush()
    })

    it('should change visibility on visible when error', () => {
      component.selectVisibleOption()
      spyOn(errorHandler, 'handleServerError')
      presenceApiMock.expertVisibleRoute(404)
      navbarAvailbilityService.getExpertVisibility().catch(() => {
        expect(component.isVisiblePresentsChecked).toBe(false)
      })
      $httpBackend.flush()
      expect(errorHandler.handleServerError).toHaveBeenCalled()
    })

    it('should change visibility on invisible', () => {
      component.selectInvisibleOption()
      presenceApiMock.expertInvisibleRoute(204, {visibility: GetExpertVisibility.VisibilityEnum.Invisible})
      navbarAvailbilityService.getExpertInvisibility().then(() => {
        expect(component.isVisiblePresentsChecked).toBe(false)
      })
      $httpBackend.flush()
    })

    it('should change visibility on invisible when error', () => {
      presenceApiMock.expertVisibilityRoute(200, {visibility: GetExpertVisibility.VisibilityEnum.Invisible})

      spyOn(errorHandler, 'handleServerError')

      component.selectInvisibleOption()
      presenceApiMock.expertInvisibleRoute(404)
      navbarAvailbilityService.getExpertInvisibility().catch(() => {
        expect(component.isVisiblePresentsChecked).toBe(false)
      })
      $httpBackend.flush()
      expect(errorHandler.handleServerError).toHaveBeenCalled()
    })
  })
})
