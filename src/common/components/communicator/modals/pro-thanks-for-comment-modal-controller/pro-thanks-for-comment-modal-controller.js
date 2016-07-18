(function() {

  function proThanksForCommentModalController($scope, $uibModalInstance, $state) {

    this.goToSearchList = () => {
      $uibModalInstance.dismiss('cancel')
      $state.go('app.dashboard.start')
    }

    this.dismissWindow = () => {
      $uibModalInstance.dismiss('cancel')
    }


    return this
  }



  angular.module('profitelo.components.communicator.modals.pro-thanks-for-comment-modal-controller', [
    'profitelo.swaggerResources',
    'ui.bootstrap',
    'profitelo.services.service-provider-state'

  ])
      .controller('proThanksForCommentModalController', proThanksForCommentModalController)

}())