import * as angular from 'angular'
import IRootScopeService = profitelo.services.rootScope.IRootScopeService
import {INoInvitationsModalScope, NoInvitationsModalController} from './no-invitations.controller'
import noInvitationsModalModule from './no-invitations'
describe('Testing Controller: noInvitationsModal', () => {

  let controller: NoInvitationsModalController
  let scope: INoInvitationsModalScope
  const uibModalInstance = {
    dismiss: () => {

    },
    close: () => {

    }
  }

  beforeEach(angular.mock.module(($provide: ng.auto.IProvideService) => {
    $provide.value('apiUrl', 'awesomeURL')
  }))

  beforeEach(() => {
    angular.mock.module(noInvitationsModalModule)
    inject(($rootScope: IRootScopeService, $controller: ng.IControllerService, _$httpBackend_: ng.IHttpBackendService) => {

      scope = <INoInvitationsModalScope>$rootScope.$new()

      controller = $controller<NoInvitationsModalController>('noInvitationsModal', {
        '$scope': scope,
        '$uibModalInstance': uibModalInstance,
        'httpBackend': _$httpBackend_
      })
    })
  })

  it('should exists', () => {
    return expect(!!controller).toBe(true)
  })

  it('should uibModalInstance', () => {
    spyOn(uibModalInstance, 'dismiss')
    controller.onModalClose()
    expect(uibModalInstance.dismiss).toHaveBeenCalledWith('cancel')
  })

})
