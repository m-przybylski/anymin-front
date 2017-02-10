(function() {

  function acceptRejectDialogController($scope: any, $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance) {
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

  angular.module('profitelo.common.controller.accept-reject-dialog-controller', [
    'ui.bootstrap'
  ])
  .controller('acceptRejectDialogController', acceptRejectDialogController)

}())
