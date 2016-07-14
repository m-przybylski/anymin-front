(function() {

  /*@ngInject*/
  function proNoCreditsModalController($scope, DialogService) {

    //DialogService.openDialog({
    //  scope: $scope,
    //  controller: 'proInvitationAcceptanceBoxModalController',
    //  templateUrl: 'components/dashboard/invitation/pro-invitation-acceptance-box/pro-invitation-acceptance-box-modal-controller.tpl.html'
    //})


    return this

  }

  let proNoCreditsModal = {
    transclude: true,
    templateUrl: 'components/communicator/modals/pro-no-credits-modal/pro-no-credits-modal.tpl.html',
    controller: proNoCreditsModalController()
  }

  angular.module('profitelo.components.communicator.modals.pro-no-credits-modal', [
    'pascalprecht.translate'
  ])
  .component('proNoCreditsModal', proNoCreditsModal)

}())