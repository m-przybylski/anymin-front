import * as angular from 'angular'
import {InvitationsResolver} from './invitations.resolver'
import invitationsPageModule from './invitations'
import {IInvitationsStateParams} from './invitations'
import {InvitationApi, InvitationApiMock, ProfileApiMock} from 'profitelo-api-ng/api/api';
import {IHttpBackendService} from 'angular'
import {UserService} from '../../common/services/user/user.service';
import {StateService} from '@uirouter/angularjs'

describe('Unit testing: profitelo.controller.invitations', () => {
  describe('for invitations resolver >', () => {

    let InvitationsResolver: InvitationsResolver
    let mockState: StateService
    let log: ng.ILogService
    let $httpBackend: ng.IHttpBackendService

    beforeEach(angular.mock.module(function ($provide: ng.auto.IProvideService): void {
      $provide.value('apiUrl', 'awesomeUrl/')
    }))

    beforeEach(() => {

      mockState = <any>{
        go: (): void => {
        }
      }

      angular.mock.module(invitationsPageModule, ($provide: ng.auto.IProvideService): void => {
        $provide.value('$state', mockState)
      })

      inject(($injector: ng.auto.IInjectorService) => {
        InvitationsResolver = $injector.get<InvitationsResolver>('invitationsResolver')
        $httpBackend = $injector.get<IHttpBackendService>('$httpBackend')
        log = $injector.get<ng.ILogService>('$log')
      })
    })

    it('should have resolve function', () => {
      expect(InvitationsResolver.resolve).toBeDefined()
    })

    it('should redirect to home page if token does not exist', () => {
      spyOn(mockState, 'go')
      InvitationsResolver.resolve(<IInvitationsStateParams>{})
      expect(mockState.go).toHaveBeenCalledWith('app.home')
    })

    it('should resolve', inject((InvitationApi: InvitationApi) => {
      spyOn(InvitationApi, 'getInvitationRoute').and.callThrough()
      InvitationsResolver.resolve(<any>{token: 'token', companyId: 'id'})
      expect(InvitationApi.getInvitationRoute).toHaveBeenCalledWith('token')
    }))

    it('should redirect to home page when not get invitation',
      inject((InvitationApiMock: InvitationApiMock) => {
      spyOn(mockState, 'go')
      InvitationApiMock.getInvitationRoute(404, 'token')
      InvitationsResolver.resolve(<any>{token: 'token', companyId: 'id'})
      $httpBackend.flush()
      expect(mockState.go).toHaveBeenCalledWith('app.home')
    }))

    it('should log error',
      inject((InvitationApiMock: InvitationApiMock) => {
        spyOn(log, 'error')
        InvitationApiMock.getInvitationRoute(500, 'token')
        InvitationsResolver.resolve(<any>{token: 'token', companyId: 'id'})
        $httpBackend.flush()
        expect(log.error).toHaveBeenCalled()
      }))

    it('should log error when not get profile invitations', inject((InvitationApi: InvitationApi,
                                  userService: UserService,
                                  ProfileApiMock: ProfileApiMock,
                                  $q: ng.IQService) => {
      spyOn(log, 'error')
      spyOn(InvitationApi, 'getInvitationRoute').and.callFake(() => $q.resolve({}))
      spyOn(userService, 'getUser').and.callFake(() => $q.resolve({}))
      ProfileApiMock.getProfilesInvitationsRoute(404)
      InvitationsResolver.resolve(<any>{token: 'token', companyId: 'id'})
      $httpBackend.flush()
      expect(log.error).toHaveBeenCalled()
    }))

  })
})
