// tslint:disable:readonly-array
// tslint:disable:prefer-method-signature
// tslint:disable:deprecation
import * as angular from 'angular';

export interface INoCreditsControllerParentScope extends ng.IScope {
  reject: () => void;
  accept: () => void;
}

export interface INoCreditsControllerScope extends ng.IScope {
  reject: () => void;
  accept: () => void;
  $parent: INoCreditsControllerParentScope;
}

// tslint:disable:member-ordering
export class NoCreditsController implements ng.IController {

  public static $inject = ['$scope', '$uibModalInstance'];

    constructor($scope: INoCreditsControllerScope,
              $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance) {

    $scope.reject = (): void => {
      $uibModalInstance.dismiss('cancel');
      $scope.$parent.reject();
    };

    $scope.accept = (): void => {
      $uibModalInstance.dismiss('cancel');
      $scope.$parent.accept();
    };
  }
}

angular.module('profitelo.components.communicator.modals.no-credits', [
  'ui.bootstrap',
  'profitelo.directives.interface.scrollable'
])
  .controller('noCreditsController', NoCreditsController);
