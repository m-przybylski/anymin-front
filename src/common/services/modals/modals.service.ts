namespace profitelo.services.modals {

  import IDialogService = profitelo.services.dialog.IDialogService
  import IRootScopeService = profitelo.services.rootScope.IRootScopeService
  import IClientCallParentControllerScope = profitelo.components.communicator.modals.clientCall.IClientCallParentControllerScope
  import IConsultationSummaryClientParentControllerScope = profitelo.components.modals.consultationSummaryClient.IConsultationSummaryClientParentControllerScope
  import IConsultationSummaryExpertParentControllerScope = profitelo.components.communicator.modals.consultationSummaryExpert.IConsultationSummaryExpertParentControllerScope
  import IUnavailableServiceControllerParentScope = profitelo.components.communicator.modals.serviceUnavailable.IUnavailableServiceControllerParentScope
  import INoCreditsControllerParentScope = profitelo.components.communicator.modals.noCredits.INoCreditsControllerParentScope
  import IBasicAccountSettingsControllerParentScope = profitelo.components.dashboard.settings.modals.general.basicAccountSettings.IBasicAccountSettingsControllerParentScope
  import IGeneralPhoneSettingsControllerParentScope = profitelo.components.dashboard.settings.modals.general.phoneSettings.IGeneralPhoneSettingsControllerParentScope
  import IGeneralEmailSettingsControllerParentScope = profitelo.components.dashboard.settings.modals.general.emailSettings.IGeneralEmailSettingsControllerParentScope
  import IGeneralCountrySettingsControllerParentScope = profitelo.components.dashboard.settings.modals.general.countrySettings.IGeneralCountrySettingsControllerParentScope
  import ISecurityChangePasswordSettingsControllerParentScope = profitelo.components.dashboard.settings.modals.security.changePassword.ISecurityChangePasswordSettingsControllerParentScope
  import ISecurityPinNumberSettingsControllerParentScope = profitelo.components.dashboard.settings.modals.security.pinNumber.ISecurityPinNumberSettingsControllerParentScope
  import ClientActivity = profitelo.models.ClientActivity

  export interface IModalsService {
    createIncomingCallModal(service: Service, answerCb: () => void, rejectCb: () => void): ng.ui.bootstrap.IModalServiceInstance
    createNoFundsModal(acceptCb: () => void, rejectCb: () => void): ng.ui.bootstrap.IModalServiceInstance
    createServiceUnavailableModal(acceptCb: () => void, rejectCb: () => void): ng.ui.bootstrap.IModalServiceInstance
    createClientConsultationSummaryModal(id: string): ng.ui.bootstrap.IModalServiceInstance
    createExpertConsultationSummaryModal(id: string): ng.ui.bootstrap.IModalServiceInstance
    createClientSUEActivityDetailsModal(sueId: string): ng.ui.bootstrap.IModalServiceInstance
    createClientComplainReportModal(): ng.ui.bootstrap.IModalServiceInstance
    createClientChargeDetailsModal(financeActivityDetails: Object): ng.ui.bootstrap.IModalServiceInstance
    createBasicAccountSettingsModal(callback: Function): ng.ui.bootstrap.IModalServiceInstance
    createGeneralPhoneSettingsModal(): ng.ui.bootstrap.IModalServiceInstance
    createGeneralEmailSettingsModal(): ng.ui.bootstrap.IModalServiceInstance
    createGeneralCountrySettingsModal(): ng.ui.bootstrap.IModalServiceInstance
    createSecurityChangePasswordSettingsModal(): ng.ui.bootstrap.IModalServiceInstance
    createSecurityPinSecuritySettingsModal(): ng.ui.bootstrap.IModalServiceInstance
  }

  // TODO add types for dialogScope Scopes
  class ModalsService implements IModalsService {

    constructor(private $rootScope: IRootScopeService, private dialogService: IDialogService) {}

    public createIncomingCallModal = (service: Service, answerCallback: Function, rejectCallback: Function) => {
      const dialogScope: IClientCallParentControllerScope = <IClientCallParentControllerScope>this.$rootScope.$new(true)

      dialogScope.service = service
      dialogScope.answerCall = answerCallback
      dialogScope.rejectCall = rejectCallback

      return this.dialogService.openDialog({
        controller: 'clientCallController',
        templateUrl: 'components/communicator/modals/client-call/client-call.tpl.html',
        scope: dialogScope
      })
    }

    public createNoFundsModal = (acceptCallback: Function, rejectCallback: Function) => {
      const dialogScope: INoCreditsControllerParentScope =
        <INoCreditsControllerParentScope>this.$rootScope.$new(true)

      dialogScope.reject = acceptCallback
      dialogScope.accept = rejectCallback

      return this.dialogService.openDialog({
        controller: 'noCreditsController',
        templateUrl: 'components/communicator/modals/no-credits/no-credits.tpl.html',
        scope: dialogScope
      })
    }

    public createServiceUnavailableModal = (acceptCallback: Function, rejectCallback: Function) => {
      const dialogScope: IUnavailableServiceControllerParentScope =
        <IUnavailableServiceControllerParentScope>this.$rootScope.$new(true)

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
        throw new Error('Expected serviceId, got ' + serviceId)
      }

      const dialogScope: IConsultationSummaryClientParentControllerScope =
        <IConsultationSummaryClientParentControllerScope>this.$rootScope.$new(true)

      dialogScope.serviceId = serviceId

      return this.dialogService.openDialog({
        controller: 'consultationSummaryClientController',
        templateUrl: 'components/communicator/modals/consultation-summary-client/consultation-summary-client.tpl.html',
        scope: dialogScope
      })
    }

    public createExpertConsultationSummaryModal = (serviceId: string) => {
      if (!serviceId) {
        throw new Error('Expected serviceId, got ' + serviceId)
      }

      const dialogScope: IConsultationSummaryExpertParentControllerScope =
        <IConsultationSummaryExpertParentControllerScope>this.$rootScope.$new(true)

      dialogScope.serviceId = serviceId

      return this.dialogService.openDialog({
        controller: 'consultationSummaryExpertController',
        templateUrl: 'components/communicator/modals/consultation-summary-expert/consultation-summary-expert.tpl.html',
        scope: dialogScope
      })
    }

    public createClientSUEActivityDetailsModal = (sueId: string) => {
      if (!sueId) {
        throw new Error('Expected sueId, got ' + sueId)
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
      const dialogScope: ng.IScope = this.$rootScope.$new(true)

      return this.dialogService.openDialog({
        controller: 'clientComplainReportController',
        templateUrl: 'components/dashboard/client/activities/modals/complain-report/complain-report.tpl.html',
        scope: dialogScope
      })
    }

    public createClientChargeDetailsModal = (financeActivityDetails: ClientActivity) => {
      if (!financeActivityDetails) {
        throw new Error('Expected financeActivityDetails, got ' + financeActivityDetails)
      }

      const dialogScope: any = this.$rootScope.$new(true)
      dialogScope.financeActivityDetails = financeActivityDetails

      return this.dialogService.openDialog({
        controller: 'clientChargeDetailsController',
        templateUrl: 'components/dashboard/client/activities/modals/charge-details/charge-details.tpl.html',
        scope: dialogScope
      })
    }

    public createBasicAccountSettingsModal = (onModalClose: (cb: Function) => void) => {
      const dialogScope: IBasicAccountSettingsControllerParentScope =
        <IBasicAccountSettingsControllerParentScope>this.$rootScope.$new(true)
      dialogScope.callback = onModalClose

      return this.dialogService.openDialog({
        controller: 'basicAccountSettingsController',
        templateUrl: 'components/dashboard/settings/modals/general/basic-account-settings/basic-account-settings.tpl.html',
        scope: dialogScope
      })
    }

    public createGeneralPhoneSettingsModal = () => {
      const dialogScope: IGeneralPhoneSettingsControllerParentScope =
        <IGeneralPhoneSettingsControllerParentScope>this.$rootScope.$new(true)

      return this.dialogService.openDialog({
        controller: 'generalPhoneSettingsController',
        templateUrl: 'components/dashboard/settings/modals/general/phone-settings/phone-settings.tpl.html',
        scope: dialogScope
      })
    }

    public createGeneralEmailSettingsModal = () => {
      const dialogScope: IGeneralEmailSettingsControllerParentScope =
        <IGeneralEmailSettingsControllerParentScope>this.$rootScope.$new(true)

      return this.dialogService.openDialog({
        controller: 'generalEmailSettingsController',
        templateUrl: 'components/dashboard/settings/modals/general/email-settings/email-settings.tpl.html',
        scope: dialogScope
      })
    }

    public createGeneralCountrySettingsModal = () => {
      const dialogScope: IGeneralCountrySettingsControllerParentScope =
        <IGeneralCountrySettingsControllerParentScope>this.$rootScope.$new(true)

      return this.dialogService.openDialog({
        controller: 'generalCountrySettingsController',
        templateUrl: 'components/dashboard/settings/modals/general/country-settings/country-settings.tpl.html',
        scope: dialogScope
      })
    }

    public createSecurityChangePasswordSettingsModal = () => {
      const dialogScope: ISecurityChangePasswordSettingsControllerParentScope =
        <ISecurityChangePasswordSettingsControllerParentScope>this.$rootScope.$new(true)

      return this.dialogService.openDialog({
        controller: 'securityChangePasswordSettingsController',
        templateUrl: 'components/dashboard/settings/modals/security/change-password/change-password.tpl.html',
        scope: dialogScope
      })
    }

    public createSecurityPinSecuritySettingsModal = () => {
      const dialogScope: ISecurityPinNumberSettingsControllerParentScope =
        <ISecurityPinNumberSettingsControllerParentScope>this.$rootScope.$new(true)

      return this.dialogService.openDialog({
        controller: 'securityPinNumberSettingsController',
        templateUrl: 'components/dashboard/settings/modals/security/pin-number/pin-number.tpl.html',
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
    'profitelo.components.dashboard.client.activities.modals.charge-details',
    'profitelo.components.dashboard.settings.modals.general.basic-account-settings',
    'profitelo.components.dashboard.settings.modals.general.phone-settings',
    'profitelo.components.dashboard.settings.modals.general.email-settings',
    'profitelo.components.dashboard.settings.modals.general.country-settings',
    'profitelo.components.dashboard.settings.modals.security.change-password',
    'profitelo.components.dashboard.settings.security.modals.pin-number'
  ])
  .service('modalsService', ModalsService)
}
