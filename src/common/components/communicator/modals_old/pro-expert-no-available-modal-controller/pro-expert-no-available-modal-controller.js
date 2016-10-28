(function() {

  function proExpertNoAvailableModalController($scope, $uibModalInstance) {

    this.sendNotification = () => {
      $uibModalInstance.dismiss('cancel')
    }

    this.dismissWindow = () => {
      $uibModalInstance.dismiss('cancel')
    }


    return this
  }



  angular.module('profitelo.components.communicator.modals.pro-expert-no-available-modal-controller', [
    'profitelo.swaggerResources',
    'ui.bootstrap'

  ])
    .controller('proExpertNoAvailableModalController', proExpertNoAvailableModalController)

}())
