import {GetService} from "../../../../api/model/GetService"
import * as angular from "angular"


  export interface IClientCallParentControllerScope extends ng.IScope {
    rejectCall: Function
    answerCall: Function
    service: GetService
  }

  export interface IClientCallControllerScope extends ng.IScope {
    rejectCall: Function
    answerCall: Function
    $parent: IClientCallParentControllerScope
  }

  export class ClientCallController implements ng.IController {

    /* @ngInject */
    constructor($scope: IClientCallControllerScope, $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance) {
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
    'ui.bootstrap',
    'profitelo.directives.interface.scrollable'
  ])
  .controller('clientCallController', ClientCallController)
