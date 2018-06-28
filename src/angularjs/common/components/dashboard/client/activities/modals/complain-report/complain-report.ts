// tslint:disable:only-arrow-functions
// tslint:disable:no-invalid-this
// tslint:disable:no-any
// tslint:disable:deprecation
(function(): void {

  function controller($scope: any, $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance): void {
    $scope.isNavbar = true;
    $scope.isFullscreen = true;

    $scope.onModalClose = (): void =>
      $uibModalInstance.dismiss('cancel');

    return this;
  }

  angular.module('profitelo.components.dashboard.client.activities.modals.complain-report', [
    'ui.bootstrap',
    'profitelo.directives.interface.scrollable'
  ])
    .controller('clientComplainReportController', ['$scope', '$uibModalInstance', controller]);

}());
