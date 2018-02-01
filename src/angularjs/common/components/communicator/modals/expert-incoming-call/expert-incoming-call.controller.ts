import { GetService } from 'profitelo-api-ng/model/models';

export interface IExpertIncomingCallParentControllerScope extends ng.IScope {
  rejectCall: ($uibModalInstance: ng.ui.bootstrap.IModalServiceInstance) => void;
  answerCall: ($uibModalInstance: ng.ui.bootstrap.IModalServiceInstance) => void;
  service: GetService;
}

export interface IExpertIncomingCallControllerScope extends ng.IScope {
  rejectCall: () => void;
  answerCall: () => void;
  $parent: IExpertIncomingCallParentControllerScope;
}

export class ExpertIncomingCallController implements ng.IController {

  public static $inject = ['$scope', '$uibModalInstance'];

  private isClicked = false;

  constructor($scope: IExpertIncomingCallControllerScope,
              $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance) {

    $scope.rejectCall = (): void => {
      if (!this.isClicked) {
        this.isClicked = true;
        $scope.$parent.rejectCall($uibModalInstance);
      }
    };

    $scope.answerCall = (): void => {
      if (!this.isClicked) {
        this.isClicked = true;
        $scope.$parent.answerCall($uibModalInstance);
      }
    };
  }
}
