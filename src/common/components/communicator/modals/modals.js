(function() {

  /*@ngInject*/
  function proModalController($scope, EmploymentApi, DialogService, AppServiceProviderImageResolver) {

      DialogService.openDialog({
        scope: $scope,
        controller: 'proInvitationAcceptanceBoxModalController',
        templateUrl: 'components/dashboard/invitation/pro-invitation-acceptance-box/pro-invitation-acceptance-box-modal-controller.tpl.html'
      })


    return this

  }

  let proModal = {
    transclude: true,
    templateUrl: 'components/communicator/modals/modal.tpl.html',
    controller: proModalController()
  }

  angular.module('profitelo.components.communicator.modal', [
    'pascalprecht.translate'
  ])
  .component('proModal', proModal)

}())
