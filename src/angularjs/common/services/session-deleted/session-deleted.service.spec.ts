import * as angular from 'angular'
import sessionDeletedModule from './session-deleted'
import {ProfiteloWebsocketService} from '../profitelo-websocket/profitelo-websocket.service'
import {ISessionDeleted, SessionDeletedService} from './session-deleted.service'
import {EventsService} from '../events/events.service'
import {SessionServiceWrapper} from '../session/session.service';
import { GetSessionWithAccount } from '@anymind-ng/api/model/getSessionWithAccount';

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
        const mockSession: GetSessionWithAccount = {
          account: {
            id: 'id',
            msisdn: '+48555555555',
            registeredAt: new Date(),
            isBlocked: false,
            hasPassword: true,
            isClientCompany: true,
            isCompany: true,
            isExpert: true,
            doesMsisdnMatchCountry: true,
            hasMobilePin: true,
            settings: {
              isAnonymous: false
            },
            currency: 'PLN',
            countryISO: 'pl',
            protectedViews: ['']
          },
          session: {
            accountId: 'id',
            apiKey: 'apiKey',
            ipAddress: '0.0.0.0',
            isExpired: false,
            lastActivityAt: new Date()
          }
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
        const mockSession: GetSessionWithAccount = {
          account: {
            id: 'id',
            msisdn: '+48555555555',
            registeredAt: new Date(),
            isBlocked: false,
            hasPassword: true,
            isClientCompany: true,
            isCompany: true,
            isExpert: true,
            doesMsisdnMatchCountry: true,
            hasMobilePin: true,
            settings: {
              isAnonymous: false
            },
            currency: 'PLN',
            countryISO: 'pl',
            protectedViews: ['']
          },
          session: {
            accountId: 'id',
            apiKey: 'apiKey',
            ipAddress: '0.0.0.0',
            isExpired: false,
            lastActivityAt: new Date()
          }
        }
        sessionServiceWrapper.getSession.and.callFake(() => $q.resolve(mockSession))
        sessionDeletedService.init()
        expect(sessionDeletedCallBack).toBeDefined()
        sessionDeletedCallBack({removedSessionApiKey: mockSession.session.apiKey})
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
