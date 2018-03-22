import * as angular from 'angular'
import {
  IGetServiceWithInvitationsAndTags, IInvitationsModalScope, InvitationsModalController
} from './invitations.controller'
import invitationsModalModule from './invitations'
import {
  GetProfileWithServicesInvitations, GetServiceTags
} from 'profitelo-api-ng/model/models'
import {InvitationApi, ProfileApi} from 'profitelo-api-ng/api/api'
import IQService = angular.IQService
import {NavbarNotificationsService} from
    '../../../common/components/navbar/navbar-notifications/navbar-notifications.service'
import navbarNotificationsModule from '../../../common/components/navbar/navbar-notifications/navbar-notifications'
import {IRootScopeService} from '../../../common/services/root-scope/root-scope.service';
import {GetInvitation} from 'profitelo-api-ng/model/GetInvitation'
import {Tag} from 'profitelo-api-ng/model/Tag'
import {TranslatorService} from "../../../common/services/translator/translator.service";


describe('Testing Controller: InvitationsModal', () => {

  let controller: InvitationsModalController
  let scope: IInvitationsModalScope
  let $q: ng.IQService
  const state = <any>{
    go: (_to: string): ng.IPromise<{}> => $q.resolve({}),
    current: {
      name: 'app.invitations'
    }
  }
  const uibModalInstance = {
    dismiss: (): void => {

    },
    close: (): void => {

    }
  }

  beforeEach(() => {
    angular.mock.module(invitationsModalModule)
    angular.mock.module(navbarNotificationsModule)
    angular.mock.module('pascalprecht.translate')
  })

  beforeEach(angular.mock.module(($provide: ng.auto.IProvideService) => {
    $provide.value('apiUrl', 'awesomeURL')
    $provide.value('InvitationApi', InvitationApi)
    $provide.value('ProfileApi', ProfileApi)
    $provide.value('navbarNotificationsServiceProvider', NavbarNotificationsService)
    $provide.value('normalizeTranslationKeyFilter', (x: string) => x)
    $provide.value('translateFilter', (x: string) => x)
  }))

  beforeEach(() => {
    inject(($rootScope: IRootScopeService, $controller: ng.IControllerService, _$httpBackend_: ng.IHttpBackendService,
            InvitationApi: InvitationApi, _$q_: IQService, ProfileApi: ProfileApi,
            translatorService: TranslatorService) => {

      scope = <IInvitationsModalScope>$rootScope.$new()
      scope.profileWithServicesInvitations = <GetProfileWithServicesInvitations>{
        id: '12121212'
      }
      $q = _$q_
      controller = $controller<InvitationsModalController>('invitationsModal', {
        $scope: scope,
        $uibModalInstance: uibModalInstance,
        httpBackend: _$httpBackend_,
        $state : state,
        InvitationApi,
        ProfileApi,
        translatorService,
        topAlertService: {}
      })
    })
  })

  it('should exists', () => {
    return expect(!!controller).toBe(true)
  })

  it('should close modal', () => {
    spyOn(state, 'go')
    spyOn(uibModalInstance, 'dismiss')
    controller.onModalClose()
    expect(uibModalInstance.dismiss).toHaveBeenCalledWith('cancel')
    expect(state.go).toHaveBeenCalledWith('app.home')
  })

  it('should get services tags', () => {
    const date = new Date()
    const services: IGetServiceWithInvitationsAndTags[] = [{
      id: 'serviceId123',
      ownerId: 'ownerId',
      name: 'name',
      description: 'descc',
      isFreelance: false,
      price: {
        amount: 123,
        currency: 'PLN'
      },
      isSuspended: false,
      language: 'PL',
      createdAt: date,
      tags: [],
      invitation: {
        id: 'id',
        serviceId: 'serviceId',
        serviceName: 'name',
        serviceOwnerId: 'ownerId',
        status: GetInvitation.StatusEnum.NEW,
        createdAt: date,
        updatedAt: date
      }
    }]
    const servicesTags: GetServiceTags[] = [{
      serviceId: 'serviceId123',
      tags: [{
          id: 'tagId',
          name: 'name',
          status: Tag.StatusEnum.ACCEPTED,
          persisted: false,
        }]
    }]
    expect(controller.getServicesTags(services, servicesTags)).toEqual([{
      id: 'serviceId123',
      ownerId: 'ownerId',
      name: 'name',
      description: 'descc',
      price: {
        amount: 123,
        currency: 'PLN'
      },
      isFreelance: false,
      isSuspended: false,
      language: 'PL',
      createdAt: date,
      tags: [{
        id: 'tagId',
        name: 'name',
        status: Tag.StatusEnum.ACCEPTED,
        persisted: false,
      }],
      invitation: {
        id: 'id',
        serviceId: 'serviceId',
        serviceName: 'name',
        serviceOwnerId: 'ownerId',
        status: GetInvitation.StatusEnum.NEW,
        createdAt: date,
        updatedAt: date
      }
    }])
  })

})
