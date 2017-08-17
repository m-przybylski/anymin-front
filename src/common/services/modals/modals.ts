import * as angular from 'angular'
import {ModalsService} from './modals.service'
import dialogModule from '../dialog/dialog'
import '../../components/communicator/modals/service-unavailable/service-unavailable'
import '../../components/communicator/modals/no-credits/no-credits'
import '../../components/dashboard/client/activities/modals/complain-report/complain-report'
import '../../components/dashboard/client/activities/modals/charge-details/charge-details'
import '../../components/dashboard/client/activities/modals/consultation-details/consultation-details'
import '../../components/dashboard/expert/activities/modals/consultation-details/consultation-details'
import '../../components/dashboard/settings/modals/general/basic-account-settings/basic-account-settings'
import '../../components/dashboard/settings/modals/general/phone-settings/phone-settings'
import '../../components/dashboard/settings/modals/general/email-settings/email-settings'
import '../../components/dashboard/settings/modals/general/country-settings/country-settings'
import '../../components/dashboard/settings/modals/security/change-password/change-password'
import '../../components/dashboard/settings/modals/security/pin-number/pin-number'
import '../../components/dashboard/settings/modals/payments/add-payment-method/add-payment-method'
import '../../components/dashboard/settings/modals/payments/edit-company-invoice/edit-company-invoice'
import '../../components/dashboard/settings/modals/payouts/payouts-payPal/payouts-pay-pal'
import '../../directives/interface/scrollable/scrollable'
import '../../constants/style.constant'
import '../../components/interface/multiselect/multiselect'
import callSummaryModule from '../call-summary/call-summary'
import '../../components/interface/preloader/preloader'
import '../../components/dashboard/expert/activities/modals/consultation-details/consultation-details'
import expertEmployeeDetailsModalModule
  from '../../components/dashboard/expert/employees/modals/employee-details/employee-details'
import expertInviteEmployeesModule
  from '../../components/dashboard/expert/activities/modals/invite-employees/invite-employees'
import manageProfileEditProfileModule
  from '../../components/dashboard/expert/manage-profile/modals/edit-expert-profile/edit-expert-profile'

import profileGalleryPreviewModule from '../../components/interface/profile-gallery/modals/preview'
import invitationsModalModule from '../../../app/invitations/modal/invitations'
import chargeAccountModalModule from '../../../app/charge-account/modal/charge-account'
import consultationSummaryExpertControllerModule
  from '../../components/communicator/modals/consultation-summary-expert/consultation-summary-expert'
import expertIncomingCallModule from '../../components/communicator/modals/expert-incoming-call/expert-incoming-call'
import rtcDetectorModal from '../../components/communicator/modals/rtc-detector/rtc-detector'
import rtcDetectorBlockedModal
  from '../../components/communicator/modals/rtc-detector/rtc-detector-blocked/rtc-detector-blocked'
import rtcDetectorNoBrowserSupportModal
from '../../components/communicator/modals/rtc-detector/rtc-detector-no-browser-support/rtc-detector-no-browser-support'
import consultationSummaryClientModule
  from '../../components/communicator/modals/consultation-summary-client/consultation-summary-client'

const modalsModule = angular.module('profitelo.services.modals', [
  dialogModule,
  callSummaryModule,
  'profitelo.components.communicator.modals.service-unavailable',
  'profitelo.components.communicator.modals.no-credits',
  'profitelo.components.dashboard.client.activities.modals.consultation-details',
  'profitelo.components.dashboard.client.activities.modals.complain-report',
  'profitelo.components.dashboard.client.activities.modals.charge-details',
  'profitelo.components.dashboard.settings.modals.general.basic-account-settings',
  'profitelo.components.dashboard.settings.modals.general.phone-settings',
  'profitelo.components.dashboard.settings.modals.general.email-settings',
  'profitelo.components.dashboard.settings.modals.general.country-settings',
  'profitelo.components.dashboard.settings.modals.security.change-password',
  'profitelo.components.dashboard.settings.security.modals.pin-number',
  'profitelo.components.dashboard.settings.modals.payments.add-payment-method',
  'profitelo.components.dashboard.settings.modals.payments.edit-company-invoice',
  'profitelo.components.dashboard.settings.modals.payouts.payouts-pay-pal',
  'profitelo.components.profile.profile-header.profile-gallery.modals.preview',
  'profitelo.components.dashboard.expert.activities.modals.consultation-details',
  chargeAccountModalModule,
  expertEmployeeDetailsModalModule,
  expertInviteEmployeesModule,
  manageProfileEditProfileModule,
  invitationsModalModule,
  profileGalleryPreviewModule,
  consultationSummaryExpertControllerModule,
  rtcDetectorModal,
  rtcDetectorBlockedModal,
  rtcDetectorNoBrowserSupportModal,
  expertIncomingCallModule,
  consultationSummaryClientModule
])
.service('modalsService', ModalsService)
  .name

export default modalsModule;
