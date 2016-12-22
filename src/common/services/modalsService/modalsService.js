(function() {

  function service($log, $rootScope, DialogService) {

    const _createIncomingCallModal = (_service, answerCallback, rejectCallback) => {
      const dialogScope = $rootScope.$new(true)
      dialogScope.service = _service
      dialogScope.answerCall = answerCallback
      dialogScope.rejectCall = rejectCallback
      return DialogService.openDialog({
        controller: 'clientCallController',
        templateUrl: 'components/communicator/modals/client-call/client-call.tpl.html',
        scope: dialogScope
      })
    }

    const _createNoFundsModal = (acceptCallback, rejectCallback) => {
      const dialogScope = $rootScope.$new(true)
      dialogScope.reject = acceptCallback
      dialogScope.accept = rejectCallback
      return DialogService.openDialog({
        controller: 'noCreditsController',
        templateUrl: 'components/communicator/modals/no-credits/no-credits.tpl.html',
        scope: dialogScope
      })
    }

    const _createServiceUnavailableModal = (acceptCallback, rejectCallback) => {
      const dialogScope = $rootScope.$new(true)
      dialogScope.reject = acceptCallback
      dialogScope.accept = rejectCallback
      return DialogService.openDialog({
        controller: 'unavailableServiceController',
        templateUrl: 'components/communicator/modals/service-unavailable/service-unavailable.tpl.html',
        scope: dialogScope
      })
    }

    const _createClientConsultationSummaryModal = (serviceId) => {
      if (!serviceId) {
        $log.error('Expected serviceId, got ' + serviceId)
        return
      }

      const dialogScope = $rootScope.$new(true)

      dialogScope.serviceId = serviceId

      return DialogService.openDialog({
        controller: 'consultationSummaryClientController',
        templateUrl: 'components/communicator/modals/consultation-summary-client/consultation-summary-client.tpl.html',
        scope: dialogScope
      })
    }

    const _createExpertConsultationSummaryModal = (serviceId) => {
      if (!serviceId) {
        $log.error('Expected serviceId, got ' + serviceId)
        return
      }

      const dialogScope = $rootScope.$new(true)

      dialogScope.serviceId = serviceId

      return DialogService.openDialog({
        controller: 'consultationSummaryExpertController',
        templateUrl: 'components/communicator/modals/consultation-summary-expert/consultation-summary-expert.tpl.html',
        scope: dialogScope
      })
    }

    const _createClientSUEActivityDetailsModal = (sueId) => {
      const dialogScope = $rootScope.$new(true)

      dialogScope.sueId = sueId
      return DialogService.openDialog({
        controller: 'clientConsultationDetails',
        templateUrl: 'components/dashboard/client/activities/modals/consultation-details/consultation-details.tpl.html',
        scope: dialogScope
      })
    }

    const _createClientComplainReportModal = () => {
      const dialogScope = $rootScope.$new(true)

      return DialogService.openDialog({
        controller: 'clientComplainReportController',
        templateUrl: 'components/dashboard/client/activities/modals/complain-report/complain-report.tpl.html',
        scope: dialogScope
      })
    }

    const _createClientChargeDetailsModal = () => {
      const dialogScope = $rootScope.$new(true)

      DialogService.openDialog({
        controller: 'clientChargeDetailsController',
        templateUrl: 'components/dashboard/client/activities/modals/charge-details/charge-details.tpl.html',
        scope: dialogScope
      })
    }
    return {
      createIncomingCallModal: _createIncomingCallModal,
      createNoFundsModal: _createNoFundsModal,
      createServiceUnavailableModal: _createServiceUnavailableModal,
      createClientConsultationSummaryModal: _createClientConsultationSummaryModal,
      createExpertConsultationSummaryModal: _createExpertConsultationSummaryModal,
      createClientSUEActivityDetailsModal: _createClientSUEActivityDetailsModal,
      createClientComplainReportModal: _createClientComplainReportModal,
      createClientChargeDetailsModal: _createClientChargeDetailsModal
    }
  }

  angular.module('profitelo.services.modals', [
    'profitelo.services.dialog-service',
    'profitelo.components.communicator.modals.client-call',
    'profitelo.components.communicator.modals.service-unavailable',
    'profitelo.components.communicator.modals.no-credits',
    'profitelo.components.communicator.modals.consultation-summary-client',
    'profitelo.components.communicator.modals.consultation-summary-expert',
    'profitelo.components.dashboard.client.activities.modals.consultation-details',
    'profitelo.components.dashboard.client.activities.modals.complain-report',
    'profitelo.components.dashboard.client.activities.modals.charge-details'
  ])
    .service('modalsService', service)

}())
