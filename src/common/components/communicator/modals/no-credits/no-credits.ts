namespace profitelo.components.communicator.modals.noCredits {

  interface NoCreditsControllerParentScope extends ng.IScope {
    reject: Function
    accept: Function
  }

  interface NoCreditsControllerScope extends ng.IScope {
    reject: Function
    accept: Function
    $parent: NoCreditsControllerParentScope
  }

  class NoCreditsController {

    /* @ngInject */
    constructor(private $scope: NoCreditsControllerScope,
                private $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance) {

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
    'ui.bootstrap'
  ])
  .controller('noCreditsController', NoCreditsController)
}