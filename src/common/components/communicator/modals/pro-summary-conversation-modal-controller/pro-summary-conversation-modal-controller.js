(function() {

  function proSummaryConversationModalController($scope, $uibModalInstance) {

    this.addOpinion = () => {

      $uibModalInstance.dismiss('cancel')
    }

    this.dismissWindow = () => {
      $uibModalInstance.dismiss('cancel')
    }


    return this
  }

  angular.module('profitelo.components.communicator.modals.pro-summary-conversation-modal-controller', [
    'profitelo.swaggerResources',
    'ui.bootstrap'

  ])
    .controller('proSummaryConversationModalController', proSummaryConversationModalController)

}())
