(function() {

  function controller($scope, $uibModalInstance) {

    $scope.onModalClose = () =>
      $uibModalInstance.dismiss('cancel')

  }

  angular.module('profitelo.components.dashboard.client.activities.modals.consultation-details', [
    'ui.bootstrap',
    'profitelo.swaggerResources',
    'profitelo.components.interface.preloader',
    'profitelo.filters.milliseconds-to-datetime',
    'profitelo.components.interface.collapse-btn',
    'profitelo.components.dashboard.client.activities.modals.consultation-details.complain',
    'profitelo.components.dashboard.client.activities.modals.consultation-details.consultation-details-chat',
    'profitelo.components.dashboard.client.activities.modals.consultation-details.recommended-tags',
    'profitelo.services.helper'
  ])
    .controller('clientConsultationDetails', controller)

}())