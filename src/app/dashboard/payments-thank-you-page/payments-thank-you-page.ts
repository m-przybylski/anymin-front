import * as angular from "angular"
import "common/components/dashboard/thank-you-page/thank-you-page"
import "common/components/interface/top-modal-navbar/top-modal-navbar"

function paymentsThankYouPageController($state: ng.ui.IStateService) {

  this.onClose = () =>
    $state.go('app.dashboard.client.activities')

  return this
}

function config($stateProvider: ng.ui.IStateProvider) {
  $stateProvider.state('app.dashboard.payments-thank-you-page', {
    url: '/payments-thank-you-page',
    controllerAs: 'vm',
    controller: 'paymentsThankYouPageController',
    template: require('./payments-thank-you-page.jade')(),
    data: {
      pageTitle: 'PAGE_TITLE.CHARGE_ACCOUNT',
      showMenu: false
    }
  })
}

angular.module('profitelo.controller.dashboard.payments-thank-you-page', [
  'ui.router',
  'profitelo.components.interface.top-modal-navbar',
  'profitelo.components.dashboard.thank-you-page'
])
  .config(config)
  .controller('paymentsThankYouPageController', paymentsThankYouPageController)
