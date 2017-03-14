import IRootScopeService = profitelo.services.rootScope.IRootScopeService
import IUnavailableServiceControllerParentScope = profitelo.components.communicator.modals.serviceUnavailable.IUnavailableServiceControllerParentScope
import INoCreditsControllerParentScope = profitelo.components.communicator.modals.noCredits.INoCreditsControllerParentScope
import {GetService, GetActivity} from "profitelo-api-ng/model/models"
import {DialogService} from "../dialog/dialog.service"
import {IClientCallParentControllerScope} from "../../components/communicator/modals/client-call/client-call"
import {IConsultationSummaryClientParentControllerScope} from "../../components/communicator/modals/consultation-summary-client/consultation-summary-client"
import {IConsultationSummaryExpertParentControllerScope} from "../../components/communicator/modals/consultation-summary-expert/consultation-summary-expert"
import {IConsultationDetailsParentScope} from "../../components/dashboard/client/activities/modals/consultation-details/consultation-details"
import {IBasicAccountSettingsControllerParentScope} from "../../components/dashboard/settings/modals/general/basic-account-settings/basic-account-settings"
import {IGeneralPhoneSettingsControllerScope} from "../../components/dashboard/settings/modals/general/phone-settings/phone-settings"
import {IGeneralEmailSettingsControllerScope} from "../../components/dashboard/settings/modals/general/email-settings/email-settings"
import {IGeneralCountrySettingsControllerScope} from "../../components/dashboard/settings/modals/general/country-settings/country-settings"
import {ISecurityChangePasswordSettingsControllerScope} from "../../components/dashboard/settings/modals/security/change-password/change-password"
import {ISecurityPinNumberSettingsControllerScope} from "../../components/dashboard/settings/modals/security/pin-number/pin-number"
import {IEditCompanyInvoiceControllerScope} from "../../components/dashboard/settings/modals/payments/edit-company-invoice/edit-company-invoice"
import {IPayoutsPayPalControllerScope} from "../../components/dashboard/settings/modals/payouts/payouts-payPal/payouts-pay-pal"
import {IAddPaymentMethodControllerScope} from "../../components/dashboard/settings/modals/payments/add-payment-method/add-payment-method"

// TODO add types for dialogScope Scopes
export class ModalsService {

  /* @ngInject */
  constructor(private $rootScope: IRootScopeService, private dialogService: DialogService) {
  }

  public createIncomingCallModal = (service: GetService, answerCallback: Function, rejectCallback: Function) => {
    const dialogScope: IClientCallParentControllerScope = <IClientCallParentControllerScope>this.$rootScope.$new(true)

    dialogScope.service = service
    dialogScope.answerCall = answerCallback
    dialogScope.rejectCall = rejectCallback

    return this.dialogService.openDialog({
      controller: 'clientCallController',
      template: require('common/components/communicator/modals/client-call/client-call.jade')(),
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
      template: require('common/components/communicator/modals/no-credits/no-credits.jade')(),
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
      template: require('common/components/communicator/modals/service-unavailable/service-unavailable.jade')(),
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
      template: require('common/components/communicator/modals/consultation-summary-client/consultation-summary-client.jade')(),
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
      template: require('common/components/communicator/modals/consultation-summary-expert/consultation-summary-expert.jade')(),
      scope: dialogScope
    })
  }

  public createClientSUEActivityDetailsModal = (sueId: string) => {
    if (!sueId) {
      throw new Error('Expected sueId, got ' + sueId)
    }

    const dialogScope: IConsultationDetailsParentScope = <IConsultationDetailsParentScope>this.$rootScope.$new(true)

    dialogScope.sueId = sueId
    return this.dialogService.openDialog({
      controller: 'clientConsultationDetails',
      template: require('common/components/dashboard/client/activities/modals/consultation-details/consultation-details.jade')(),
      scope: dialogScope
    })
  }

  public createClientComplainReportModal = () => {
    const dialogScope: ng.IScope = this.$rootScope.$new(true)

    return this.dialogService.openDialog({
      controller: 'clientComplainReportController',
      template: require('common/components/dashboard/client/activities/modals/complain-report/complain-report.jade')(),
      scope: dialogScope
    })
  }

  public createClientChargeDetailsModal = (financeActivityDetails: GetActivity) => {
    if (!financeActivityDetails) {
      throw new Error('Expected financeActivityDetails, got ' + financeActivityDetails)
    }

    const dialogScope: any = this.$rootScope.$new(true)
    dialogScope.financeActivityDetails = financeActivityDetails

    return this.dialogService.openDialog({
      controller: 'clientChargeDetailsController',
      template: require('common/components/dashboard/client/activities/modals/charge-details/charge-details.jade')(),
      scope: dialogScope
    })
  }

  public createBasicAccountSettingsModal = (onModalClose: (cb: Function) => void) => {
    const dialogScope: IBasicAccountSettingsControllerParentScope =
      <IBasicAccountSettingsControllerParentScope>this.$rootScope.$new(true)
    dialogScope.callback = onModalClose

    return this.dialogService.openDialog({
      controller: 'basicAccountSettingsController',
      template: require('common/components/dashboard/settings/modals/general/basic-account-settings/basic-account-settings.jade')(),
      scope: dialogScope
    })
  }

  public createGeneralPhoneSettingsModal = (onModalClose: (cb: () => void) => void) => {
    const dialogScope: IGeneralPhoneSettingsControllerScope =
      <IGeneralPhoneSettingsControllerScope>this.$rootScope.$new(true)
    dialogScope.callback = onModalClose

    return this.dialogService.openDialog({
      controllerAs: 'vm',
      controller: 'generalPhoneSettingsController',
      template: require('common/components/dashboard/settings/modals/general/phone-settings/phone-settings.jade')(),
      scope: dialogScope
    })
  }

  public createGeneralEmailSettingsModal = (onModalClose: (cb: () => void) => void) => {
    const dialogScope: IGeneralEmailSettingsControllerScope =
      <IGeneralEmailSettingsControllerScope>this.$rootScope.$new(true)
    dialogScope.callback = onModalClose

    return this.dialogService.openDialog({
      controllerAs: 'vm',
      controller: 'generalEmailSettingsController',
      template: require('common/components/dashboard/settings/modals/general/email-settings/email-settings.jade')(),
      scope: dialogScope
    })
  }

  public createGeneralCountrySettingsModal = (onModalClose: (cb: () => void) => void) => {
    const dialogScope: IGeneralCountrySettingsControllerScope =
      <IGeneralCountrySettingsControllerScope>this.$rootScope.$new(true)

    dialogScope.callback = onModalClose
    return this.dialogService.openDialog({
      controllerAs: 'vm',
      controller: 'generalCountrySettingsController',
      template: require('common/components/dashboard/settings/modals/general/country-settings/country-settings.jade')(),
      scope: dialogScope
    })
  }

  public createSecurityChangePasswordSettingsModal = () => {
    const dialogScope: ISecurityChangePasswordSettingsControllerScope =
      <ISecurityChangePasswordSettingsControllerScope>this.$rootScope.$new(true)

    return this.dialogService.openDialog({
      controllerAs: 'vm',
      controller: 'securityChangePasswordSettingsController',
      template: require('common/components/dashboard/settings/modals/security/change-password/change-password.jade')(),
      scope: dialogScope
    })
  }

  public createSecurityPinSecuritySettingsModal = () => {
    const dialogScope: ISecurityPinNumberSettingsControllerScope =
      <ISecurityPinNumberSettingsControllerScope>this.$rootScope.$new(true)

    return this.dialogService.openDialog({
      controllerAs: 'vm',
      controller: 'securityPinNumberSettingsController',
      template: require('common/components/dashboard/settings/modals/security/pin-number/pin-number.jade')(),
      scope: dialogScope
    })
  }

  public createAddPaymentMethodControllerModal = (onModalClose: () => void) => {
    const dialogScope: IAddPaymentMethodControllerScope =
      <IAddPaymentMethodControllerScope>this.$rootScope.$new(true)

    dialogScope.callback = onModalClose
    return this.dialogService.openDialog({
      controllerAs: 'vm',
      controller: 'addPaymentMethodController',
      template: require('common/components/dashboard/settings/modals/payments/add-payment-method/add-payment-method.jade')(),
      scope: dialogScope
    })
  }

  public createEditCompanyInvoiceControllerModal = (onModalClose: () => void) => {
    const dialogScope: IEditCompanyInvoiceControllerScope =
      <IEditCompanyInvoiceControllerScope>this.$rootScope.$new(true)

    dialogScope.callback = onModalClose
    return this.dialogService.openDialog({
      controllerAs: 'vm',
      controller: 'editCompanyInvoiceController',
      template: require('common/components/dashboard/settings/modals/payments/edit-company-invoice/edit-company-invoice.jade')(),
      scope: dialogScope
    })
  }

  public createPayoutsMethodControllerModal = (onModalClose: () => void) => {
    const dialogScope: IPayoutsPayPalControllerScope =
      <IPayoutsPayPalControllerScope>this.$rootScope.$new(true)

    dialogScope.callback = onModalClose

    return this.dialogService.openDialog({
      controllerAs: 'vm',
      controller: 'payoutsPayPalController',
      template: require('common/components/dashboard/settings/modals/payouts/payouts-payPal/payouts-pay-pal.jade')(),
      scope: dialogScope
    })
  }

}
