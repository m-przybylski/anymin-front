import * as angular from 'angular'
import {NavbarAvailbilityService} from './navbar-availbility.service'
import {PresenceApiMock} from 'profitelo-api-ng/api/api'
import navbarAvailbilityModule from './navbar-availbility'
import {ProfiteloWebsocketService} from '../../../services/profitelo-websocket/profitelo-websocket.service'
import {GetExpertVisibility} from 'profitelo-api-ng/model/GetExpertVisibility'
import {httpCodes} from '../../../classes/http-codes'

describe('Unit testing: profitelo.components.navbar.navbar-availbility-service >', () => {
  describe('for profitelo.components.navbar.navbar-availbility-service >', () => {

    let navbarAvailbilityService: NavbarAvailbilityService
    let rootScope: angular.IRootScopeService

    const profiteloWebsocket = jasmine.createSpyObj<ProfiteloWebsocketService>(
      'profiteloWebsocket', ['onExpertVisibilityUpdate'])

    beforeEach(() => {
      angular.mock.module(navbarAvailbilityModule)
    })

    beforeEach(angular.mock.module(($provide: ng.auto.IProvideService) => {
      $provide.value('apiUrl', 'awesomeUrl')
      $provide.value('profiteloWebsocket', profiteloWebsocket)
    }))

    beforeEach(inject(($injector: ng.auto.IInjectorService, $rootScope: angular.IRootScopeService) => {
      navbarAvailbilityService = $injector.get<NavbarAvailbilityService>('navbarAvailbilityService')
      rootScope = $rootScope
    }))

    it('should have a dummy test', () => {
      expect(true).toBeTruthy()
    })

    it('should invoke websocket service', () => {
      // const spy = jasmine.createSpy('changeVisibilityEvent')
			//
      // const response = {status: GetExpertVisibility.VisibilityEnum.Visible}
			//
      // spy.and.callFake(
      //   (callback: (data: IExpertPresenceUpdate) => void) =>
      //   callback(response)
      // )
			//
      // profiteloWebsocket.onExpertVisibilityUpdate.and.callFake(
      //   (callback: (data: IExpertPresenceUpdate) => void) =>
      //     callback(response)
      // )
      // rootScope.$digest()

      // expect(spy).toHaveBeenCalled()

      // expect(profiteloWebsocket.onExpertVisibilityUpdate).toHaveBeenCalledWith(spy)
    })

    it('should get a visible visibility', inject((PresenceApiMock: PresenceApiMock) => {
      const GetExpertVisibilityResponse = {visibility: GetExpertVisibility.VisibilityEnum.Visible}
      PresenceApiMock.expertVisibilityRoute(httpCodes.noContent, GetExpertVisibilityResponse)
      navbarAvailbilityService.getExpertVisibility().then(res => {
        expect(res).toEqual(GetExpertVisibilityResponse)
      })
    }))

    it('should get a visibility if promise was reject', inject((PresenceApiMock: PresenceApiMock) => {
      const GetExpertVisibilityResponse = {visibility: GetExpertVisibility.VisibilityEnum.Visible}
      PresenceApiMock.expertVisibilityRoute(404, GetExpertVisibilityResponse)
      navbarAvailbilityService.getExpertVisibility().catch(res => {
        expect(res).toThrowError()
      })
    }))





    // it('should get a visible visibility', inject((PresenceApiMock: PresenceApiMock) => {
    //   const spy = jasmine.createSpy()
    //   const GetExpertVisibilityResponse = {status: GetExpertVisibility.VisibilityEnum.Visible}
    //   // navbarAvailbilityService.onVisibilityChange(spy)
    //   expect(navbarAvailbilityService.onVisibilityChange).toHaveBeenCalledWith(spy)
    // }))






    it('should set a visible visibility', inject((PresenceApiMock: PresenceApiMock) => {
      const IExpertPresenceUpdateResponse = {status: GetExpertVisibility.VisibilityEnum.Visible}
      PresenceApiMock.expertVisibleRoute(httpCodes.noContent, IExpertPresenceUpdateResponse)
      navbarAvailbilityService.setExpertVisibile().then(res => {
        expect(res).toEqual(IExpertPresenceUpdateResponse)
      })
    }))

    it('should set a visible visibility if promise was reject', inject((PresenceApiMock: PresenceApiMock) => {
      const IExpertPresenceUpdateResponse = {status: GetExpertVisibility.VisibilityEnum.Visible}
      PresenceApiMock.expertVisibleRoute(httpCodes.notFound, IExpertPresenceUpdateResponse)
      navbarAvailbilityService.setExpertVisibile().catch(res => {
        expect(res).toThrowError()
      })
    }))

    it('should get a invisible visibility', inject((PresenceApiMock: PresenceApiMock) => {
      const IExpertPresenceUpdateResponse = {status: GetExpertVisibility.VisibilityEnum.Invisible}
      PresenceApiMock.expertInvisibleRoute(httpCodes.noContent, IExpertPresenceUpdateResponse)
      navbarAvailbilityService.setExpertInvisibile().then(res => {
        expect(res).toEqual(IExpertPresenceUpdateResponse)
      })
    }))

    it('should get a invisible visibility if promise was reject', inject((PresenceApiMock: PresenceApiMock) => {
      const IExpertPresenceUpdateResponse = {status: GetExpertVisibility.VisibilityEnum.Invisible}
      PresenceApiMock.expertInvisibleRoute(httpCodes.notFound, IExpertPresenceUpdateResponse)
      navbarAvailbilityService.setExpertInvisibile().catch(res => {
        expect(res).toThrowError()
      })
    }))

  })
})
