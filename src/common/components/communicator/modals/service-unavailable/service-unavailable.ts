namespace profitelo.components.communicator.modals.serviceUnavailable {

  export interface IUnavailableServiceControllerParentScope extends ng.IScope {
    accept: Function
    reject: Function
  }

  export interface IUnavailableServiceControllerScope extends ng.IScope {
    reject: Function
    accept: Function
    $parent: IUnavailableServiceControllerParentScope
  }

  export class UnavailableServiceController implements ng.IController {

    /* @ngInject */
    constructor($scope: IUnavailableServiceControllerScope,
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

  angular.module('profitelo.components.communicator.modals.service-unavailable', [
    'ui.bootstrap',
    'profitelo.directives.interface.scrollable'
  ])
  .controller('unavailableServiceController', UnavailableServiceController)
}
