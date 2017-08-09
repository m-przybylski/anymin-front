import {GetService} from 'profitelo-api-ng/model/models'

export interface IClientCallParentControllerScope extends ng.IScope {
  rejectCall: () => void
  answerCall: () => void
  service: GetService
}

export interface IClientCallControllerScope extends ng.IScope {
  rejectCall: () => void
  answerCall: () => void
  $parent: IClientCallParentControllerScope
}

export class ClientCallController implements ng.IController {

  public onModalClose = (): void =>
    this.$uibModalInstance.dismiss('cancel')

  /* @ngInject */
  constructor($scope: IClientCallControllerScope,
              private $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance) {

    $scope.rejectCall = (): void => {
      $uibModalInstance.dismiss('reject')
      $scope.$parent.rejectCall()
    }

    $scope.answerCall = (): void => {
      $uibModalInstance.close('answer')
      $scope.$parent.answerCall()
    }
  }
}
