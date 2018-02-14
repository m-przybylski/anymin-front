import { GetExpertSueDetails } from 'profitelo-api-ng/model/models';

export interface IExpertIncomingCallParentControllerScope extends ng.IScope {
  rejectCall: ($uibModalInstance: ng.ui.bootstrap.IModalServiceInstance) => void;
  answerCall: ($uibModalInstance: ng.ui.bootstrap.IModalServiceInstance) => void;
  expertSueDetails: GetExpertSueDetails;
}

export interface IExpertIncomingCallControllerScope extends ng.IScope {
  rejectCall: () => void;
  answerCall: () => void;
  serviceName?: string;
  $parent: IExpertIncomingCallParentControllerScope;
}

export class ExpertIncomingCallController implements ng.IController {

  public static $inject = ['$scope', '$uibModalInstance'];

  public serviceName: string;

  private isClicked = false;

  constructor($scope: IExpertIncomingCallControllerScope,
              $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance) {

    $scope.serviceName = $scope.$parent.expertSueDetails.serviceName;

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
