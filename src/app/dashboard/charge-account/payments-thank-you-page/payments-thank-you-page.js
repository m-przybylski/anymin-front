(function() {
  function paymentsThankYouPageController() {

    return this
  }

  function config($stateProvider, UserRolesProvider) {
    $stateProvider.state('app.dashboard.payments-thank-you-page', {
      url: '/payments-thank-you-page',
      controllerAs: 'vm',
      controller: 'paymentsThankYouPageController',
      templateUrl: 'dashboard/charge-account/payments-thank-you-page/payments-thank-you-page.tpl.html',
      data: {
        access: UserRolesProvider.getAccessLevel('user'),
        pageTitle: 'PAGE_TITLE.CHARGE_ACCOUNT',
        showMenu: false
      }
    })
  }

  angular.module('profitelo.controller.dashboard.charge-account.payments-thank-you-page', [
    'ui.router',
    'profitelo.components.interface.top-modal-navbar',
    'profitelo.components.dashboard.charge-account.thank-you-page'

  ])
    .config(config)
    .controller('paymentsThankYouPageController', paymentsThankYouPageController)

}())
