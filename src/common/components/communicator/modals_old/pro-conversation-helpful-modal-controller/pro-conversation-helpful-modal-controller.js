(function() {

  function proConversationHelpfulModalController($scope, $uibModalInstance) {

    this.accept = () => {
      $uibModalInstance.dismiss('cancel')
    }

    this.dismissWindow = () => {
      $uibModalInstance.dismiss('cancel')
    }


    return this
  }



  angular.module('profitelo.components.communicator.modals.pro-conversation-helpful-modal-controller', [
    'profitelo.swaggerResources',
    'ui.bootstrap'

  ])
    .controller('proConversationHelpfulModalController', proConversationHelpfulModalController)

}())