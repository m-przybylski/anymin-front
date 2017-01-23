module profitelo.components.communicator.modals.serviceUnavailable {

  interface IUnavailableServiceControllerParentScope {
    accept: Function
    reject: Function
  }

  interface IUnavailableServiceControllerScope {
    reject: Function
    accept: Function
    $parent: IUnavailableServiceControllerParentScope
  }

  class UnavailableServiceController {

    /* @ngInject */
    constructor(private $scope: IUnavailableServiceControllerScope,
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

  angular.module('profitelo.components.communicator.modals.service-unavailable', [
    'ui.bootstrap'
  ])
  .controller('unavailableServiceController', UnavailableServiceController)
}