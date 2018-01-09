import * as angular from 'angular'
import {IInvitationsModalScope, InvitationsModalController} from './invitations.controller'
import invitationsModalModule from './invitations'
import {
  GetProfileWithServicesInvitations
} from 'profitelo-api-ng/model/models'
import {InvitationApi, ProfileApi} from 'profitelo-api-ng/api/api'
import IQService = angular.IQService
import {NavbarNotificationsService} from '../../../common/components/navbar/navbar-notifications/navbar-notifications.service'
import navbarNotificationsModule from '../../../common/components/navbar/navbar-notifications/navbar-notifications'
import {IRootScopeService} from '../../../common/services/root-scope/root-scope.service';

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

  beforeEach(angular.mock.module(($provide: ng.auto.IProvideService) => {
    $provide.value('apiUrl', 'awesomeURL')
    $provide.value('InvitationApi', InvitationApi)
    $provide.value('ProfileApi', ProfileApi)
    $provide.value('navbarNotificationsServiceProvider', NavbarNotificationsService)

  }))

  beforeEach(() => {
    angular.mock.module(invitationsModalModule)
    angular.mock.module(navbarNotificationsModule)
    inject(($rootScope: IRootScopeService, $controller: ng.IControllerService, _$httpBackend_: ng.IHttpBackendService,
            InvitationApi: InvitationApi, _$q_: IQService, ProfileApi: ProfileApi) => {

      scope = <IInvitationsModalScope>$rootScope.$new()
      scope.profileWithServicesInvitations = <GetProfileWithServicesInvitations>{
        id: '12121212'
      }
      $q = _$q_
      controller = $controller<InvitationsModalController>('invitationsModal', {
        '$scope': scope,
        '$uibModalInstance': uibModalInstance,
        'httpBackend': _$httpBackend_,
        '$state' : state,
        'InvitationApi': InvitationApi,
        'ProfileApi': ProfileApi
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

})
