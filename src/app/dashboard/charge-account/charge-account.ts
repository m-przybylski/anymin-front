namespace profitelo.dashboard.chargeAccount {
  import ITopAlertService = profitelo.services.topAlert.ITopAlertService
  import ISmoothScrollingService = profitelo.services.smoothScrolling.ISmoothScrollingService
  import IFinancesApi = profitelo.api.IFinancesApi
  import IPaymentsApi = profitelo.api.IPaymentsApi
  import GetPaymentOptions = profitelo.api.GetPaymentOptions
  import MoneyDto = profitelo.api.MoneyDto
  import PaymentLink = profitelo.api.PaymentLink

  function chargeAccountController($state: ng.ui.IStateService, $timeout: ng.ITimeoutService, lodash: _.LoDashStatic,
                                   paymentsOptions: GetPaymentOptions, paymentsLinks: Array<PaymentLink>,
                                   financeBalance: MoneyDto | null, smoothScrollingService: ISmoothScrollingService) {

    this.isNavbar = true
    this.isFullscreen = true
    this.isChargeProfiteloAccount = false
    this.isPaymentCardMethod = false
    this.isBraintreeFormLoaded = false

    this.onLoad = () => {
      this.isBraintreeFormLoaded = true
    }

    this.chargeAccountProfiteloPaymentsMethod = () => {
      this.isChargeProfiteloAccount = true
      this.isPaymentCardMethod = false
    }

    this.addPaymentCardMethod = () => {
      this.isPaymentCardMethod = true
      this.isChargeProfiteloAccount = false
    }

    this.onFormSucceed = () => {
      $state.go('app.dashboard.client.activities')
    }

    this.paymentCountryId = paymentsOptions.id
    this.amounts = {
      paymentOptions: paymentsOptions.paymentOptions,
      minimalAmounts: paymentsOptions.minimalPayment
    }
    this.currentSection = 1
    this.clientBalance = financeBalance

    this.onClose = () =>
      $state.go('app.dashboard.client.favourites')

    this.lastPayment = paymentsOptions.lastPayment
    this.paymentSystems = paymentsOptions.paymentSystems
    this.paymentsLinks = paymentsLinks
    this.queue = null

    this.amountModel = {
      cashAmount: null,
      amount: null
    }

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

      if (this.lastPayment.payload !== null) {
        this.amountMethodModal.firstName = this.lastPayment.payload.firstName
        this.amountMethodModal.lastName = this.lastPayment.payload.lastName
        this.amountMethodModal.email = this.lastPayment.payload.email
        this.amountMethodModal.payMethodValue = this.lastPayment.payload.payMethodValue
      }
    }

    this.validAction = () => {
      if ((!angular.isDefined(this.amountModel.amount) || this.amountModel.amount === null) && this.amountModel.cashAmount.amount < this.amounts.minimalAmounts.amount) {
        smoothScrollingService.simpleScrollTo('#cash-valid', true)
        return false
      } else {
        return true
      }
    }

    this.scrollHandler = (slideTo: string) => {
      if (angular.isDefined(slideTo)) {
        smoothScrollingService.scrollTo(slideTo)
      } else if (this.currentSection < 3) {
        $timeout(() => {
          smoothScrollingService.scrollTo(<any>++this.currentSection)
        })
      }
    }

    return this
  }

  function config($stateProvider: ng.ui.IStateProvider, UserRolesProvider: any) {
    $stateProvider.state('app.dashboard.charge-account', {
      url: '/charge-account',
      controllerAs: 'vm',
      controller: 'chargeAccountController',
      templateUrl: 'dashboard/charge-account/charge-account.tpl.html',
      resolve: {
        paymentsOptions: ($log: ng.ILogService, $q: ng.IQService, $state: ng.ui.IStateService,
                          PaymentsApi: IPaymentsApi, topAlertService: ITopAlertService) => {
          /* istanbul ignore next */
          let _deferred = $q.defer()
          /* istanbul ignore next */
          PaymentsApi.getPaymentOptionsRoute().then((response) => {
            _deferred.resolve(response)
          }, (error) => {
            $log.error(error)
            _deferred.reject(error)
            $state.go('app.dashboard.client.activities')
            topAlertService.error({
              message: 'error',
              timeout: 4
            })
          })
          /* istanbul ignore next */
          return _deferred.promise
        },
        paymentsLinks: ($log: ng.ILogService, $q: ng.IQService, $state: ng.ui.IStateService, PaymentsApi: IPaymentsApi,
                        topAlertService: ITopAlertService) => {
          /* istanbul ignore next */
          let _deferred = $q.defer<Array<PaymentLink>>()
          /* istanbul ignore next */
          PaymentsApi.getPayUPaymentLinksRoute().then((response) => {
            _deferred.resolve(response)
          }, (error) => {
            $log.error(error)
            _deferred.resolve([])
            $state.go('app.dashboard.client.activities')
            topAlertService.error({
              message: 'error',
              timeout: 4
            })
          })
          /* istanbul ignore next */
          return _deferred.promise
        },
        financeBalance: ($log: ng.ILogService, $q: ng.IQService, $state: ng.ui.IStateService, FinancesApi: IFinancesApi,
                         topAlertService: ITopAlertService) => {
          /* istanbul ignore next */
          let _deferred = $q.defer<MoneyDto | null>()
          /* istanbul ignore next */
          FinancesApi.getClientBalanceRoute().then((response) => {
            _deferred.resolve(response)
          }, (error) => {
            $log.error(error)
            _deferred.resolve(null)
            $state.go('app.dashboard.client.activities')
            topAlertService.error({
              message: 'error',
              timeout: 4
            })
          })
          /* istanbul ignore next */
          return _deferred.promise
        }

      },
      data: {
        access: UserRolesProvider.getAccessLevel('user'),
        pageTitle: 'PAGE_TITLE.CHARGE_ACCOUNT',
        showMenu: false
      }
    })
  }

  angular.module('profitelo.controller.dashboard.charge-account', [
    'c7s.ng.userAuth',
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
  .controller('chargeAccountController', chargeAccountController)
}
