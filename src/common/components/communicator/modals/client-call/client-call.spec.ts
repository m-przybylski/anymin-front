import * as angular from 'angular'
import IRootScopeService = profitelo.services.rootScope.IRootScopeService
import {IClientCallControllerScope, ClientCallController, IClientCallParentControllerScope} from './client-call'

describe('Testing Controller: clientCallController', () => {

  let controller: ClientCallController
  let scope: IClientCallControllerScope

  const $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance =
    jasmine.createSpyObj('$uibModalInstance', ['close', 'dismiss']);

  beforeEach(() => {
    angular.mock.module('ui.bootstrap')
    angular.mock.module('profitelo.components.communicator.modals.client-call')
    inject(($rootScope: IRootScopeService, $controller: ng.IControllerService) => {

      scope = <IClientCallControllerScope>$rootScope.$new()
      scope.$parent = <IClientCallParentControllerScope>$rootScope.$new()
      scope.$parent.rejectCall = () => {
      }
      scope.$parent.answerCall = () => {
      }

      const injectors = {
        $scope: scope,
        $uibModalInstance: $uibModalInstance
      }

      controller = $controller<ClientCallController>('clientCallController', injectors)
    })
  })

  it('should exists', () => {
    return expect(!!controller).toBe(true)
  })

  it('should have rejectCall function', inject(() => {

    spyOn(scope.$parent, 'rejectCall')

    scope.rejectCall()

    expect($uibModalInstance.dismiss).toHaveBeenCalledWith('reject')
    expect(scope.$parent.rejectCall).toHaveBeenCalled()
  }))
})
