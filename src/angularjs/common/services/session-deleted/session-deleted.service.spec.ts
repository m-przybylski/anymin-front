import * as angular from 'angular'
import sessionDeletedModule from './session-deleted'
import {ProfiteloWebsocketService} from '../profitelo-websocket/profitelo-websocket.service'
import {ISessionDeleted, SessionDeletedService} from './session-deleted.service'
import {GetSession} from 'profitelo-api-ng/model/models'
import {EventsService} from '../events/events.service'
import {SessionServiceWrapper} from '../session/session.service';

describe('Unit testing: profitelo.services.sessionDeletedService >', () => {
  describe('for profitelo.services.sessionDeletedService >', () => {

    const profiteloWebsocket = jasmine.createSpyObj<ProfiteloWebsocketService>(
      'profiteloWebsocket', ['onSessionDeleted'])
    const sessionServiceWrapper = jasmine.createSpyObj<SessionServiceWrapper>(
      'sessionService', ['getSession', 'onSuccessLogout'])
    const eventsService = jasmine.createSpyObj<EventsService>('eventsService', ['emit'])
    let sessionDeletedService: SessionDeletedService
    let sessionDeletedCallBack: (data: ISessionDeleted) => void | undefined

    beforeEach(() => {
      angular.mock.module(sessionDeletedModule)
    })

    beforeEach(angular.mock.module(($provide: ng.auto.IProvideService) => {
      $provide.value('profiteloWebsocket', profiteloWebsocket)
      $provide.value('sessionServiceWrapper', sessionServiceWrapper)
      $provide.value('eventsService', eventsService)
    }))

    beforeEach(inject(($injector: ng.auto.IInjectorService) => {
      profiteloWebsocket.onSessionDeleted.and.callFake(
        (callback: (data: ISessionDeleted) => void) => {
          sessionDeletedCallBack = callback
        })

      sessionDeletedService = $injector.get<SessionDeletedService>('sessionDeletedService')
    }))

    it('should have a dummy test', () => {
      expect(sessionDeletedService).toBeTruthy()
    })

    it('should not delete current session ', () => {
      inject(($q: ng.IQService, $rootScope: angular.IRootScopeService) => {
        const mockSession: GetSession = <any>{
          apiKey: '123456'
        }
        sessionServiceWrapper.getSession.and.callFake(() => $q.resolve(mockSession))
        sessionDeletedService.init()
        expect(sessionDeletedCallBack).toBeDefined()
        sessionDeletedCallBack({removedSessionApiKey: 'different api key'})
        $rootScope.$apply()
        expect(eventsService.emit).not.toHaveBeenCalledWith('remote-session-deleted')
      })
    })

    it('should delete current session ', () => {
      inject(($q: ng.IQService, $rootScope: angular.IRootScopeService) => {
        const mockSession: GetSession = <any>{
          apiKey: '123456'
        }
        sessionServiceWrapper.getSession.and.callFake(() => $q.resolve(mockSession))
        sessionDeletedService.init()
        expect(sessionDeletedCallBack).toBeDefined()
        sessionDeletedCallBack({removedSessionApiKey: mockSession.apiKey})
        $rootScope.$apply()
        expect(eventsService.emit).toHaveBeenCalledWith('remote-session-deleted')
      })
    })

    it('should display warn if session does not exist', () => {
      inject(($q: ng.IQService, $log: ng.ILogService, $rootScope: angular.IRootScopeService) => {
        spyOn($log, 'warn')
        sessionServiceWrapper.getSession.and.callFake(() => $q.reject())
        sessionDeletedService.init()
        expect(sessionDeletedCallBack).toBeDefined()
        sessionDeletedCallBack({removedSessionApiKey: 'different api key'})
        $rootScope.$apply()
        expect($log.warn).toHaveBeenCalled()
      })
    })

  })
})
