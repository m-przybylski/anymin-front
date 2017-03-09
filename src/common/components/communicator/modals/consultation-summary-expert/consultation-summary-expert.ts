import * as angular from "angular"
import {CallSummaryService} from "../../../../services/call-summary/call-summary.service"
import {CallSummary} from "../../../../models/CallSummary"

export interface IConsultationSummaryExpertParentControllerScope extends ng.IScope {
  serviceId: string
}

export interface IConsultationSummaryExpertControllerScope extends ng.IScope {
  callSummary: CallSummary | null
  onModalClose: Function
  isFullscreen: boolean
  isNavbar: boolean
  $parent: IConsultationSummaryExpertParentControllerScope
}

export class ConsultationSummaryExpertController {

  /* @ngInject */
  constructor(private $scope: IConsultationSummaryExpertControllerScope,
              $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance,
              private callSummaryService: CallSummaryService) {

    $scope.isFullscreen = true
    $scope.isNavbar = true

    $scope.callSummary = null

    $scope.onModalClose = () =>
      $uibModalInstance.dismiss('cancel')

    this.callSummaryService.onCallSummary(this.onCallSummary)

    this.loadFromExistingCallSummaries()
  }

  private onCallSummary = (data: any) => {
    const callSummary: CallSummary = data.callSummary
    if (callSummary.service.id === this.$scope.$parent.serviceId) {
      this.$scope.callSummary = callSummary
    }
  }

  private loadFromExistingCallSummaries = () => {
    const obj = this.callSummaryService.takeCallSummary(this.$scope.$parent.serviceId)
    if (obj) {
      this.onCallSummary(obj)
    }
  }
}

angular.module('profitelo.components.communicator.modals.consultation-summary-expert', [
  'ui.bootstrap',
  'profitelo.services.call-summary',
  'profitelo.components.interface.preloader',
  'profitelo.directives.interface.scrollable'
])
  .controller('consultationSummaryExpertController', ConsultationSummaryExpertController)
