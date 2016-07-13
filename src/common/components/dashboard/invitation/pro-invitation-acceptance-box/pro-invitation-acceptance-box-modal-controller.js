(function() {

  function proInvitationAcceptanceBoxModalController($scope, $uibModalInstance) {

    this.submitReasonForm = () => {
      $scope.$parent.vm.postEmploymentsReject()
      $uibModalInstance.dismiss('cancel')
    }
    
    this.dismissWindow = () => {
      $uibModalInstance.dismiss('cancel')
    }

    return this
  }

  

  angular.module('profitelo.components.dashboard.invitation.pro-invitation-acceptance-box-modal-controller', [
    'profitelo.swaggerResources',
    'ui.bootstrap'

  ])
  .controller('proInvitationAcceptanceBoxModalController', proInvitationAcceptanceBoxModalController)
  
}())