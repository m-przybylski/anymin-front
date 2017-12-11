import * as angular from 'angular'
import {PresenceApiMock} from 'profitelo-api-ng/api/api'
import navbarExperetVisibilityModule from './navbar-expert-visibility'
import {ProfiteloWebsocketService} from '../../../services/profitelo-websocket/profitelo-websocket.service'
import {GetExpertVisibility} from 'profitelo-api-ng/model/GetExpertVisibility'
import {httpCodes} from '../../../classes/http-codes'
import {
  IExpertPresenceUpdate, NavbarExpertVisibilityService
} from './navbar-expert-visibility.service'

describe('Unit testing: profitelo.components.navbar.navbar-expert-visibility-service >', () => {
  describe('for profitelo.components.navbar.navbar-expert-visibility-service >', () => {

    let navbarExpertVisibilityService: NavbarExpertVisibilityService
    let rootScope: angular.IRootScopeService
    let expertVisibilityUpdateCallback: (data: IExpertPresenceUpdate) => void | undefined
    let addEventListenerCallback: () => void | undefined

    const profiteloWebsocket = jasmine.createSpyObj<ProfiteloWebsocketService>(
      'profiteloWebsocket', ['onExpertVisibilityUpdate'])

    const windowMock = jasmine.createSpyObj<ng.IWindowService>('$window', ['addEventListener'])

    beforeEach(() => {
      angular.mock.module(navbarExperetVisibilityModule)
    })

    beforeEach(angular.mock.module(($provide: ng.auto.IProvideService) => {
      $provide.value('apiUrl', 'awesomeUrl')
      $provide.value('profiteloWebsocket', profiteloWebsocket)
      $provide.value('$window', windowMock)
    }))

    beforeEach(inject(($injector: ng.auto.IInjectorService, $rootScope: angular.IRootScopeService) => {
      profiteloWebsocket.onExpertVisibilityUpdate.and.callFake(
        (callback: (data: IExpertPresenceUpdate) => void) => {
          expertVisibilityUpdateCallback = callback
        })

      windowMock.addEventListener.and.callFake(
        (_name: string, cb: () => void) => {
          addEventListenerCallback = cb
        }
      )

      navbarExpertVisibilityService = $injector.get<NavbarExpertVisibilityService>('navbarExpertVisibilityService')
      rootScope = $rootScope
    }))

    it('should have a dummy test', () => {
      expect(true).toBeTruthy()
    })

    it('should handle websocket visibility update', () => {
      const spy = jasmine.createSpy('notifyVisibilityChange')
      navbarExpertVisibilityService.onVisibilityUpdate(spy)
      const response = {status: GetExpertVisibility.VisibilityEnum.Visible}
      expect(expertVisibilityUpdateCallback).toBeDefined()
      expertVisibilityUpdateCallback(response);
      expect(spy).toHaveBeenCalledWith(response)
    })

    it('should get a visible visibility', (done) => {
      inject((PresenceApiMock: PresenceApiMock, $httpBackend: ng.IHttpBackendService) => {
        const GetExpertVisibilityResponse = {visibility: GetExpertVisibility.VisibilityEnum.Visible}
        PresenceApiMock.expertVisibilityRoute(httpCodes.noContent, GetExpertVisibilityResponse)

        navbarExpertVisibilityService.getExpertVisibility().then((res) => {
          expect(res).toEqual(GetExpertVisibilityResponse)
          done()
        })

        $httpBackend.flush()
      })
    })

    it('should get a visibility after reconnect', () => {
      inject((PresenceApiMock: PresenceApiMock, $httpBackend: ng.IHttpBackendService) => {
        const spy = jasmine.createSpy('notifyVisibilityChange')
        navbarExpertVisibilityService.onVisibilityUpdate(spy)

        const GetExpertVisibilityResponse = {visibility: GetExpertVisibility.VisibilityEnum.Visible}
        PresenceApiMock.expertVisibilityRoute(httpCodes.ok, GetExpertVisibilityResponse)
        addEventListenerCallback()
        $httpBackend.flush()

        const response = {status: GetExpertVisibility.VisibilityEnum.Visible}
        expect(spy).toHaveBeenCalledWith(response)
      })
    })

    it('should set a visible visibility', (done) => {
      inject((PresenceApiMock: PresenceApiMock, $httpBackend: ng.IHttpBackendService) => {
        const IExpertPresenceUpdateResponse = {status: GetExpertVisibility.VisibilityEnum.Visible}
        PresenceApiMock.expertVisibleRoute(httpCodes.noContent, IExpertPresenceUpdateResponse)
        navbarExpertVisibilityService.setExpertVisibile().then(res => {
          expect(res).toEqual(IExpertPresenceUpdateResponse)
          done()
        })
        $httpBackend.flush()
      })
    })

    it('should set a visible visibility if promise was reject', (done) => {
      inject((PresenceApiMock: PresenceApiMock, $httpBackend: ng.IHttpBackendService) => {
        PresenceApiMock.expertVisibleRoute(httpCodes.notFound)

        navbarExpertVisibilityService.setExpertVisibile().catch(error => {
          expect(error.data).toBe(undefined)
          expect(error.status).toBe(httpCodes.notFound)
          done()
        })
        $httpBackend.flush()
      })
    })

    it('should get a invisible visibility', (done) => {
      inject((PresenceApiMock: PresenceApiMock, $httpBackend: ng.IHttpBackendService) => {
        const IExpertPresenceUpdateResponse = {status: GetExpertVisibility.VisibilityEnum.Invisible}
        PresenceApiMock.expertInvisibleRoute(httpCodes.noContent, IExpertPresenceUpdateResponse)
        navbarExpertVisibilityService.setExpertInvisibile().then(res => {
          expect(res).toEqual(IExpertPresenceUpdateResponse)
          done()
        })
        $httpBackend.flush()
      })
    })

    it('should get a invisible visibility if promise was reject', (done) => {
      inject((PresenceApiMock: PresenceApiMock, $httpBackend: ng.IHttpBackendService) => {
        PresenceApiMock.expertInvisibleRoute(httpCodes.notFound)
        navbarExpertVisibilityService.setExpertInvisibile().catch(error => {
          expect(error.data).toEqual(undefined)
          expect(error.status).toBe(httpCodes.notFound)
          done()
        })
        $httpBackend.flush()
      })
    })
  })
})
