// tslint:disable: max-file-line-count
import IRootScopeService = profitelo.services.rootScope.IRootScopeService
import IUnavailableServiceControllerParentScope =
  profitelo.components.communicator.modals.serviceUnavailable.IUnavailableServiceControllerParentScope
import INoCreditsControllerParentScope =
  profitelo.components.communicator.modals.noCredits.INoCreditsControllerParentScope
import {
  GetService, GetActivity, GetInvitation, MoneyDto, GetCreditCard, GetPaymentOptions,
  PaymentLink, GetProfile
} from 'profitelo-api-ng/model/models'
import {DialogService} from '../dialog/dialog.service'
import {
  IBasicAccountSettingsControllerParentScope
} from '../../components/dashboard/settings/modals/general/basic-account-settings/basic-account-settings'
import {
  IGeneralEmailSettingsControllerScope
} from '../../components/dashboard/settings/modals/general/email-settings/email-settings'
import {
  IGeneralCountrySettingsControllerScope
} from '../../components/dashboard/settings/modals/general/country-settings/country-settings'
import {
  ISecurityChangePasswordSettingsControllerScope
} from '../../components/dashboard/settings/modals/security/change-password/change-password'
import {
  ISecurityPinNumberSettingsControllerScope
} from '../../components/dashboard/settings/modals/security/pin-number/pin-number'
import {
  IEditCompanyInvoiceControllerScope
} from '../../components/dashboard/settings/modals/payments/edit-company-invoice/edit-company-invoice'
import {
  IPayoutsPayPalControllerScope
} from '../../components/dashboard/settings/modals/payouts/payouts-payPal/payouts-pay-pal'
import {
  IAddPaymentMethodControllerScope
} from '../../components/dashboard/settings/modals/payments/add-payment-method/add-payment-method'

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

import {
  IClientChargeDetailsParentControllerScope
} from '../../components/dashboard/client/activities/modals/charge-details/charge-details'

import {
  GalleryPreviewController,
  IGalleryPreviewControllerScope
} from '../../components/interface/profile-gallery/modals/preview.controller'

import {
  IExpertInviteEmployeesControllerScope
} from '../../components/dashboard/expert/activities/modals/invite-employees/invite-employees.controller'
import {InvitationsModalController, IInvitationsModalScope} from '../../../app/invitations/modal/invitations.controller'
import {
  IPrecallModalControllerScope,
  PrecallModalController
} from '../../components/communicator/modals/precall/precall.controller'
import {
  IRtcDetectorModalControllerScope,
  RtcDetectorModalController
} from '../../components/communicator/modals/rtc-detector/rtc-detector.controller'
import {
  ConsultationSummaryExpertController,
  IConsultationSummaryExpertControllerScope
} from '../../components/communicator/modals/consultation-summary-expert/consultation-summary-expert.controller';
import {
  IGeneralPhoneSettingsControllerScope
} from '../../components/dashboard/settings/modals/general/phone-settings/phone-settings.controller';
import {IModalInstanceService} from 'angular-ui-bootstrap'
import {IChargeAccountScope, ChargeAccountController} from '../../../app/charge-account/modal/charge-account.controller'
import {
  ExpertIncomingCallController,
  IExpertIncomingCallParentControllerScope
} from '../../components/communicator/modals/expert-incoming-call/expert-incoming-call.controller'
import {
  IRtcDetectorBlockedModalControllerScope,
  RtcDetectorBlockedModalController
} from '../../components/communicator/modals/rtc-detector/rtc-detector-blocked/rtc-detector-blocked.controller'
import {
  IRtcDetectorNoBrowserSupportModalControllerScope,
  RtcDetectorNoBrowserSupportModalController
// tslint:disable-next-line: max-line-length
} from '../../components/communicator/modals/rtc-detector/rtc-detector-no-browser-support/rtc-detector-no-browser-support.controller'
import {
  ConsultationSummaryClientController,
  IConsultationSummaryClientControllerScope
} from '../../components/communicator/modals/consultation-summary-client/consultation-summary-client.controller'
import {
  ConsultationModalController,
  IConsultationModalControllerScope
} from '../../components/search/modals/consultation/consultation.controller'

// TODO add types for dialogScope Scopes
export class ModalsService {

  /* @ngInject */
  constructor(private $rootScope: IRootScopeService, private dialogService: DialogService) {
  }

  public createIncomingCallModal = (service: GetService, answerCallback: () => void, rejectCallback: () =>
    void): IModalInstanceService => {
    const dialogScope: IExpertIncomingCallParentControllerScope =
      <IExpertIncomingCallParentControllerScope>this.$rootScope.$new(true)

    dialogScope.service = service
    dialogScope.answerCall = answerCallback
    dialogScope.rejectCall = rejectCallback

    return this.dialogService.openDialog({
      controllerAs: 'vm',
      controller: ExpertIncomingCallController,
      openedClass: 'modal-open full-screen modal-dark',
      template: require('common/components/communicator/modals/expert-incoming-call/expert-incoming-call.pug')(),
      scope: dialogScope
    })
  }

  public createNoFundsModal = (acceptCallback: () => void, rejectCallback: () => void): IModalInstanceService => {
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

  public createServiceUnavailableModal = (acceptCallback: () => void,
                                          rejectCallback: () => void): IModalInstanceService => {
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

  public createClientConsultationSummaryModal = (serviceId: string): IModalInstanceService => {
    if (!serviceId) {
      throw new Error('Expected serviceId, got ' + serviceId)
    }

    const dialogScope: IConsultationSummaryClientControllerScope =
      <IConsultationSummaryClientControllerScope>this.$rootScope.$new(true)

    dialogScope.serviceId = serviceId

    return this.dialogService.openDialog({
      controller: ConsultationSummaryClientController,
      template: require(
        'common/components/communicator/modals/consultation-summary-client/consultation-summary-client.pug'
      )(),
      scope: dialogScope
    })
  }

  public createExpertConsultationSummaryModal = (serviceId: string): IModalInstanceService => {
    if (!serviceId) {
      throw new Error('Expected serviceId, got ' + serviceId)
    }

    const dialogScope: IConsultationSummaryExpertControllerScope =
      <IConsultationSummaryExpertControllerScope>this.$rootScope.$new(true)

    dialogScope.serviceId = serviceId

    return this.dialogService.openDialog({
      controller: ConsultationSummaryExpertController,
      template: require(
        'common/components/communicator/modals/consultation-summary-expert/consultation-summary-expert.pug'
      )(),
      scope: dialogScope
    })
  }

  public createClientSUEActivityDetailsModal = (sueId: string): IModalInstanceService => {
    if (!sueId) {
      throw new Error('Expected sueId, got ' + sueId)
    }

    const dialogScope: IClientConsultationDetailsScope = <IClientConsultationDetailsScope>this.$rootScope.$new(true)

    dialogScope.sueId = sueId
    return this.dialogService.openDialog({
      controller: ClientConsultationDetailsController,
      template: require(
        'common/components/dashboard/client/activities/modals/consultation-details/consultation-details.pug'
      )(),
      scope: dialogScope
    })
  }

  public createClientComplainReportModal = (): IModalInstanceService => {
    const dialogScope: ng.IScope = this.$rootScope.$new(true)

    return this.dialogService.openDialog({
      controller: 'clientComplainReportController',
      template: require('common/components/dashboard/client/activities/modals/complain-report/complain-report.pug')(),
      scope: dialogScope
    })
  }

  public createClientChargeDetailsModal = (financeActivityDetails: GetActivity): IModalInstanceService => {
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

  public createBasicAccountSettingsModal = (onModalClose: (cb: () => void) => void): IModalInstanceService => {
    const dialogScope: IBasicAccountSettingsControllerParentScope =
      <IBasicAccountSettingsControllerParentScope>this.$rootScope.$new(true)
    dialogScope.callback = onModalClose

    return this.dialogService.openDialog({
      controller: 'basicAccountSettingsController',
      template: require(
        'common/components/dashboard/settings/modals/general/basic-account-settings/basic-account-settings.pug'
      )(),
      scope: dialogScope
    })
  }

  public createGeneralPhoneSettingsModal = (onModalClose: (cb: () => void) => void): IModalInstanceService => {
    const dialogScope: IGeneralPhoneSettingsControllerScope =
      <IGeneralPhoneSettingsControllerScope>this.$rootScope.$new(true)
    dialogScope.callback = onModalClose

    return this.dialogService.openDialog({
      controllerAs: 'vm',
      openedClass: 'modal-open full-screen',
      controller: 'generalPhoneSettingsController',
      template: require('common/components/dashboard/settings/modals/general/phone-settings/phone-settings.pug')(),
      scope: dialogScope
    })
  }

  public createGeneralEmailSettingsModal = (onModalClose: (cb: () => void) => void): IModalInstanceService => {
    const dialogScope: IGeneralEmailSettingsControllerScope =
      <IGeneralEmailSettingsControllerScope>this.$rootScope.$new(true)
    dialogScope.callback = onModalClose

    return this.dialogService.openDialog({
      controllerAs: 'vm',
      openedClass: 'modal-open full-screen',
      controller: 'generalEmailSettingsController',
      template: require('common/components/dashboard/settings/modals/general/email-settings/email-settings.pug')(),
      scope: dialogScope
    })
  }

  public createGeneralCountrySettingsModal = (onModalClose: (cb: () => void) => void): IModalInstanceService => {
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

  public createSecurityChangePasswordSettingsModal = (): IModalInstanceService => {
    const dialogScope: ISecurityChangePasswordSettingsControllerScope =
      <ISecurityChangePasswordSettingsControllerScope>this.$rootScope.$new(true)

    return this.dialogService.openDialog({
      controllerAs: 'vm',
      openedClass: 'modal-open full-screen',
      controller: 'securityChangePasswordSettingsController',
      template: require('common/components/dashboard/settings/modals/security/change-password/change-password.pug')(),
      scope: dialogScope
    })
  }

  public createSecurityPinSecuritySettingsModal = (): IModalInstanceService => {
    const dialogScope: ISecurityPinNumberSettingsControllerScope =
      <ISecurityPinNumberSettingsControllerScope>this.$rootScope.$new(true)

    return this.dialogService.openDialog({
      controllerAs: 'vm',
      controller: 'securityPinNumberSettingsController',
      template: require('common/components/dashboard/settings/modals/security/pin-number/pin-number.pug')(),
      scope: dialogScope
    })
  }

  public createAddPaymentMethodControllerModal = (onModalClose: () => void): IModalInstanceService => {
    const dialogScope: IAddPaymentMethodControllerScope =
      <IAddPaymentMethodControllerScope>this.$rootScope.$new(true)

    dialogScope.callback = onModalClose
    return this.dialogService.openDialog({
      controllerAs: 'vm',
      controller: 'addPaymentMethodController',
      template: require(
        'common/components/dashboard/settings/modals/payments/add-payment-method/add-payment-method.pug'
      )(),
      scope: dialogScope
    })
  }

  public createEditCompanyInvoiceControllerModal = (onModalClose: () => void): IModalInstanceService => {
    const dialogScope: IEditCompanyInvoiceControllerScope =
      <IEditCompanyInvoiceControllerScope>this.$rootScope.$new(true)

    dialogScope.callback = onModalClose
    return this.dialogService.openDialog({
      controllerAs: 'vm',
      openedClass: 'modal-open full-screen',
      controller: 'editCompanyInvoiceController',
      template: require(
        'common/components/dashboard/settings/modals/payments/edit-company-invoice/edit-company-invoice.pug'
      )(),
      scope: dialogScope
    })
  }

  public createPayoutsMethodControllerModal = (onModalClose: () => void): IModalInstanceService => {
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

  public createGalleryPreviewControllerModal = (preview: string): IModalInstanceService => {
    const dialogScope: IGalleryPreviewControllerScope =
      <IGalleryPreviewControllerScope>this.$rootScope.$new(true)

    dialogScope.preview = preview

    return this.dialogService.openDialog({
      controllerAs: 'vm',
      controller: GalleryPreviewController,
      template: require('common/components/interface/profile-gallery/modals/preview.pug')(),
      scope: dialogScope
    })
  }

  public createExpertSUEActivityDetailsModal = (sueId: string): IModalInstanceService => {
    if (!sueId) {
      throw new Error('Expected sueId, got ' + sueId)
    }

    const dialogScope: IExpertConsultationDetailsScope = <IExpertConsultationDetailsScope>this.$rootScope.$new(true)

    dialogScope.sueId = sueId
    return this.dialogService.openDialog({
      controller: ExpertConsultationDetailsController,
      template: require(
        'common/components/dashboard/expert/activities/modals/consultation-details/consultation-details.pug'
      )(),
      scope: dialogScope
    })
  }

  public createExpertPayoutCivilModal = (sueId: string): IModalInstanceService => {
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

  public createExpertPayoutCompanyModal = (sueId: string): IModalInstanceService => {
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

  public createExpertEmployeeDetailsModal = (sueId: string): IModalInstanceService => {
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

  public createExpertInviteEmployeesModal = (): IModalInstanceService => {
    const dialogScope: IExpertInviteEmployeesControllerScope =
      <IExpertInviteEmployeesControllerScope>this.$rootScope.$new(true)

    return this.dialogService.openDialog({
      controllerAs: 'vm',
      controller: 'expertInviteEmployees',
      template: require('common/components/dashboard/expert/activities/modals/invite-employees/invite-employees.pug')(),
      scope: dialogScope
    })
  }

  public createInvitationsModal = (invitation?: GetInvitation):
    IModalInstanceService => {
    const dialogScope: IInvitationsModalScope =
      <IInvitationsModalScope>this.$rootScope.$new(true)
    dialogScope.invitation = invitation
    return this.dialogService.openDialog({
      controllerAs: 'vm',
      controller: InvitationsModalController,
      template: require('app/invitations/modal/invitations.pug')(),
      scope: dialogScope
    })
  }

  public createChargeAccountModal = (currentStateName?: string, paymentsOptions?: GetPaymentOptions,
                                     creditCards?: GetCreditCard[], paymentsLinks?: PaymentLink[],
                                     financeBalance?: MoneyDto): IModalInstanceService => {
    const dialogScope: IChargeAccountScope =
      <IChargeAccountScope>this.$rootScope.$new(true)
    dialogScope.currentState = currentStateName
    dialogScope.paymentsOptions = paymentsOptions
    dialogScope.creditCards = creditCards
    dialogScope.paymentsLinks = paymentsLinks
    dialogScope.financeBalance = financeBalance

    return this.dialogService.openDialog({
      controllerAs: 'vm',
      openedClass: 'modal-open full-screen',
      controller: ChargeAccountController,
      template: require('app/charge-account/modal/charge-account.pug')(),
      scope: dialogScope
    })
  }

  public createManageProfileEditProfileModal = (): IModalInstanceService => {
    const dialogScope: IEditExpertProfileScope =
      <IEditExpertProfileScope>this.$rootScope.$new(true)

    return this.dialogService.openDialog({
      controllerAs: 'vm',
      controller: EditExpertProfileController,
      template: require(
        'common/components/dashboard/expert/manage-profile/modals/edit-expert-profile/edit-expert-profile.pug'
      )(),
      scope: dialogScope
    })
  }

  public createPrecallModal = (service: GetService, owner: GetProfile): IModalInstanceService  => {
    const dialogScope: IPrecallModalControllerScope =
      <IPrecallModalControllerScope>this.$rootScope.$new(true)

    dialogScope.service = service
    dialogScope.owner = owner

    return this.dialogService.openDialog({
      controllerAs: 'vm',
      controller: PrecallModalController,
      template: require('common/components/communicator/modals/precall/precall.pug')(),
      scope: dialogScope
    })
  }

  public createRtcDetectorModal = (): IModalInstanceService => {
    const dialogScope: IRtcDetectorModalControllerScope =
      <IRtcDetectorModalControllerScope>this.$rootScope.$new(true)

    return this.dialogService.openDialog({
      controllerAs: 'vm',
      controller: RtcDetectorModalController,
      template: require('common/components/communicator/modals/rtc-detector/rtc-detector.pug')(),
      scope: dialogScope
    })
  }

  public createRtcDetectorBlockedModal = (): IModalInstanceService => {
    const dialogScope: IRtcDetectorBlockedModalControllerScope =
      <IRtcDetectorBlockedModalControllerScope>this.$rootScope.$new(true)

    return this.dialogService.openDialog({
      controllerAs: 'vm',
      controller: RtcDetectorBlockedModalController,
      template: require('common/components/communicator/modals/rtc-detector/rtc-detector-blocked/' +
        'rtc-detector-blocked.pug')(),
      scope: dialogScope
    })
  }

  public createBrowserDoesNotSupportRtcModal = (): IModalInstanceService => {
    const dialogScope: IRtcDetectorNoBrowserSupportModalControllerScope =
      <IRtcDetectorNoBrowserSupportModalControllerScope>this.$rootScope.$new(true)

    return this.dialogService.openDialog({
      controllerAs: 'vm',
      openedClass: 'modal-open full-screen',
      controller: RtcDetectorNoBrowserSupportModalController,
      template: require('common/components/communicator/modals/rtc-detector/rtc-detector-no-browser-support/' +
        'rtc-detector-no-browser-support.pug')(),
      scope: dialogScope
    })
  }

  public createConsultationModal = (): IModalInstanceService => {

    const dialogScope: IConsultationModalControllerScope =
      <IConsultationModalControllerScope>this.$rootScope.$new(true)

    return this.dialogService.openDialog({
      controller: ConsultationModalController,
      template: require(
        'common/components/search/modals/consultation/consultation.pug'
      )(),
      scope: dialogScope
    })
  }

}
