(function() {

  function proSwitchingConversationModalController($scope, $uibModalInstance) {

    this.switchTo = (device) => {
      $uibModalInstance.dismiss('cancel')
    }


    return this
  }



  angular.module('profitelo.components.communicator.modals.pro-switching-conversation-modal-controller', [
    'profitelo.swaggerResources',
    'ui.bootstrap'

  ])
    .controller('proSwitchingConversationModalController', proSwitchingConversationModalController)

}())