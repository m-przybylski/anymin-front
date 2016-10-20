(function() {

  function clientCallController($scope, $uibModalInstance) {
    $scope.confirm = () => {

      if (angular.isFunction($scope.$parent.vm.modalCallback)) {
        $scope.$parent.vm.modalCallback()
      }
      $uibModalInstance.close('cancel')
    }

    $scope.rejectCall = () => {
      $uibModalInstance.dismiss('cancel')
      $scope.disconnectCall()
    }

    return this
  }

  angular.module('profitelo.common.controller.communicator.client-call', [
    'ui.bootstrap'
  ])
    .controller('clientCallController', clientCallController)

}())