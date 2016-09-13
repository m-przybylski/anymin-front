(function() {
  function chargeAccountController(paymentsOptions, paymentsLinks) {

    this.rulesAccepted = false
    this.payments = paymentsOptions
    this.amounts = {
      paymentOptions: this.payments.paymentOptions,
      minimalAmounts: this.payments.minimalPaymentAmount
    }
    this.paymentSystems = this.payments.paymentSystems
    this.paymentsLinks = paymentsLinks
    this.queue = null

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
            $state.go('app.dashboard.start')
            proTopAlertService.error({
              message: 'error',
              timeout: 4
            })
          })
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
            $state.go('app.dashboard.start')
            proTopAlertService.error({
              message: 'error',
              timeout: 4
            })
          })
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
    'profitelo.directives.pro-top-alert-service',
    'profitelo.directives.interface.pro-input',
    'profitelo.directives.interface.pro-checkbox',
    'profitelo.components.dashboard.charge-account.choose-amount-charge',
    'profitelo.components.dashboard.charge-account.payment-method',
    'profitelo.components.dashboard.charge-account.choose-bank'

  ])
    .config(config)
    .controller('chargeAccountController', chargeAccountController)

}())
