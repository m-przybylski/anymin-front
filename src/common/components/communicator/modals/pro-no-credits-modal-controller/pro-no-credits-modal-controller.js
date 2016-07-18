(function() {

  function proNoCreditsModalController($scope, $uibModalInstance, $state) {

    this.goChargeCredits = () => {
      $uibModalInstance.dismiss('cancel')
      $state.go('app.dashboard.start')
    }

    this.dismissWindow = () => {
      $uibModalInstance.dismiss('cancel')
    }


    return this
  }



  angular.module('profitelo.components.communicator.modals.pro-no-credits-modal-controller', [
    'profitelo.swaggerResources',
    'ui.bootstrap',
    'profitelo.services.service-provider-state'

  ])
      .controller('proNoCreditsModalController', proNoCreditsModalController)

}())