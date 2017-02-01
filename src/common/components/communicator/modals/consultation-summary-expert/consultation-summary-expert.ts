namespace profitelo.components.communicator.modals.consultationSummaryExpert {

  import ICallSummaryService = profitelo.services.callSummary.ICallSummaryService
  import CallSummary = profitelo.models.CallSummary

  interface IConsultationSummaryExpertControllerScope extends ng.IScope {
    serviceId: string
    callSummary: CallSummary | null
    onModalClose: Function
    isFullscreen: boolean
    isNavbar: boolean
  }

  class ConsultationSummaryExpertController {

    /* @ngInject */
    constructor(private $scope: IConsultationSummaryExpertControllerScope,
                private $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance,
                private callSummaryService: ICallSummaryService) {

      $scope.isFullscreen = true
      $scope.isNavbar = true

      $scope.callSummary = null

      $scope.onModalClose = () =>
        $uibModalInstance.dismiss('cancel')

      this.callSummaryService.onCallSummary(this.onCallSummary)

      this.loadFromExistingCallSummaries()
    }

    private onCallSummary = (data) => {
      const callSummary = data.callSummary
      if (callSummary.service.id === this.$scope.serviceId) {
        this.$scope.callSummary = callSummary
      }
    }

    private loadFromExistingCallSummaries = () => {
      const obj = this.callSummaryService.takeCallSummary(this.$scope.serviceId)
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
}