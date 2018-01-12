import {GetService} from 'profitelo-api-ng/model/models'

export interface IExpertIncomingCallParentControllerScope extends ng.IScope {
  rejectCall: () => void
  answerCall: () => void
  service: GetService
}

export interface IExpertIncomingCallControllerScope extends ng.IScope {
  rejectCall: () => void
  answerCall: () => void
  $parent: IExpertIncomingCallParentControllerScope
}

export class ExpertIncomingCallController implements ng.IController {

  public onModalClose = (): void =>
    this.$uibModalInstance.dismiss('cancel')

  static $inject = ['$scope', '$uibModalInstance'];

    constructor($scope: IExpertIncomingCallControllerScope,
              private $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance) {

    $scope.rejectCall = (): void => {
      $uibModalInstance.dismiss('reject')
      $scope.$parent.rejectCall()
    }

    $scope.answerCall = (): void => {
      $scope.$parent.answerCall()
    }
  }
}
