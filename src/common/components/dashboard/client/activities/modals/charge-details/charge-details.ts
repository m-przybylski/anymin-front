/* istanbul ignore next function */
(function() {

  function controller($scope, $uibModalInstance) {
    this.isNavbar = true
    this.isFullscreen = true

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