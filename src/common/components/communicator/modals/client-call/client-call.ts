module profitelo.components.communicator.modals.clientCall {

  interface IClientCallParentControllerScope extends ng.IScope {
    rejectCall: Function
    answerCall: Function
  }

  interface IClientCallControllerScope extends ng.IScope {
    rejectCall: Function
    answerCall: Function
    service: Service
    $parent: IClientCallParentControllerScope
  }

  class ClientCallController implements ng.IController {

    /* @ngInject */
    constructor($scope: IClientCallControllerScope, $uibModalInstance) {
      $scope.rejectCall = () => {
        $uibModalInstance.dismiss('reject')
        $scope.$parent.rejectCall()
      }

      $scope.answerCall = () => {
        $uibModalInstance.close('answer')
        $scope.$parent.answerCall()
      }
    }
  }

  angular.module('profitelo.components.communicator.modals.client-call', [
    'ui.bootstrap'
  ])
  .controller('clientCallController', ClientCallController)
}