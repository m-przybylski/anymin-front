/* istanbul ignore next function */
(function() {

  function clientCallController($scope, $uibModalInstance) {

    $scope.rejectCall = () => {
      $uibModalInstance.dismiss('reject')
      $scope.$parent.rejectCall()
    }

    $scope.answerCall = () => {
      $uibModalInstance.close('answer')
      $scope.$parent.answerCall()
    }

    return this
  }

  angular.module('profitelo.components.communicator.modals.client-call', [
    'ui.bootstrap'
  ])
    .controller('clientCallController', clientCallController)

}())