import * as angular from 'angular'

import pendingInvitationModule from './pending-invitation';
import {PendingInvitationComponentController, IPendingInvitationComponentControllerScope}
  from './pending-invitation.controller'
import {ErrorHandlerService} from '../../../../../services/error-handler/error-handler.service'
import {TopAlertService} from '../../../../../services/top-alert/top-alert.service'
import {GetInvitation} from 'profitelo-api-ng/model/models';
import {InvitationApiMock} from 'profitelo-api-ng/api/api';
import {httpCodes} from '../../../../../classes/http-codes'
import { ModalsService } from '../../../../../services/modals/modals.service';

describe('Unit testing: profitelo.components.dashboard.expert.employees.pending-invitation', () =>
  describe('for pendingInvitation >', () => {

    let scope: IPendingInvitationComponentControllerScope
    let rootScope: ng.IRootScopeService
    let compile: ng.ICompileService
    let componentController: ng.IComponentControllerService
    let component: PendingInvitationComponentController
    let topAlertService: TopAlertService
    let InvitationApiMock: InvitationApiMock
    let modalsService: ModalsService
    const errorHandler: ErrorHandlerService = <ErrorHandlerService>{
      handleServerError: (_err: any, _logMessage: string): void => {}
    }
    let httpBackend: ng.IHttpBackendService

    const validHTML = '<pending-invitation data-invitations="invitations"></pending-invitation>'

    const invitations = [{
      id: 'id',
      serviceId: 'serviceId',
      serviceName: 'name',
      serviceOwnerId: 'ownerId',
      email: 'test@test.com',
      status: GetInvitation.StatusEnum.NEW,
      createdAt: new Date,
      updatedAt: new Date
    }]

    function create(html: string): JQuery {
      scope = <IPendingInvitationComponentControllerScope>rootScope.$new()
      scope.invitations = invitations
      const elem = angular.element(html)
      const compiledElement = compile(elem)(scope)
      scope.$digest()
      return compiledElement
    }

    beforeEach(angular.mock.module(($provide: ng.auto.IProvideService) => {
      $provide.value('apiUrl', 'awesomeUrl/')
      $provide.value('topAlertService', {})
      $provide.value('normalizeTranslationKeyFilter', (x: string) => x)
    }))

    beforeEach(() => {

      angular.mock.module(pendingInvitationModule)

      inject(($rootScope: any,
              $compile: ng.ICompileService,
              _$componentController_: ng.IComponentControllerService,
              _$httpBackend_: ng.IHttpBackendService,
              _topAlertService_: TopAlertService,
              _InvitationApiMock_: InvitationApiMock,
              _modalsService_: ModalsService ) => {
        componentController = _$componentController_
        rootScope = $rootScope.$new()
        compile = $compile
        httpBackend = _$httpBackend_
        topAlertService = _topAlertService_
        InvitationApiMock = _InvitationApiMock_
        modalsService = _modalsService_
      })

      component = componentController<PendingInvitationComponentController, {}>('pendingInvitation',
        {errorHandler}, {invitations})

    })

    it('should have a dummy test', inject(() => {
      expect(true).toBeTruthy()
    }))

    it('should compile the directive', () => {
      const el = create(validHTML)
      expect(el.html()).toBeDefined(true)
    })

    it('should show error when delete invitations failed', () => {
      spyOn(errorHandler, 'handleServerError')
      InvitationApiMock.deleteInvitationsRoute(httpCodes.notFound)
      spyOn(modalsService, 'createConfirmAlertModal').and.callFake((_msg: string, cb: () => void) => {
        cb();
      });
      component.deleteInvitations()
      httpBackend.flush()
      expect(errorHandler.handleServerError).toHaveBeenCalled()
    })

    it('should delete invitations', () => {
      spyOn(topAlertService, 'success')
      InvitationApiMock.deleteInvitationsRoute(httpCodes.ok, {invitationsIds: 'id'})
      spyOn(modalsService, 'createConfirmAlertModal').and.callFake((_msg: string, cb: () => void) => {
        cb();
      });
      component.deleteInvitations()
      httpBackend.flush()
      expect(topAlertService.success).toHaveBeenCalled()
    })

  })
)
