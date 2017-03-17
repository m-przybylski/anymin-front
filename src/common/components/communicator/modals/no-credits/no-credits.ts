namespace profitelo.components.communicator.modals.noCredits {

  export interface INoCreditsControllerParentScope extends ng.IScope {
    reject: () => void
    accept: () => void
  }

  export interface INoCreditsControllerScope extends ng.IScope {
    reject: () => void
    accept: () => void
    $parent: INoCreditsControllerParentScope
  }

  export class NoCreditsController implements ng.IController {

    /* @ngInject */
    constructor($scope: INoCreditsControllerScope,
                $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance) {

      $scope.reject = () => {
        $uibModalInstance.dismiss('cancel')
        $scope.$parent.reject()
      }

      $scope.accept = () => {
        $uibModalInstance.dismiss('cancel')
        $scope.$parent.accept()
      }
    }
  }

  angular.module('profitelo.components.communicator.modals.no-credits', [
    'ui.bootstrap',
    'profitelo.directives.interface.scrollable'
  ])
  .controller('noCreditsController', NoCreditsController)
}
