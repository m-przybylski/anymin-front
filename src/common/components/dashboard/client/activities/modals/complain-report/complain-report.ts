/* istanbul ignore next function */
(function() {

  function controller($scope, $uibModalInstance) {
    $scope.onModalClose = () =>
      $uibModalInstance.dismiss('cancel')

    return this
  }

  angular.module('profitelo.components.dashboard.client.activities.modals.complain-report', [
    'ui.bootstrap'
  ])
    .controller('clientComplainReportController', controller)

}())