(function() {
  /*@ngInject*/
  function proModalController($scope, EmploymentApi, DialogService, AppServiceProviderImageResolver) {

    DialogService.openDialog({
      scope: $scope,
      controller:  'proConversationHelpfulModalController',
      templateUrl: 'components/communicator/modals/pro-conversation-helpful-modal-controller/pro-conversation-helpful-modal-controller.tpl.html'
    })


    return this

  }

  let proModal = {
    transclude: true,
    controller: proModalController,
    controllerAs: 'vm'
  }

  angular.module('profitelo.components.communicator.modal', [
    'pascalprecht.translate',
    'profitelo.components.communicator.modals.pro-conversation-helpful-modal-controller',
    'profitelo.services.dialog-service',
    'profitelo.components.communicator.modals.pro-no-credits-modal-controller',
    'profitelo.components.communicator.modals.pro-thanks-for-vote-modal-controller',
    'profitelo.components.communicator.modals.pro-thanks-for-comment-modal-controller'
  ])
  .component('proModal', proModal)

}())

