(function() {

  function controller($scope, $uibModalInstance) {

    $scope.reject = () => {
      $uibModalInstance.dismiss('cancel')
      $scope.$parent.reject()
    }

    $scope.accept = () => {
      $uibModalInstance.dismiss('cancel')
      $scope.$parent.accept()
    }

    return this
  }

  angular.module('profitelo.components.communicator.modals.service-unavailable', [
    'ui.bootstrap'
  ])
    .controller('unavailableServiceController', controller)

}())