// tslint:disable:no-implicit-dependencies
// tslint:disable:newline-before-return
// tslint:disable:deprecation
// tslint:disable: max-file-line-count
import {
  GetService, GetClientActivity, MoneyDto, GetCreditCard, GetPaymentOptions, PaymentLink, GetProfile,
  GetProfileWithServicesInvitations, GetCompanyInvoiceDetails, GetExpertSueDetails
} from 'profitelo-api-ng/model/models';
import { DialogService } from '../dialog/dialog.service';
import {
  IBasicAccountSettingsControllerParentScope
} from '../../components/dashboard/settings/modals/general/basic-account-settings/basic-account-settings';
import {
  IGeneralEmailSettingsControllerScope
} from '../../components/dashboard/settings/modals/general/email-settings/email-settings';
import {
  IGeneralCountrySettingsControllerScope
} from '../../components/dashboard/settings/modals/general/country-settings/country-settings';
import {
  ISecurityChangePasswordSettingsControllerScope
} from '../../components/dashboard/settings/modals/security/change-password/change-password';
import {
  ISecurityPinNumberSettingsControllerScope
} from '../../components/dashboard/settings/modals/security/pin-number/pin-number';
import {
  IEditCompanyInvoiceControllerScope
} from '../../components/dashboard/settings/modals/payments/edit-company-invoice/edit-company-invoice';
import {
  ClientConsultationDetailsController,
  IClientConsultationDetailsScope
} from '../../components/dashboard/client/activities/modals/consultation-details/consultation-details.controller';
import {
  IExpertConsultationDetailsScope,
  ExpertConsultationDetailsController
} from '../../components/dashboard/expert/activities/modals/consultation-details/consultation-details.controller';
import {
  ExpertPayoutCivilModalConttroller,
  IExpertPayoutCivilModalScope
} from '../../components/dashboard/expert/activities/modals/payout-civil/payout-civil.controller';
import {
  ExpertPayoutCompanyModalController,
  IExpertPayoutCompanyModalScope
} from '../../components/dashboard/expert/activities/modals/payout-company/payout-company.controller';
import {
  IEditExpertProfileScope,
  EditExpertProfileController
// tslint:disable-next-line: max-line-length
} from '../../components/dashboard/expert/manage-profile/modals/edit-expert-profile/edit-expert-profile.controller';
import {
  ExpertEmployeeDetailsModalController,
  IExpertEmployeeDetailsModalScope
} from '../../components/dashboard/expert/employees/modals/employee-details/employee-details.controller';

import {
  IClientChargeDetailsParentControllerScope
} from '../../components/dashboard/client/activities/modals/charge-details/charge-details';

import {
  GalleryPreviewController,
  IGalleryPreviewControllerScope
} from '../../components/interface/profile-gallery/modals/preview.controller';

import {
  IExpertInviteEmployeesControllerScope
} from '../../components/dashboard/expert/employees/modals/invite-employees/invite-employees.controller';
import {
  InvitationsModalController, IInvitationsModalScope
}
  from '../../../app/invitations/modal/invitations.controller';
import {
  IPrecallModalControllerScope,
  PrecallModalController
} from '../../components/communicator/modals/precall/precall.controller';
import {
  IRtcDetectorModalControllerScope,
  RtcDetectorModalController
} from '../../components/communicator/modals/rtc-detector/rtc-detector.controller';
import {
  ConsultationSummaryExpertController,
  IConsultationSummaryExpertControllerScope
} from '../../components/communicator/modals/consultation-summary-expert/consultation-summary-expert.controller';
import {
  IPhoneSettingsControllerScope
} from '../../components/dashboard/settings/modals/general/phone-settings/phone-settings.controller';
import { IModalInstanceService } from 'angular-ui-bootstrap';
import {
  IChargeAccountScope, ChargeAccountController
}
  from '../../../app/charge-account/modal/charge-account.controller';
import {
  ExpertIncomingCallController,
  IExpertIncomingCallParentControllerScope
} from '../../components/communicator/modals/expert-incoming-call/expert-incoming-call.controller';
import {
  IRtcDetectorBlockedModalControllerScope,
  RtcDetectorBlockedModalController
} from '../../components/communicator/modals/rtc-detector/rtc-detector-blocked/rtc-detector-blocked.controller';
import {
  IRtcDetectorNoBrowserSupportModalControllerScope,
  RtcDetectorNoBrowserSupportModalController
// tslint:disable-next-line: max-line-length
} from '../../components/communicator/modals/rtc-detector/rtc-detector-no-browser-support/rtc-detector-no-browser-support.controller';
import {
  ConsultationModalController,
  IConsultationModalControllerScope
} from '../../components/search/modals/consultation/consultation.controller';
import {
  ServiceFormModalController,
  IServiceFormModalScope
} from
  '../../components/dashboard/expert/manage-profile/modals/service-form-modal/service-form-modal.controller';
import { IRootScopeService } from '../root-scope/root-scope.service';
import { INoCreditsControllerParentScope } from '../../components/communicator/modals/no-credits/no-credits';
import {
  IUnavailableServiceControllerParentScope
} from '../../components/communicator/modals/service-unavailable/service-unavailable';
import {
  IPayoutsModalControllerScope
} from '../../components/dashboard/settings/modals/payouts/payouts-methods/payouts-methods.controller';
import {
  IAddPaymentMethodControllerScope
} from '../../components/dashboard/settings/modals/payments/add-payment-method/add-payment-method';
import { ConfirmAlertController, IConfirmAlertScope } from '../../controllers/confirm-alert/confirm-alert.controller';
import { IInfoAlertScope, InfoAlertController } from '../../controllers/info-alert/info-alert.controller';
import {
  ICompanyInvoiceDetailsModalControllerScope,
  CompanyInvoiceDetailsModalController
} from '../../components/dashboard/settings/modals/payouts/company-invoice-details/company-invoice-details.controller';
import { ExpertProfileWithDocuments, ServiceWithOwnerProfile } from '@anymind-ng/api';
import { OrganizationProfileWithDocuments } from '@anymind-ng/api/model/organizationProfileWithDocuments';

// TODO add types for dialogScope Scopes
// tslint:disable:member-ordering
export class ModalsService {

  public static $inject = ['$rootScope', 'dialogService'];

  constructor(private $rootScope: IRootScopeService, private dialogService: DialogService) {
  }

  public createIncomingCallModal = (expertSueDetails: GetExpertSueDetails,
                                    answerCallback: ($uibModalInstance: ng.ui.bootstrap.IModalServiceInstance) => void,
                                    rejectCallback: ($uibModalInstance: ng.ui.bootstrap.IModalServiceInstance) => void)
    : IModalInstanceService => {
    const dialogScope: IExpertIncomingCallParentControllerScope =
      <IExpertIncomingCallParentControllerScope>this.$rootScope.$new(true);

    dialogScope.expertSueDetails = expertSueDetails;
    dialogScope.answerCall = answerCallback;
    dialogScope.rejectCall = rejectCallback;

    return this.dialogService.openDialog({
      controllerAs: 'vm',
      controller: ExpertIncomingCallController,
      windowClass: 'modal-open full-screen modal-dark',
      template: require(
        'angularjs/common/components/communicator/modals/expert-incoming-call/expert-incoming-call.html'),
      scope: dialogScope
    });
  }

  public createNoFundsModal = (acceptCallback: () => void, rejectCallback: () => void): IModalInstanceService => {
    const dialogScope: INoCreditsControllerParentScope =
      <INoCreditsControllerParentScope>this.$rootScope.$new(true);

    dialogScope.reject = acceptCallback;
    dialogScope.accept = rejectCallback;

    return this.dialogService.openDialog({
      controller: 'noCreditsController',
      template: require('angularjs/common/components/communicator/modals/no-credits/no-credits.html'),
      scope: dialogScope
    });
  }

  public createServiceUnavailableModal = (acceptCallback: () => void,
                                          rejectCallback: () => void): IModalInstanceService => {
    const dialogScope: IUnavailableServiceControllerParentScope =
      <IUnavailableServiceControllerParentScope>this.$rootScope.$new(true);

    dialogScope.reject = acceptCallback;
    dialogScope.accept = rejectCallback;

    return this.dialogService.openDialog({
      controller: 'unavailableServiceController',
      template: require('angularjs/common/components/communicator/modals/service-unavailable/service-unavailable.html'),
      scope: dialogScope
    });
  }

  public createExpertConsultationSummaryModal = (serviceUsageEventId: string): IModalInstanceService => {
    if (!serviceUsageEventId) {
      throw new Error('Expected serviceUsageEventId, got ' + serviceUsageEventId);
    }

    const dialogScope: IConsultationSummaryExpertControllerScope =
      <IConsultationSummaryExpertControllerScope>this.$rootScope.$new(true);

    dialogScope.serviceUsageEventId = serviceUsageEventId;

    return this.dialogService.openDialog({
      controller: ConsultationSummaryExpertController,
      template: require(
        'angularjs/common/components/communicator/modals/consultation-summary-expert/consultation-summary-expert.html'
      ),
      scope: dialogScope
    });
  }

  public createClientSUEActivityDetailsModal = (sueId: string): IModalInstanceService => {
    if (!sueId) {
      throw new Error('Expected sueId, got ' + sueId);
    }

    const dialogScope: IClientConsultationDetailsScope = <IClientConsultationDetailsScope>this.$rootScope.$new(true);

    dialogScope.sueId = sueId;
    return this.dialogService.openDialog({
      controller: ClientConsultationDetailsController,
      template: require(
        'angularjs/common/components/dashboard/client/activities/modals/consultation-details/consultation-details.html'
      ),
      scope: dialogScope
    });
  }

  public createClientComplainReportModal = (): IModalInstanceService => {
    const dialogScope: ng.IScope = this.$rootScope.$new(true);

    return this.dialogService.openDialog({
      controller: 'clientComplainReportController',
      template: require(
        'angularjs/common/components/dashboard/client/activities/modals/complain-report/complain-report.html'),
      scope: dialogScope
    });
  }

  public createClientChargeDetailsModal = (financeActivityDetails: GetClientActivity): IModalInstanceService => {
    if (!financeActivityDetails) {
      throw new Error('Expected financeActivityDetails, got ' + String(financeActivityDetails));
    }

    const dialogScope: IClientChargeDetailsParentControllerScope =
      <IClientChargeDetailsParentControllerScope>this.$rootScope.$new(true);

    dialogScope.financeActivityDetails = financeActivityDetails;

    return this.dialogService.openDialog({
      controller: 'clientChargeDetailsController',
      template: require(
        'angularjs/common/components/dashboard/client/activities/modals/charge-details/charge-details.html'),
      scope: dialogScope
    });
  }

  public createBasicAccountSettingsModal = (onModalClose: (cb: () => void) => void): IModalInstanceService => {
    const dialogScope: IBasicAccountSettingsControllerParentScope =
      <IBasicAccountSettingsControllerParentScope>this.$rootScope.$new(true);
    dialogScope.callback = onModalClose;

    return this.dialogService.openDialog({
      controller: 'basicAccountSettingsController',
      template: require(
        'angularjs/common/components/dashboard/settings/modals/general/' +
        'basic-account-settings/basic-account-settings.html'),
      scope: dialogScope
    });
  }

  public createGeneralPhoneSettingsModal = (onModalClose: (cb: () => void) => void): IModalInstanceService => {
    const dialogScope: IPhoneSettingsControllerScope =
      <IPhoneSettingsControllerScope>this.$rootScope.$new(true);
    dialogScope.callback = onModalClose;

    return this.dialogService.openDialog({
      controllerAs: 'vm',
      windowClass: 'modal-open',
      controller: 'phoneSettingsController',
      template: require(
        'angularjs/common/components/dashboard/settings/modals/general/phone-settings/phone-settings.html'),
      scope: dialogScope
    });
  }

  public createGeneralEmailSettingsModal = (onModalClose: (cb: () => void) => void): IModalInstanceService => {
    const dialogScope: IGeneralEmailSettingsControllerScope =
      <IGeneralEmailSettingsControllerScope>this.$rootScope.$new(true);
    dialogScope.callback = onModalClose;

    return this.dialogService.openDialog({
      controllerAs: 'vm',
      windowClass: 'modal-open',
      controller: 'generalEmailSettingsController',
      template: require(
        'angularjs/common/components/dashboard/settings/modals/general/email-settings/email-settings.html'),
      scope: dialogScope
    });
  }

  public createGeneralCountrySettingsModal = (onModalClose: (cb: () => void) => void): IModalInstanceService => {
    const dialogScope: IGeneralCountrySettingsControllerScope =
      <IGeneralCountrySettingsControllerScope>this.$rootScope.$new(true);

    dialogScope.callback = onModalClose;
    return this.dialogService.openDialog({
      controllerAs: 'vm',
      controller: 'generalCountrySettingsController',
      template: require(
        'angularjs/common/components/dashboard/settings/modals/general/country-settings/country-settings.html'),
      scope: dialogScope
    });
  }

  public createSecurityChangePasswordSettingsModal = (): IModalInstanceService => {
    const dialogScope: ISecurityChangePasswordSettingsControllerScope =
      <ISecurityChangePasswordSettingsControllerScope>this.$rootScope.$new(true);

    return this.dialogService.openDialog({
      controllerAs: 'vm',
      windowClass: 'modal-open',
      controller: 'securityChangePasswordSettingsController',
      template: require(
        'angularjs/common/components/dashboard/settings/modals/security/change-password/change-password.html'),
      scope: dialogScope
    });
  }

  public createSecurityPinSecuritySettingsModal = (): IModalInstanceService => {
    const dialogScope: ISecurityPinNumberSettingsControllerScope =
      <ISecurityPinNumberSettingsControllerScope>this.$rootScope.$new(true);

    return this.dialogService.openDialog({
      controllerAs: 'vm',
      controller: 'securityPinNumberSettingsController',
      template: require('angularjs/common/components/dashboard/settings/modals/security/pin-number/pin-number.html'),
      scope: dialogScope
    });
  }

  public createAddPaymentMethodControllerModal = (onModalClose: () => void): IModalInstanceService => {
    const dialogScope: IAddPaymentMethodControllerScope =
      <IAddPaymentMethodControllerScope>this.$rootScope.$new(true);

    dialogScope.callback = onModalClose;
    return this.dialogService.openDialog({
      controllerAs: 'vm',
      controller: 'addPaymentMethodController',
      template: require(
        'angularjs/common/components/dashboard/settings/modals/payments/add-payment-method/add-payment-method.html'
      ),
      scope: dialogScope
    });
  }

  public createEditCompanyInvoiceControllerModal = (onModalClose: () => void): IModalInstanceService => {
    const dialogScope: IEditCompanyInvoiceControllerScope =
      <IEditCompanyInvoiceControllerScope>this.$rootScope.$new(true);

    dialogScope.callback = onModalClose;
    return this.dialogService.openDialog({
      controllerAs: 'vm',
      windowClass: 'modal-open full-screen',
      controller: 'editCompanyInvoiceController',
      template: require(
        'angularjs/common/components/dashboard/settings/modals/payments/edit-company-invoice/edit-company-invoice.html'
      ),
      scope: dialogScope
    });
  }

  public createPayoutsMethodControllerModal = (onModalClose: () => void): IModalInstanceService => {
    const dialogScope: IPayoutsModalControllerScope =
      <IPayoutsModalControllerScope>this.$rootScope.$new(true);

    dialogScope.onModalCloseCallback = onModalClose;

    return this.dialogService.openDialog({
      controllerAs: 'vm',
      controller: 'payoutsMethodsModalController',
      windowClass: 'modal-open',
      template: require(
        'angularjs/common/components/dashboard/settings/modals/payouts/payouts-methods/payouts-methods.html'),
      scope: dialogScope
    });
  }

  public createGalleryPreviewControllerModal = (preview: string): IModalInstanceService => {
    const dialogScope: IGalleryPreviewControllerScope =
      <IGalleryPreviewControllerScope>this.$rootScope.$new(true);

    dialogScope.preview = preview;

    return this.dialogService.openDialog({
      controllerAs: 'vm',
      controller: GalleryPreviewController,
      template: require('angularjs/common/components/interface/profile-gallery/modals/preview.html'),
      scope: dialogScope
    });
  }

  public createExpertSUEActivityDetailsModal = (sueId: string): IModalInstanceService => {
    if (!sueId) {
      throw new Error('Expected sueId, got ' + sueId);
    }

    const dialogScope: IExpertConsultationDetailsScope = <IExpertConsultationDetailsScope>this.$rootScope.$new(true);

    dialogScope.sueId = sueId;
    return this.dialogService.openDialog({
      controller: ExpertConsultationDetailsController,
      template: require(
        'angularjs/common/components/dashboard/expert/activities/modals/consultation-details/consultation-details.html'
      ),
      scope: dialogScope
    });
  }

  public createExpertPayoutCivilModal = (sueId: string): IModalInstanceService => {
    if (!sueId) {
      throw new Error('Expected sueId, got ' + sueId);
    }

    const dialogScope: IExpertPayoutCivilModalScope = <IExpertPayoutCivilModalScope>this.$rootScope.$new(true);

    dialogScope.sueId = sueId;
    return this.dialogService.openDialog({
      controller: ExpertPayoutCivilModalConttroller,
      template: require(
        'angularjs/common/components/dashboard/expert/activities/modals/payout-civil/payout-civil.html'),
      scope: dialogScope
    });
  }

  public createExpertPayoutCompanyModal = (sueId: string): IModalInstanceService => {
    if (!sueId) {
      throw new Error('Expected sueId, got ' + sueId);
    }

    const dialogScope: IExpertPayoutCompanyModalScope = <IExpertPayoutCompanyModalScope>this.$rootScope.$new(true);

    dialogScope.sueId = sueId;
    return this.dialogService.openDialog({
      controller: ExpertPayoutCompanyModalController,
      template: require('angularjs/common/components/dashboard/expert/activities/modals/' +
        'payout-company/payout-company.html'),
      scope: dialogScope
    });
  }

  public createExpertEmployeeDetailsModal = (sueId: string): IModalInstanceService => {
    if (!sueId) {
      throw new Error('Expected sueId, got ' + sueId);
    }

    const dialogScope: IExpertEmployeeDetailsModalScope = <IExpertEmployeeDetailsModalScope>this.$rootScope.$new(true);

    dialogScope.sueId = sueId;
    return this.dialogService.openDialog({
      controller: ExpertEmployeeDetailsModalController,
      template: require('angularjs/common/components/dashboard/expert/employees/modals/' +
        'employee-details/employee-details.html'),
      scope: dialogScope
    });
  }

  public createExpertInviteEmployeesModal = (onModalClose: () => void): IModalInstanceService => {
    const dialogScope: IExpertInviteEmployeesControllerScope =
      <IExpertInviteEmployeesControllerScope>this.$rootScope.$new(true);
    dialogScope.onModalCloseCallback = onModalClose;

    return this.dialogService.openDialog({
      controllerAs: 'vm',
      windowClass: 'modal-open',
      controller: 'expertInviteEmployees',
      template: require('angularjs/common/components/dashboard/expert/employees/modals/' +
        'invite-employees/invite-employees.html'),
      scope: dialogScope
    });
  }

  public createInvitationsModal =
    (profileWithServicesInvitations?: GetProfileWithServicesInvitations): IModalInstanceService => {
      const dialogScope: IInvitationsModalScope =
        <IInvitationsModalScope>this.$rootScope.$new(true);
      dialogScope.profileWithServicesInvitations = profileWithServicesInvitations;
      return this.dialogService.openDialog({
        controllerAs: 'vm',
        controller: InvitationsModalController,
        template: require('angularjs/app/invitations/modal/invitations.html'),
        scope: dialogScope
      });
    }

  public createChargeAccountModal = (currentStateName?: string, paymentsOptions?: GetPaymentOptions,
                                     creditCards?: GetCreditCard[], paymentsLinks?: PaymentLink[],
                                     financeBalance?: MoneyDto): IModalInstanceService => {
    const dialogScope: IChargeAccountScope =
      <IChargeAccountScope>this.$rootScope.$new(true);
    dialogScope.currentState = currentStateName;
    dialogScope.paymentsOptions = paymentsOptions;
    dialogScope.creditCards = creditCards;
    dialogScope.paymentsLinks = paymentsLinks;
    dialogScope.financeBalance = financeBalance;

    return this.dialogService.openDialog({
      controllerAs: 'vm',
      windowClass: 'modal-open full-screen',
      controller: ChargeAccountController,
      template: require('angularjs/app/charge-account/modal/charge-account.html'),
      scope: dialogScope
    });
  }

  public createManageProfileEditProfileModal =
    (profile: ExpertProfileWithDocuments | OrganizationProfileWithDocuments,
     onModalClose: () => void): IModalInstanceService => {
      const dialogScope: IEditExpertProfileScope =
        <IEditExpertProfileScope>this.$rootScope.$new(true);
      dialogScope.profile = profile;
      dialogScope.onModalCloseCallback = onModalClose;

      return this.dialogService.openDialog({
        controllerAs: 'vm',
        controller: EditExpertProfileController,
        template: require('angularjs/common/components/dashboard/expert/manage-profile/' +
          'modals/edit-expert-profile/edit-expert-profile.html'),
        scope: dialogScope
      });
    }

  public createPrecallModal = (service: GetService, owner: GetProfile, stream: MediaStream): IModalInstanceService => {
    const dialogScope: IPrecallModalControllerScope =
      <IPrecallModalControllerScope>this.$rootScope.$new(true);

    dialogScope.service = service;
    dialogScope.owner = owner;
    dialogScope.stream = stream;

    return this.dialogService.openDialog({
      controllerAs: 'vm',
      controller: PrecallModalController,
      template: require('angularjs/common/components/communicator/modals/precall/precall.html'),
      scope: dialogScope
    });
  }

  public createRtcDetectorModal = (): IModalInstanceService => {
    const dialogScope: IRtcDetectorModalControllerScope =
      <IRtcDetectorModalControllerScope>this.$rootScope.$new(true);

    return this.dialogService.openDialog({
      controllerAs: 'vm',
      controller: RtcDetectorModalController,
      template: require('angularjs/common/components/communicator/modals/rtc-detector/rtc-detector.html'),
      scope: dialogScope
    });
  }

  public createRtcDetectorBlockedModal = (): IModalInstanceService => {
    const dialogScope: IRtcDetectorBlockedModalControllerScope =
      <IRtcDetectorBlockedModalControllerScope>this.$rootScope.$new(true);

    return this.dialogService.openDialog({
      controllerAs: 'vm',
      controller: RtcDetectorBlockedModalController,
      template: require('angularjs/common/components/communicator/modals/rtc-detector/rtc-detector-blocked/' +
        'rtc-detector-blocked.html'),
      scope: dialogScope
    });
  }

  public createBrowserDoesNotSupportRtcModal = (): IModalInstanceService => {
    const dialogScope: IRtcDetectorNoBrowserSupportModalControllerScope =
      <IRtcDetectorNoBrowserSupportModalControllerScope>this.$rootScope.$new(true);

    return this.dialogService.openDialog({
      controllerAs: 'vm',
      windowClass: 'modal-open full-screen',
      controller: RtcDetectorNoBrowserSupportModalController,
      template: require('angularjs/common/components/communicator/modals/rtc-detector/' +
        'rtc-detector-no-browser-support/rtc-detector-no-browser-support.html'),
      scope: dialogScope
    });
  }

  public createConsultationModal = (): IModalInstanceService => {

    const dialogScope: IConsultationModalControllerScope =
      <IConsultationModalControllerScope>this.$rootScope.$new(true);

    return this.dialogService.openDialog({
      controller: ConsultationModalController,
      template: require(
        'angularjs/common/components/search/modals/consultation/consultation.html'
      ),
      scope: dialogScope
    });
  }

  public createServiceFormModal = (onModalClose: () => void,
                                   service?: ServiceWithOwnerProfile): IModalInstanceService => {

    const dialogScope: IServiceFormModalScope =
      <IServiceFormModalScope>this.$rootScope.$new(true);
    dialogScope.onModalCloseCallback = onModalClose;
    dialogScope.serviceDetails = service;

    return this.dialogService.openDialog({
      controllerAs: 'vm',
      windowClass: 'modal-open',
      controller: ServiceFormModalController,
      template: require(
        'angularjs/common/components/dashboard/expert/manage-profile/modals/service-form-modal/service-form-modal.html'
      ),
      scope: dialogScope
    });
  }

  public createConfirmAlertModal = (translationMessage: string,
                                    onConfirm: () => void,
                                    onCancel?: () => void,
                                    translationConfirmButtonMessage?: string): IModalInstanceService => {

    const dialogScope: IConfirmAlertScope =
      <IConfirmAlertScope>this.$rootScope.$new(true);
    dialogScope.onCancel = onCancel;
    dialogScope.translationMessage = translationMessage;
    dialogScope.onConfirm = onConfirm;
    dialogScope.translationConfirmButtonMessage = translationConfirmButtonMessage;

    return this.dialogService.openDialog({
      controllerAs: 'vm',
      windowClass: 'modal-open',
      controller: ConfirmAlertController,
      template: require(
        'angularjs/common/controllers/confirm-alert/confirm-alert.html'
      ),
      scope: dialogScope
    });
  }

  public createInfoAlertModal = (translationMessage: string,
                                 onModalClose?: () => void): IModalInstanceService => {

    const dialogScope: IInfoAlertScope =
      <IInfoAlertScope>this.$rootScope.$new(true);
    dialogScope.onModalClose = onModalClose;
    dialogScope.translationMessage = translationMessage;

    return this.dialogService.openDialog({
      controllerAs: 'vm',
      windowClass: 'modal-open',
      controller: InfoAlertController,
      template: require(
        'angularjs/common/controllers/info-alert/info-alert.html'
      ),
      scope: dialogScope
    });
  }

  public createCompanyInvoiceDetailsModal =
    (onModalClose: () => void, companyInvoiceDetails?: GetCompanyInvoiceDetails): IModalInstanceService => {

      const dialogScope: ICompanyInvoiceDetailsModalControllerScope =
        <ICompanyInvoiceDetailsModalControllerScope>this.$rootScope.$new(true);
      dialogScope.onModalCloseCallback = onModalClose;
      dialogScope.companyInvoiceDetails = companyInvoiceDetails;

      return this.dialogService.openDialog({
        controllerAs: 'vm',
        windowClass: 'modal-open',
        controller: CompanyInvoiceDetailsModalController,
        template: require(
          'angularjs/common/components/dashboard/settings/modals/' +
          'payouts/company-invoice-details/company-invoice-details.html'),
        scope: dialogScope
      });
    }

}
