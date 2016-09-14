(function() {
  function chargeAccountController($window, $state,CommonSettingsService, paymentsOptions, paymentsLinks, PaymentsApi, proTopAlertService) {

    this.rulesAccepted = false

    this.amounts = {
      paymentOptions: paymentsOptions.paymentOptions,
      minimalAmounts: paymentsOptions.minimalPaymentAmount
    }
    
    this.paymentSystems = paymentsOptions.paymentSystems
    this.paymentsLinks = paymentsLinks
    this.queue = null

    this.amountModel = {
      cashAmount: null,
      amount: null
    }
    this.paymentSystemModel = {}

    this.bankModel = {}

    this.sendPayment = () => {
      this.sendPaymentObject = {
        paymentOption: this.amountModel.amount,
        email: this.emailModel,
        amount: this.amountModel.cashAmount,
        lastName: this.lastNameModel,
        firstName: this.firstNameModel,
        paymentCountryId: 1,
        payMethodValue: this.bankModel.value,
        paymentSystemId: this.paymentSystemModel.id
      }

      PaymentsApi.postPayUOrder(this.sendPaymentObject).$promise.then((response) => {
        $window.open(response.redirectUrl, '_self',true)
      }, (error) => {
        proTopAlertService.error({
          message: 'error',
          timeout: 4
        })
        // $state.go('app.dashboard.start')
      })
      
    }

    this.patternEmail = CommonSettingsService.localSettings.emailPattern

    
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
    'profitelo.services.commonSettings',
    'profitelo.directives.interface.pro-input',
    'profitelo.directives.interface.pro-checkbox',
    'profitelo.components.dashboard.charge-account.choose-amount-charge',
    'profitelo.components.dashboard.charge-account.payment-method',
    'profitelo.components.dashboard.charge-account.choose-bank'

  ])
    .config(config)
    .controller('chargeAccountController', chargeAccountController)

}())
