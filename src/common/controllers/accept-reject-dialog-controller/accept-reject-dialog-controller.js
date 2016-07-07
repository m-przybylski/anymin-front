(function() {

  function acceptRejectDialogController($scope, $uibModalInstance) {
    $scope.confirm = () => {

      if (angular.isFunction($scope.$parent.vm.modalCallback)) {
        $scope.$parent.vm.modalCallback()
      }
      $uibModalInstance.close('cancel')
    }

    $scope.reject = () => {
      $uibModalInstance.dismiss('cancel')
    }

    return this
  }

  angular.module('profitelo.common.controller.accept-reject-dialog-controller', [])
  .controller('acceptRejectDialogController', acceptRejectDialogController)

}())