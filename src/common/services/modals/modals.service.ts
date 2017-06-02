import IRootScopeService = profitelo.services.rootScope.IRootScopeService
import IUnavailableServiceControllerParentScope = profitelo.components.communicator.modals.serviceUnavailable.IUnavailableServiceControllerParentScope
import INoCreditsControllerParentScope = profitelo.components.communicator.modals.noCredits.INoCreditsControllerParentScope
import {GetService, GetActivity} from 'profitelo-api-ng/model/models'
import {DialogService} from '../dialog/dialog.service'
import {IClientCallParentControllerScope} from '../../components/communicator/modals/client-call/client-call'
import {IConsultationSummaryClientParentControllerScope} from '../../components/communicator/modals/consultation-summary-client/consultation-summary-client'
import {IConsultationSummaryExpertParentControllerScope} from '../../components/communicator/modals/consultation-summary-expert/consultation-summary-expert'
import {IBasicAccountSettingsControllerParentScope} from '../../components/dashboard/settings/modals/general/basic-account-settings/basic-account-settings'
import {IGeneralPhoneSettingsControllerScope} from '../../components/dashboard/settings/modals/general/phone-settings/phone-settings'
import {IGeneralEmailSettingsControllerScope} from '../../components/dashboard/settings/modals/general/email-settings/email-settings'
import {IGeneralCountrySettingsControllerScope} from '../../components/dashboard/settings/modals/general/country-settings/country-settings'
import {ISecurityChangePasswordSettingsControllerScope} from '../../components/dashboard/settings/modals/security/change-password/change-password'
import {ISecurityPinNumberSettingsControllerScope} from '../../components/dashboard/settings/modals/security/pin-number/pin-number'
import {IEditCompanyInvoiceControllerScope} from '../../components/dashboard/settings/modals/payments/edit-company-invoice/edit-company-invoice'
import {IPayoutsPayPalControllerScope} from '../../components/dashboard/settings/modals/payouts/payouts-payPal/payouts-pay-pal'
import {IAddPaymentMethodControllerScope} from '../../components/dashboard/settings/modals/payments/add-payment-method/add-payment-method'
import {
  IGalleryPreviewControllerScope,
  GalleryPreviewController
} from '../../components/profile/profile-header/profile-gallery/modals/preview.controller'

import {
  ClientConsultationDetailsController,
  IClientConsultationDetailsScope
} from '../../components/dashboard/client/activities/modals/consultation-details/consultation-details.controller'
import {
  IExpertConsultationDetailsScope,
  ExpertConsultationDetailsController
} from '../../components/dashboard/expert/activities/modals/consultation-details/consultation-details.controller'
import {
  ExpertPayoutCivilModalConttroller,
  IExpertPayoutCivilModalScope
} from '../../components/dashboard/expert/activities/modals/payout-civil/payout-civil.controller'
import {
  ExpertPayoutCompanyModalController,
  IExpertPayoutCompanyModalScope
} from '../../components/dashboard/expert/activities/modals/payout-company/payout-company.controller'
import {
  IEditExpertProfileScope,
  EditExpertProfileController
} from '../../components/dashboard/expert/manage-profile/modals/edit-expert-profile/edit-expert-profile.controller'
import {
  ExpertEmployeeDetailsModalController,
  IExpertEmployeeDetailsModalScope
} from '../../components/dashboard/expert/employees/modals/employee-details/employee-details.controller'

import {IExpertInviteEmployeesControllerScope} from '../../components/dashboard/expert/activities/modals/invite-employees/invite-employees.controller'
import {
  IClientChargeDetailsParentControllerScope
} from '../../components/dashboard/client/activities/modals/charge-details/charge-details'
import {InvitationsModalController} from '../../components/invitations/modals/invitations/invitations.controller'

// TODO add types for dialogScope Scopes
export class ModalsService {

  /* @ngInject */
  constructor(private $rootScope: IRootScopeService, private dialogService: DialogService) {
  }

  public createIncomingCallModal = (service: GetService, answerCallback: () => void, rejectCallback: () => void) => {
    const dialogScope: IClientCallParentControllerScope = <IClientCallParentControllerScope>this.$rootScope.$new(true)

    dialogScope.service = service
    dialogScope.answerCall = answerCallback
    dialogScope.rejectCall = rejectCallback

    return this.dialogService.openDialog({
      controller: 'clientCallController',
      template: require('common/components/communicator/modals/client-call/client-call.pug')(),
      scope: dialogScope
    })
  }

  public createNoFundsModal = (acceptCallback: () => void, rejectCallback: () => void) => {
    const dialogScope: INoCreditsControllerParentScope =
      <INoCreditsControllerParentScope>this.$rootScope.$new(true)

    dialogScope.reject = acceptCallback
    dialogScope.accept = rejectCallback

    return this.dialogService.openDialog({
      controller: 'noCreditsController',
      template: require('common/components/communicator/modals/no-credits/no-credits.pug')(),
      scope: dialogScope
    })
  }

  public createServiceUnavailableModal = (acceptCallback: () => void, rejectCallback: () => void) => {
    const dialogScope: IUnavailableServiceControllerParentScope =
      <IUnavailableServiceControllerParentScope>this.$rootScope.$new(true)

    dialogScope.reject = acceptCallback
    dialogScope.accept = rejectCallback

    return this.dialogService.openDialog({
      controller: 'unavailableServiceController',
      template: require('common/components/communicator/modals/service-unavailable/service-unavailable.pug')(),
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
      template: require('common/components/communicator/modals/consultation-summary-client/consultation-summary-client.pug')(),
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
      template: require('common/components/communicator/modals/consultation-summary-expert/consultation-summary-expert.pug')(),
      scope: dialogScope
    })
  }

  public createClientSUEActivityDetailsModal = (sueId: string) => {
    if (!sueId) {
      throw new Error('Expected sueId, got ' + sueId)
    }

    const dialogScope: IClientConsultationDetailsScope = <IClientConsultationDetailsScope>this.$rootScope.$new(true)

    dialogScope.sueId = sueId
    return this.dialogService.openDialog({
      controller: ClientConsultationDetailsController,
      template: require('common/components/dashboard/client/activities/modals/consultation-details/consultation-details.pug')(),
      scope: dialogScope
    })
  }

  public createClientComplainReportModal = () => {
    const dialogScope: ng.IScope = this.$rootScope.$new(true)

    return this.dialogService.openDialog({
      controller: 'clientComplainReportController',
      template: require('common/components/dashboard/client/activities/modals/complain-report/complain-report.pug')(),
      scope: dialogScope
    })
  }

  public createClientChargeDetailsModal = (financeActivityDetails: GetActivity) => {
    if (!financeActivityDetails) {
      throw new Error('Expected financeActivityDetails, got ' + financeActivityDetails)
    }

    const dialogScope: IClientChargeDetailsParentControllerScope =
      <IClientChargeDetailsParentControllerScope>this.$rootScope.$new(true)

    dialogScope.financeActivityDetails = financeActivityDetails

    return this.dialogService.openDialog({
      controller: 'clientChargeDetailsController',
      template: require('common/components/dashboard/client/activities/modals/charge-details/charge-details.pug')(),
      scope: dialogScope
    })
  }

  public createBasicAccountSettingsModal = (onModalClose: (cb: () => void) => void) => {
    const dialogScope: IBasicAccountSettingsControllerParentScope =
      <IBasicAccountSettingsControllerParentScope>this.$rootScope.$new(true)
    dialogScope.callback = onModalClose

    return this.dialogService.openDialog({
      controller: 'basicAccountSettingsController',
      template: require('common/components/dashboard/settings/modals/general/basic-account-settings/basic-account-settings.pug')(),
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
      template: require('common/components/dashboard/settings/modals/general/phone-settings/phone-settings.pug')(),
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
      template: require('common/components/dashboard/settings/modals/general/email-settings/email-settings.pug')(),
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
      template: require('common/components/dashboard/settings/modals/general/country-settings/country-settings.pug')(),
      scope: dialogScope
    })
  }

  public createSecurityChangePasswordSettingsModal = () => {
    const dialogScope: ISecurityChangePasswordSettingsControllerScope =
      <ISecurityChangePasswordSettingsControllerScope>this.$rootScope.$new(true)

    return this.dialogService.openDialog({
      controllerAs: 'vm',
      controller: 'securityChangePasswordSettingsController',
      template: require('common/components/dashboard/settings/modals/security/change-password/change-password.pug')(),
      scope: dialogScope
    })
  }

  public createSecurityPinSecuritySettingsModal = () => {
    const dialogScope: ISecurityPinNumberSettingsControllerScope =
      <ISecurityPinNumberSettingsControllerScope>this.$rootScope.$new(true)

    return this.dialogService.openDialog({
      controllerAs: 'vm',
      controller: 'securityPinNumberSettingsController',
      template: require('common/components/dashboard/settings/modals/security/pin-number/pin-number.pug')(),
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
      template: require('common/components/dashboard/settings/modals/payments/add-payment-method/add-payment-method.pug')(),
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
      template: require('common/components/dashboard/settings/modals/payments/edit-company-invoice/edit-company-invoice.pug')(),
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
      template: require('common/components/dashboard/settings/modals/payouts/payouts-payPal/payouts-pay-pal.pug')(),
      scope: dialogScope
    })
  }

  public createGalleryPreviewControllerModal = (preview: string) => {
    const dialogScope: IGalleryPreviewControllerScope =
      <IGalleryPreviewControllerScope>this.$rootScope.$new(true)

    dialogScope.preview = preview

    return this.dialogService.openDialog({
      controllerAs: 'vm',
      controller: GalleryPreviewController,
      template: require('common/components/profile/profile-header/profile-gallery/modals/preview.pug')(),
      scope: dialogScope
    })
  }

  public createExpertSUEActivityDetailsModal = (sueId: string) => {
    if (!sueId) {
      throw new Error('Expected sueId, got ' + sueId)
    }

    const dialogScope: IExpertConsultationDetailsScope = <IExpertConsultationDetailsScope>this.$rootScope.$new(true)

    dialogScope.sueId = sueId
    return this.dialogService.openDialog({
      controller: ExpertConsultationDetailsController,
      template: require('common/components/dashboard/expert/activities/modals/consultation-details/consultation-details.pug')(),
      scope: dialogScope
    })
  }

  public createExpertPayoutCivilModal = (sueId: string) => {
    if (!sueId) {
      throw new Error('Expected sueId, got ' + sueId)
    }

    const dialogScope: IExpertPayoutCivilModalScope = <IExpertPayoutCivilModalScope>this.$rootScope.$new(true)

    dialogScope.sueId = sueId
    return this.dialogService.openDialog({
      controller: ExpertPayoutCivilModalConttroller,
      template: require('common/components/dashboard/expert/activities/modals/payout-civil/payout-civil.pug')(),
      scope: dialogScope
    })
  }

  public createExpertPayoutCompanyModal = (sueId: string) => {
    if (!sueId) {
      throw new Error('Expected sueId, got ' + sueId)
    }

    const dialogScope: IExpertPayoutCompanyModalScope = <IExpertPayoutCompanyModalScope>this.$rootScope.$new(true)

    dialogScope.sueId = sueId
    return this.dialogService.openDialog({
      controller: ExpertPayoutCompanyModalController,
      template: require('common/components/dashboard/expert/activities/modals/payout-company/payout-company.pug')(),
      scope: dialogScope
    })
  }

  public createExpertEmployeeDetailsModal = (sueId: string) => {
    if (!sueId) {
      throw new Error('Expected sueId, got ' + sueId)
    }

    const dialogScope: IExpertEmployeeDetailsModalScope = <IExpertEmployeeDetailsModalScope>this.$rootScope.$new(true)

    dialogScope.sueId = sueId
    return this.dialogService.openDialog({
      controller: ExpertEmployeeDetailsModalController,
      template: require('common/components/dashboard/expert/employees/modals/employee-details/employee-details.pug')(),
      scope: dialogScope
    })
  }

  public createExpertInviteEmployeesModal = () => {
    const dialogScope: IExpertInviteEmployeesControllerScope =
      <IExpertInviteEmployeesControllerScope>this.$rootScope.$new(true)

    return this.dialogService.openDialog({
      controllerAs: 'vm',
      controller: 'expertInviteEmployees',
      template: require('common/components/dashboard/expert/activities/modals/invite-employees/invite-employees.pug')(),
      scope: dialogScope
    })
  }

  public createInvitationsModal = () => {
    const dialogScope: IExpertInviteEmployeesControllerScope =
      <IExpertInviteEmployeesControllerScope>this.$rootScope.$new(true)

    return this.dialogService.openDialog({
      controllerAs: 'vm',
      controller: InvitationsModalController,
      template: require('common/components/invitations/modals/invitations/invitations.pug')(),
      scope: dialogScope
    })
  }

  public createManageProfileEditProfileModal = () => {
    const dialogScope: IEditExpertProfileScope =
      <IEditExpertProfileScope>this.$rootScope.$new(true)

    return this.dialogService.openDialog({
      controllerAs: 'vm',
      controller: EditExpertProfileController,
      template: require('common/components/dashboard/expert/manage-profile/modals/edit-expert-profile/edit-expert-profile.pug')(),
      scope: dialogScope
    })
  }

}
