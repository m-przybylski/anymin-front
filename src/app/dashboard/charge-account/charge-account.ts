namespace profitelo.dashboard.chargeAccount {
  import ISmoothScrollingService = profitelo.services.smoothScrolling.ISmoothScrollingService
  import IFinancesApi = profitelo.api.IFinancesApi
  import IPaymentsApi = profitelo.api.IPaymentsApi
  import GetPaymentOptions = profitelo.api.GetPaymentOptions
  import MoneyDto = profitelo.api.MoneyDto
  import PaymentLink = profitelo.api.PaymentLink
  import GetLastPayment = profitelo.api.GetLastPayment
  import PaymentSystem = profitelo.api.PaymentSystem

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

    constructor(private $state: ng.ui.IStateService, private $timeout: ng.ITimeoutService, lodash: _.LoDashStatic,
                paymentsOptions: GetPaymentOptions, paymentsLinks: Array<PaymentLink>,
                financeBalance: MoneyDto, private smoothScrollingService: ISmoothScrollingService) {


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
        this.currentSection = 3
        if (lodash.find(this.amounts.paymentOptions, {'amount': this.lastPayment.amount.amount})) {
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
      if ((!angular.isDefined(this.amountModel.amount) || this.amountModel.amount === null) && this.amountModel.cashAmount &&
        this.amountModel.cashAmount.amount < this.amounts.minimalAmounts.amount) {
        this.smoothScrollingService.simpleScrollTo('#cash-valid', true)
        return false
      } else {
        return true
      }
    }

    public scrollHandler = (slideTo?: number) => {
      if (slideTo && angular.isDefined(slideTo)) {
        this.smoothScrollingService.scrollTo(String(slideTo))
        //TODO refactor this 3
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
      templateUrl: 'dashboard/charge-account/charge-account.tpl.html',
      resolve: {
        paymentsOptions: (PaymentsApi: IPaymentsApi) => PaymentsApi.getPaymentOptionsRoute(),
        paymentsLinks: (PaymentsApi: IPaymentsApi) => PaymentsApi.getPayUPaymentLinksRoute(),
        financeBalance: (FinancesApi: IFinancesApi) => FinancesApi.getClientBalanceRoute()
      },
      data: {
        pageTitle: 'PAGE_TITLE.CHARGE_ACCOUNT',
        showMenu: false
      }
    })
  }

  angular.module('profitelo.controller.dashboard.charge-account', [
    'profitelo.services.session',
    'ui.router',
    'ngLodash',
    'profitelo.api.FinancesApi',
    'profitelo.services.top-alert',
    'profitelo.services.commonSettings',
    'profitelo.directives.interface.pro-input',
    'profitelo.directives.interface.pro-checkbox',
    'profitelo.services.smooth-scrolling',
    'profitelo.components.dashboard.charge-account.payment-method.payu',
    'profitelo.components.dashboard.charge-account.choose-amount-charge',
    'profitelo.components.dashboard.charge-account.payment-method',
    'profitelo.components.dashboard.charge-account.choose-bank',
    'profitelo.directives.interface.scrollable',
    'profitelo.components.dashboard.charge-account.payment-method.paypal',
    'profitelo.components.dashboard.charge-account.payment-method.card',
    'profitelo.components.interface.preloader',
    'profitelo.components.braintree-form'
  ])
    .config(config)
    .controller('chargeAccountController', ChargeAccountController)
}
