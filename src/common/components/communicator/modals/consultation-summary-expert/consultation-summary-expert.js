/* istanbul ignore next function */
(function() {

  function controller($scope, $uibModalInstance, callSummaryService) {

    $scope.callSummary = null

    const onCallSummary = (data) => {
      const callSummary = data.callSummary
      if (callSummary.service.id === $scope.serviceId) {
        $scope.callSummary = callSummary
      }
    }

    const loadFromExistingCallSummaries = () => {
      const obj = callSummaryService.takeCallSummary($scope.serviceId)
      if (obj) {
        onCallSummary(obj)
      }
    }

    callSummaryService.onCallSummary(onCallSummary)

    loadFromExistingCallSummaries()

    $scope.onModalClose = () =>
      $uibModalInstance.dismiss('cancel')

    return this
  }

  angular.module('profitelo.components.communicator.modals.consultation-summary-expert', [
    'ui.bootstrap',
    'profitelo.services.call-summary'
  ])
    .controller('consultationSummaryExpertController', controller)

}())