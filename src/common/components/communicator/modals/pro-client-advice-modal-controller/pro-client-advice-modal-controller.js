(function() {

  function proClientAdviceModalController($scope, $uibModalInstance) {

    this.sendNotification = () => {
      $uibModalInstance.dismiss('cancel')
    }

    this.dismissWindow = () => {
      $uibModalInstance.dismiss('cancel')
    }


    return this
  }



  angular.module('profitelo.components.communicator.modals.pro-client-advice-modal-controller', [
    'profitelo.swaggerResources',
    'ui.bootstrap'

  ])
    .controller('proClientAdviceModalController', proClientAdviceModalController)

}())