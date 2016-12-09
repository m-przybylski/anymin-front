(function() {
  function chargeAccountController($state, $timeout, paymentsOptions, paymentsLinks, financeBalance, smoothScrolling) {

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

    if (this.lastPayment !== null) {
      this.currentSection = 3
      if (_.find(this.amounts.paymentOptions, {'amount': this.lastPayment.amount.amount})) {
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
        smoothScrolling.simpleScrollTo('#cash-valid')
        return false
      } else {
        return true
      }
    }

    this.scrollHandler = (slideTo) => {
      if (angular.isDefined(slideTo)) {
        smoothScrolling.scrollTo(slideTo)
      } else if (this.currentSection < 3) {
        $timeout(() => {
          smoothScrolling.scrollTo(++this.currentSection)
        })
      }
    }

    return this
  }

  function config($stateProvider, UserRolesProvider) {
    $stateProvider.state('app.dashboard.charge-account', {
      url: '/charge-account',
      controllerAs: 'vm',
      controller: 'chargeAccountController',
      templateUrl: 'dashboard/charge-account/charge-account.tpl.html',
      resolve: {
        paymentsOptions: ($q, $state, PaymentsApi, proTopAlertService) => {
          /* istanbul ignore next */
          let _deferred = $q.defer()
          /* istanbul ignore next */
          PaymentsApi.getPaymentOptions().$promise.then((response) => {
            _deferred.resolve(response)
          }, (error) => {
            _deferred.resolve(null)
            $state.go('app.dashboard.client.activities')
            proTopAlertService.error({
              message: 'error',
              timeout: 4
            })
          })
          /* istanbul ignore next */
          return _deferred.promise
        },
        paymentsLinks: ($q, $state, PaymentsApi, proTopAlertService) => {
          /* istanbul ignore next */
          let _deferred = $q.defer()
          /* istanbul ignore next */
          PaymentsApi.getPayUPaymentLinks().$promise.then((response) => {
            _deferred.resolve(response)
          }, (error) => {
            _deferred.resolve(null)
            $state.go('app.dashboard.client.activities')
            proTopAlertService.error({
              message: 'error',
              timeout: 4
            })
          })
          /* istanbul ignore next */
          return _deferred.promise
        },
        financeBalance: ($q, $state, FinancesApi, proTopAlertService) => {
          /* istanbul ignore next */
          let _deferred = $q.defer()
          /* istanbul ignore next */
          FinancesApi.getClientBalance().$promise.then((response) => {
            _deferred.resolve(response)
          }, (error) => {
            _deferred.resolve(null)
            $state.go('app.dashboard.client.activities')
            proTopAlertService.error({
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
    'profitelo.swaggerResources',
    'profitelo.services.pro-top-alert-service',
    'profitelo.services.commonSettings',
    'profitelo.directives.interface.pro-input',
    'profitelo.directives.interface.pro-checkbox',
    'profitelo.directives.services.smooth-scrolling',
    'profitelo.components.dashboard.charge-account.payu-payment-form',
    'profitelo.components.dashboard.charge-account.choose-amount-charge',
    'profitelo.components.dashboard.charge-account.payment-method',
    'profitelo.components.dashboard.charge-account.choose-bank'

  ])
    .config(config)
    .controller('chargeAccountController', chargeAccountController)

}())
