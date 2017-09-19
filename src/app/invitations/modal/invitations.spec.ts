import * as angular from 'angular'
import IRootScopeService = profitelo.services.rootScope.IRootScopeService
import {IInvitationsModalScope, InvitationsModalController} from './invitations.controller'
import invitationsModalModule from './invitations'
import {InvitationApi, ProfileApi} from 'profitelo-api-ng/api/api'
import IQService = angular.IQService

describe('Testing Controller: InvitationsModal', () => {

  let controller: InvitationsModalController
  let scope: IInvitationsModalScope
  let $q: ng.IQService
  const state = <ng.ui.IStateService>{
    go: (_to: string): ng.IPromise<{}> => $q.resolve({})
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
  }))

  beforeEach(() => {
    angular.mock.module(invitationsModalModule)
    inject(($rootScope: IRootScopeService, $controller: ng.IControllerService, _$httpBackend_: ng.IHttpBackendService,
            InvitationApi: InvitationApi, _$q_: IQService, ProfileApi: ProfileApi) => {

      scope = <IInvitationsModalScope>$rootScope.$new()
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

  it('should uibModalInstance', () => {
    spyOn(state, 'go')
    spyOn(uibModalInstance, 'dismiss')
    controller.onModalClose()
    expect(uibModalInstance.dismiss).toHaveBeenCalledWith('cancel')
    expect(state.go).toHaveBeenCalledWith('app.home')
  })

})
