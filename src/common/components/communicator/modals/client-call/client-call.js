(function() {

  function clientCallController($scope, $uibModalInstance) {

    $scope.rejectCall = () => {
      $uibModalInstance.dismiss('cancel')
      $scope.$parent.rejectCall()
    }

    $scope.answerCall = () => {
      $uibModalInstance.dismiss('cancel')
      $scope.$parent.answerCall()
    }

    return this
  }

  angular.module('profitelo.components.communicator.modals.client-call', [
    'ui.bootstrap'
  ])
    .controller('clientCallController', clientCallController)

}())