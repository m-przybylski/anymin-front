(function() {

  function proThanksForVoteModalController($scope, $uibModalInstance, $state) {

    this.goToSearchList = () => {
      $uibModalInstance.dismiss('cancel')
      $state.go('app.dashboard.start')
    }


    return this
  }



  angular.module('profitelo.components.communicator.modals.pro-thanks-for-vote-modal-controller', [
    'profitelo.swaggerResources',
    'ui.bootstrap'

  ])
      .controller('proThanksForVoteModalController', proThanksForVoteModalController)

}())