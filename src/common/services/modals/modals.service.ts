import IDialogService = profitelo.services.dialog.IDialogService

module profitelo.services.modals {

  export interface IModalsService {
    createIncomingCallModal(service: Service, answerCb: () => void, rejectCb: () => void): ng.ui.bootstrap.IModalServiceInstance
    createNoFundsModal(acceptCb: () => void, rejectCb: () => void): ng.ui.bootstrap.IModalServiceInstance
    createServiceUnavailableModal(acceptCb: () => void, rejectCb: () => void): ng.ui.bootstrap.IModalServiceInstance
    createClientConsultationSummaryModal(id: string): ng.ui.bootstrap.IModalServiceInstance
    createExpertConsultationSummaryModal(is: string): ng.ui.bootstrap.IModalServiceInstance
    createClientSUEActivityDetailsModal(sueId: string): ng.ui.bootstrap.IModalServiceInstance
    createClientComplainReportModal(): ng.ui.bootstrap.IModalServiceInstance
    createClientChargeDetailsModal(): ng.ui.bootstrap.IModalServiceInstance
  }

  // TODO add types for dialogScope Scopes
  class ModalsService implements IModalsService {

    constructor(private $log: ng.ILogService, private $rootScope: IProfiteloRootScope,
                private dialogService: IDialogService) {
    }

    public createIncomingCallModal = (_service, answerCallback, rejectCallback) => {
      const dialogScope: any = this.$rootScope.$new(true)
      dialogScope.service = _service
      dialogScope.answerCall = answerCallback
      dialogScope.rejectCall = rejectCallback
      return this.dialogService.openDialog({
        controller: 'clientCallController',
        templateUrl: 'components/communicator/modals/client-call/client-call.tpl.html',
        scope: dialogScope
      })
    }

    public createNoFundsModal = (acceptCallback, rejectCallback) => {
      const dialogScope: any = this.$rootScope.$new(true)
      dialogScope.reject = acceptCallback
      dialogScope.accept = rejectCallback
      return this.dialogService.openDialog({
        controller: 'noCreditsController',
        templateUrl: 'components/communicator/modals/no-credits/no-credits.tpl.html',
        scope: dialogScope
      })
    }

    public createServiceUnavailableModal = (acceptCallback, rejectCallback) => {
      const dialogScope: any = this.$rootScope.$new(true)
      dialogScope.reject = acceptCallback
      dialogScope.accept = rejectCallback
      return this.dialogService.openDialog({
        controller: 'unavailableServiceController',
        templateUrl: 'components/communicator/modals/service-unavailable/service-unavailable.tpl.html',
        scope: dialogScope
      })
    }

    public createClientConsultationSummaryModal = (serviceId: string) => {
      if (!serviceId) {
        this.$log.error('Expected serviceId, got ' + serviceId)
        return
      }

      const dialogScope: any = this.$rootScope.$new(true)

      dialogScope.serviceId = serviceId

      return this.dialogService.openDialog({
        controller: 'consultationSummaryClientController',
        templateUrl: 'components/communicator/modals/consultation-summary-client/consultation-summary-client.tpl.html',
        scope: dialogScope
      })
    }

    public createExpertConsultationSummaryModal = (serviceId: string) => {
      if (!serviceId) {
        this.$log.error('Expected serviceId, got ' + serviceId)
        return
      }

      const dialogScope: any = this.$rootScope.$new(true)

      dialogScope.serviceId = serviceId

      return this.dialogService.openDialog({
        controller: 'consultationSummaryExpertController',
        templateUrl: 'components/communicator/modals/consultation-summary-expert/consultation-summary-expert.tpl.html',
        scope: dialogScope
      })
    }

    public createClientSUEActivityDetailsModal = (sueId) => {
      if (!sueId) {
        this.$log.error('Expected sueId, got ' + sueId)
        return
      }

      const dialogScope: any = this.$rootScope.$new(true)

      dialogScope.sueId = sueId
      return this.dialogService.openDialog({
        controller: 'clientConsultationDetails',
        templateUrl: 'components/dashboard/client/activities/modals/consultation-details/consultation-details.tpl.html',
        scope: dialogScope
      })
    }

    public createClientComplainReportModal = () => {
      const dialogScope = this.$rootScope.$new(true)

      return this.dialogService.openDialog({
        controller: 'clientComplainReportController',
        templateUrl: 'components/dashboard/client/activities/modals/complain-report/complain-report.tpl.html',
        scope: dialogScope
      })
    }

    public createClientChargeDetailsModal = () => {
      const dialogScope = this.$rootScope.$new(true)

      return this.dialogService.openDialog({
        controller: 'clientChargeDetailsController',
        templateUrl: 'components/dashboard/client/activities/modals/charge-details/charge-details.tpl.html',
        scope: dialogScope
      })
    }
  }

  angular.module('profitelo.services.modals', [
    'profitelo.services.dialog',
    'profitelo.components.communicator.modals.client-call',
    'profitelo.components.communicator.modals.service-unavailable',
    'profitelo.components.communicator.modals.no-credits',
    'profitelo.components.communicator.modals.consultation-summary-client',
    'profitelo.components.communicator.modals.consultation-summary-expert',
    'profitelo.components.dashboard.client.activities.modals.consultation-details',
    'profitelo.components.dashboard.client.activities.modals.complain-report',
    'profitelo.components.dashboard.client.activities.modals.charge-details'
  ])
  .service('modalsService', ModalsService)
}
