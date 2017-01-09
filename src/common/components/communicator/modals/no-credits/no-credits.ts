/* istanbul ignore next function */
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

  angular.module('profitelo.components.communicator.modals.no-credits', [
    'ui.bootstrap'
  ])
    .controller('noCreditsController', controller)

}())