(function() {

  function controller($scope, $uibModalInstance) {
    $scope.isNavbar = true
    $scope.isFullscreen = true

    $scope.onModalClose = () =>
      $uibModalInstance.dismiss('cancel')
    return this
  }

  angular.module('profitelo.components.dashboard.client.activities.modals.charge-details', [
    'ui.bootstrap',
    'profitelo.directives.interface.scrollable'
  ])
    .controller('clientChargeDetailsController', controller)

}())