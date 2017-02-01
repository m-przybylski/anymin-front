/* istanbul ignore next function */
(function() {

  function controller($scope, $uibModalInstance) {
    $scope.isNavbar = true
    $scope.isFullscreen = true

    $scope.onModalClose = () =>
      $uibModalInstance.dismiss('cancel')
    return this
  }

  angular.module('profitelo.components.settings.modals.general.full-name', [
    'ui.bootstrap',
    'profitelo.directives.interface.scrollable'
  ])
    .controller('settingsGeneralFullNameController', controller)

}())