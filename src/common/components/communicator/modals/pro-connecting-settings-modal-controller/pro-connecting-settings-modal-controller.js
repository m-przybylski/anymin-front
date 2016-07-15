(function() {

  function proConnectingSettingsModalController($scope, $uibModalInstance, $state) {

    this.saveSettings = () => {
      $uibModalInstance.dismiss('cancel')
    }

    this.dismissWindow = () => {
      $uibModalInstance.dismiss('cancel')
    }


    return this
  }



  angular.module('profitelo.components.communicator.modals.pro-connecting-settings-modal-controller', [
    'profitelo.swaggerResources',
    'ui.bootstrap'

  ])
    .controller('proConnectingSettingsModalController', proConnectingSettingsModalController)

}())
