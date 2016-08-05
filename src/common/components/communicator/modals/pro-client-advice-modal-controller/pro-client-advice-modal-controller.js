(function() {

  function proClientAdviceModalController($scope, $uibModalInstance) {
    

    this.pickUpCall = () => {
      $uibModalInstance.dismiss('cancel')
      $scope.$parent.pickUpCall()
    }

    this.rejectCall = () => {
      $uibModalInstance.dismiss('cancel')
      $scope.$parent.rejectCall()
    }


    return this
  }



  angular.module('profitelo.components.communicator.modals.pro-client-advice-modal-controller', [
    'profitelo.swaggerResources',
    'ui.bootstrap'

  ])
    .controller('proClientAdviceModalController', proClientAdviceModalController)

}())