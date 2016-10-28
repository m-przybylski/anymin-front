(function() {

  function proThanksForVoteModalController($scope, $uibModalInstance) {

    this.goToSearchList = () => {
      $uibModalInstance.dismiss('cancel')
    }


    return this
  }



  angular.module('profitelo.components.communicator.modals.pro-thanks-for-vote-modal-controller', [
    'profitelo.swaggerResources',
    'ui.bootstrap'

  ])
      .controller('proThanksForVoteModalController', proThanksForVoteModalController)

}())