import * as angular from 'angular'
import IRootScopeService = profitelo.services.rootScope.IRootScopeService
import {IInvitationsModalScope, InvitationsModalController} from './invitations.controller'
import invitationsModalModule from './invitations'
import {EmploymentApi} from 'profitelo-api-ng/api/api'
import IQService = angular.IQService
import {IPromise} from 'angular'
describe('Testing Controller: InvitationsModal', () => {

  let controller: InvitationsModalController
  let scope: IInvitationsModalScope
  let $q: ng.IQService
  const state = <ng.ui.IStateService>{
    go: (_to: string): IPromise<{}> => $q.resolve({})
  }
  const uibModalInstance = {
    dismiss: (): void => {

    },
    close: (): void => {

    }
  }

  beforeEach(angular.mock.module(($provide: ng.auto.IProvideService) => {
    $provide.value('apiUrl', 'awesomeURL')
    $provide.value('EmploymentApi', EmploymentApi)
  }))

  beforeEach(() => {
    angular.mock.module(invitationsModalModule)
    inject(($rootScope: IRootScopeService, $controller: ng.IControllerService, _$httpBackend_: ng.IHttpBackendService,
            EmploymentApi: EmploymentApi, _$q_: IQService) => {

      scope = <IInvitationsModalScope>$rootScope.$new()
      $q = _$q_
      controller = $controller<InvitationsModalController>('invitationsModal', {
        '$scope': scope,
        '$uibModalInstance': uibModalInstance,
        'httpBackend': _$httpBackend_,
        '$state' : state,
        'EmploymentApi': EmploymentApi
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
