(function() {

  function proComplaintModalController($scope, $uibModalInstance) {

    this.addComment = () => {
      $uibModalInstance.dismiss('cancel')
    }

    this.dismissWindow = () => {
      $uibModalInstance.dismiss('cancel')
    }


    return this
  }



  angular.module('profitelo.components.communicator.modals.pro-complaint-modal-controller', [
    'profitelo.swaggerResources',
    'ui.bootstrap'

  ])
    .controller('proComplaintModalController', proComplaintModalController)

}())