/* istanbul ignore next function */
(function() {

  function controller($scope, $uibModalInstance) {
    $scope.confirm = () => {

      if (angular.isFunction($scope.$parent.vm.modalCallback)) {
        $scope.$parent.vm.modalCallback()
      }
      $uibModalInstance.close('cancel')
    }

    $scope.rejectCall = () => {
      $uibModalInstance.dismiss('cancel')
    }

    $scope.chooseExpertsTag = false

    $scope.recommendExpert = () => {
      console.log(this.chooseExpertsTag, $scope.chooseExpertsTag)
      $scope.chooseExpertsTag = true
      console.log(this.chooseExpertsTag, $scope.chooseExpertsTag)
    }

    return this
  }

  angular.module('profitelo.components.communicator.modals.consultation-summary-expert', [
    'ui.bootstrap'
  ])
    .controller('consultationSummaryExpertController', controller)

}())