(function() {

  /*@ngInject*/
  function proThanksForCommentModalController($scope, DialogService) {

    //DialogService.openDialog({
    //  scope: $scope,
    //  controller: 'proInvitationAcceptanceBoxModalController',
    //  templateUrl: 'components/dashboard/invitation/pro-invitation-acceptance-box/pro-invitation-acceptance-box-modal-controller.tpl.html'
    //})


    return this

  }

  let proThanksForCommentModal = {
    transclude: true,
    templateUrl: 'components/communicator/modals/pro-thanks-for-comment-modal/pro-thanks-for-comment-modal.tpl.html',
    controller: proThanksForCommentModalController()
  }

  angular.module('profitelo.components.communicator.modals.pro-thanks-for-comment-modal', [
      'pascalprecht.translate'
    ])
    .component('proThanksForCommentModal', proThanksForCommentModal)

}())