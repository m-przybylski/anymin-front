(function() {

  function controller($scope: any, $state: ng.ui.IStateService,
                      $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance) {
    $scope.isNavbar = true
    $scope.isFullscreen = true

    $scope.goToSettings = () => {
      $state.go('app.dashboard.settings.payments')
      $scope.onModalClose()
    }

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
