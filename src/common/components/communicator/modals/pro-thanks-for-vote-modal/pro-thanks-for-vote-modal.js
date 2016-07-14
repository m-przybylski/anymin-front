(function() {

  /*@ngInject*/
  function proThanksForVoteModalController($scope, DialogService) {

    //DialogService.openDialog({
    //  scope: $scope,
    //  controller: 'proInvitationAcceptanceBoxModalController',
    //  templateUrl: 'components/dashboard/invitation/pro-invitation-acceptance-box/pro-invitation-acceptance-box-modal-controller.tpl.html'
    //})


    return this

  }

  let proThanksForVoteModal = {
    transclude: true,
    templateUrl: 'components/communicator/modals/pro-thanks-for-comment-modal/pro-thanks-for-vote-modal.tpl.html',
    controller: proThanksForVoteModalController()
  }

  angular.module('profitelo.components.communicator.modals.pro-thanks-for-comment-modal', [
      'pascalprecht.translate'
    ])
    .component('proThanksForVoteModal', proThanksForVoteModal)

}())