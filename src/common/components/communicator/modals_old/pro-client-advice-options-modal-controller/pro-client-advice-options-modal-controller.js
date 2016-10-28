(function() {

  function proClientAdviceOptionsModalController($scope, $uibModalInstance) {

    this.pickUpCall = () => {
      $uibModalInstance.dismiss('cancel')
    }

    this.dismissWindow = () => {
      $uibModalInstance.dismiss('cancel')
    }

    this.moreOptions = (status) => {
      $uibModalInstance.dismiss('cancel')
    }

    return this
  }



  angular.module('profitelo.components.communicator.modals.pro-client-advice-options-modal-controller', [
    'profitelo.swaggerResources',
    'ui.bootstrap'

  ])
    .controller('proClientAdviceOptionsModalController', proClientAdviceOptionsModalController)

}())