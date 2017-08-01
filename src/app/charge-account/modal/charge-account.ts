import * as angular from 'angular'
import {ChargeAccountController} from './charge-account.controller'
import sessionModule from '../../../common/services/session/session'
import topAlertModule from '../../../common/services/top-alert/top-alert'
import commonSettingsModule from '../../../common/services/common-settings/common-settings'
import smoothScrollingModule from '../../../common/services/smooth-scrolling/smooth-scrolling'
import paypalModule from '../../../common/components/dashboard/charge-account/payment-method/paypal/paypal'
import './charge-account.sass'
const chargeAccountModalModule = angular.module('profitelo.app.charge-account.modal', [
  'ui.bootstrap',
  'profitelo.components.interface.preloader',
  'profitelo.directives.interface.scrollable',
  'ui.router',
  sessionModule,
  topAlertModule,
  commonSettingsModule,
  smoothScrollingModule,
  paypalModule,
  'profitelo.components.dashboard.charge-account.payment-method.payu',
  'profitelo.components.dashboard.charge-account.choose-amount-charge',
  'profitelo.components.dashboard.charge-account.payment-method',
  'profitelo.components.dashboard.charge-account.payment-method.card',
  'profitelo.components.interface.preloader',
  'profitelo.components.braintree-form'
])
.controller('chargeAccountModal', ChargeAccountController)
  .name

export default chargeAccountModalModule
