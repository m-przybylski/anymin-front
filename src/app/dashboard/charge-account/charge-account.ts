import * as angular from 'angular'
import apiModule from 'profitelo-api-ng/api.module'
import {FinancesApi, PaymentsApi} from 'profitelo-api-ng/api/api'
import {MoneyDto, GetPaymentOptions, PaymentLink, PaymentSystem, GetLastPayment} from 'profitelo-api-ng/model/models'
import {SmoothScrollingService} from '../../../common/services/smooth-scrolling/smooth-scrolling.service'
import topAlertModule from '../../../common/services/top-alert/top-alert'
import commonSettingsModule from '../../../common/services/common-settings/common-settings'
import sessionModule from '../../../common/services/session/session'
import smoothScrollingModule from '../../../common/services/smooth-scrolling/smooth-scrolling'
import 'common/directives/interface/pro-input/pro-input'
import 'common/directives/interface/pro-checkbox/pro-checkbox'
import 'common/directives/interface/scrollable/scrollable'
import 'common/components/interface/preloader/preloader'
import 'common/components/braintree-form/braintree-form'
import 'common/components/dashboard/charge-account/payment-method/payu/payu'
import 'common/components/dashboard/charge-account/payment-method/paypal/paypal'
import 'common/components/dashboard/charge-account/payment-method/card/card'
import 'common/components/dashboard/charge-account/choose-amount-charge/choose-amount-charge'
import 'common/components/dashboard/charge-account/payment-method/payment-method'
import 'common/components/dashboard/charge-account/choose-bank/choose-bank'
import paypalModule from '../../../common/components/dashboard/charge-account/payment-method/paypal/paypal'
import * as _ from 'lodash'
import './charge-account.sass'

export interface IAmounts {
  paymentOptions: Array<MoneyDto>
  minimalAmounts: MoneyDto
}

export interface IAmountModel {
  cashAmount: null | MoneyDto,
  amount: null | MoneyDto
}

// TODO refactor all this strange structures
class ChargeAccountController {

  isNavbar = true
  isFullscreen = true
  isChargeProfiteloAccount = false
  isPaymentCardMethod = false
  isBraintreeFormLoaded = false
  queue = null
  amountModel: IAmountModel = {
    cashAmount: null,
    amount: null
  }
  paymentCountryId: string
  amounts: IAmounts
  currentSection: number
  clientBalance: MoneyDto
  lastPayment?: GetLastPayment
  paymentSystems: Array<PaymentSystem>
  paymentsLinks: Array<PaymentLink>
  amountMethodModal: {
    amountModel: {
      cashAmount: null | MoneyDto,
      amount: null | MoneyDto
    },
    paymentSystemModel: PaymentSystem | null,
    minimalAmount: MoneyDto,
    firstName?: string,
    lastName?: string,
    email?: string,
    payMethodValue?: string
  }

  constructor(private $state: ng.ui.IStateService, private $timeout: ng.ITimeoutService,
              paymentsOptions: GetPaymentOptions, paymentsLinks: Array<PaymentLink>,
              financeBalance: MoneyDto, private smoothScrollingService: SmoothScrollingService) {

    this.paymentCountryId = paymentsOptions.id
    this.amounts = {
      paymentOptions: paymentsOptions.paymentOptions,
      minimalAmounts: paymentsOptions.minimalPayment
    }
    this.currentSection = 1
    this.clientBalance = financeBalance

    this.lastPayment = paymentsOptions.lastPayment
    this.paymentSystems = paymentsOptions.paymentSystems
    this.paymentsLinks = paymentsLinks

    this.amountMethodModal = {
      amountModel: this.amountModel,
      paymentSystemModel: null,
      minimalAmount: this.amounts.minimalAmounts
    }

    if (this.lastPayment !== null && (typeof this.lastPayment !== 'undefined')) {
      this.isChargeProfiteloAccount = true
      this.currentSection = 3
      if (_.find(this.amounts.paymentOptions, {'amount': this.lastPayment.amount.amount})) {
        this.amountModel.amount = this.lastPayment.amount
      } else {
        this.amountModel.cashAmount = this.lastPayment.amount
      }
      this.amountMethodModal.paymentSystemModel = this.lastPayment.paymentSystemId

      if (this.lastPayment && this.lastPayment.payload && this.lastPayment.payload !== null) {
        this.amountMethodModal.firstName = this.lastPayment.payload.firstName
        this.amountMethodModal.lastName = this.lastPayment.payload.lastName
        this.amountMethodModal.email = this.lastPayment.payload.email
        this.amountMethodModal.payMethodValue = this.lastPayment.payload.payMethodValue
      }
    }
  }

  public onLoad = () => {
    this.isBraintreeFormLoaded = true
  }

  public chargeAccountProfiteloPaymentsMethod = () => {
    this.isChargeProfiteloAccount = true
    this.isPaymentCardMethod = false
  }

  public addPaymentCardMethod = () => {
    this.isPaymentCardMethod = true
    this.isChargeProfiteloAccount = false
  }

  public onFormSucceed = () => {
    this.$state.go('app.dashboard.client.activities')
  }

  public onClose = () =>
    this.$state.go('app.dashboard.client.favourites')

  public validAction = () => {
    if (
      (!angular.isDefined(this.amountModel.amount) || this.amountModel.amount === null) &&
      this.amountModel.cashAmount &&
      this.amountModel.cashAmount.amount < this.amounts.minimalAmounts.amount
    ) {
      this.smoothScrollingService.simpleScrollTo('#cash-valid', true)
      return false
    } else {
      return true
    }
  }

  public scrollHandler = (slideTo?: number) => {
    if (slideTo && angular.isDefined(slideTo)) {
      this.smoothScrollingService.scrollTo(String(slideTo))
      // TODO refactor this 3
    } else if (this.currentSection < 3) {
      this.$timeout(() => {
        this.smoothScrollingService.scrollTo(String(++this.currentSection))
      })
    }
  }
}

function config($stateProvider: ng.ui.IStateProvider) {
  $stateProvider.state('app.dashboard.charge-account', {
    url: '/charge-account',
    controllerAs: 'vm',
    controller: 'chargeAccountController',
    template: require('./charge-account.pug')(),
    resolve: {
      paymentsOptions: (PaymentsApi: PaymentsApi) => PaymentsApi.getPaymentOptionsRoute(),
      paymentsLinks: (PaymentsApi: PaymentsApi) => PaymentsApi.getPayUPaymentLinksRoute(),
      financeBalance: (FinancesApi: FinancesApi) => FinancesApi.getClientBalanceRoute()
    },
    data: {
      pageTitle: 'PAGE_TITLE.CHARGE_ACCOUNT',
      showMenu: false
    }
  })
}

angular.module('profitelo.controller.dashboard.charge-account', [
  'ui.router',

  sessionModule,
  apiModule,
  topAlertModule,
  commonSettingsModule,
  smoothScrollingModule,
  paypalModule,
  'profitelo.directives.interface.pro-input',
  'profitelo.directives.interface.pro-checkbox',
  'profitelo.directives.interface.scrollable',
  'profitelo.components.dashboard.charge-account.payment-method.payu',
  'profitelo.components.dashboard.charge-account.choose-amount-charge',
  'profitelo.components.dashboard.charge-account.payment-method',
  'profitelo.components.dashboard.charge-account.choose-bank',
  'profitelo.components.dashboard.charge-account.payment-method.card',
  'profitelo.components.interface.preloader',
  'profitelo.components.braintree-form'
])
  .config(config)
  .controller('chargeAccountController', ChargeAccountController)
