import * as angular from 'angular'

import {
  ExpertIncomingCallController, IExpertIncomingCallControllerScope, IExpertIncomingCallParentControllerScope
} from './expert-incoming-call.controller'

describe('Testing Controller: expertIncomingCall', () => {

  let controller: ExpertIncomingCallController
  let scope: IExpertIncomingCallControllerScope

  const $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance =
    jasmine.createSpyObj('$uibModalInstance', ['close', 'dismiss']);

  beforeEach(() => {
    angular.mock.module('ui.bootstrap')
    angular.mock.module('profitelo.components.communicator.modals.expert-incoming-call')
    inject(($rootScope: any, $controller: ng.IControllerService) => {

      scope = <IExpertIncomingCallControllerScope>$rootScope.$new()
      scope.$parent = <IExpertIncomingCallParentControllerScope>$rootScope.$new()
      scope.$parent.rejectCall = (): void => {
      }
      scope.$parent.answerCall = (): void => {
      }

      const injectors = {
        $scope: scope,
        $uibModalInstance: $uibModalInstance
      }

      controller = $controller<ExpertIncomingCallController>('expertIncomingCall', injectors)
    })
  })

  it('should exists', () => {
    return expect(!!controller).toBe(true)
  })

  it('should have rejectCall function', inject(() => {

    spyOn(scope.$parent, 'rejectCall')

    scope.rejectCall()

    expect(scope.$parent.rejectCall).toHaveBeenCalledWith($uibModalInstance)
  }))
})
