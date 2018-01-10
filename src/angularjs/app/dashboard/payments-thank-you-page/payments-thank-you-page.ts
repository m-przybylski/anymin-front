import * as angular from 'angular'
import 'angularjs/common/components/dashboard/thank-you-page/thank-you-page'
import 'angularjs/common/components/interface/top-modal-navbar/top-modal-navbar'
import {StateService, StateProvider, TransitionPromise} from '@uirouter/angularjs'

function paymentsThankYouPageController($state: StateService): void {

  this.onClose = (): TransitionPromise =>
    $state.go('app.dashboard.client.activities')

  return this
}

function config($stateProvider: StateProvider): void {
  $stateProvider.state('app.dashboard.payments-thank-you-page', {
    url: '/payments-thank-you-page',
    controllerAs: 'vm',
    controller: 'paymentsThankYouPageController',
    template: require('./payments-thank-you-page.html'),
    data: {
      pageTitle: 'PAGE_TITLE.CHARGE_ACCOUNT',
      showMenu: false
    }
  })
}

angular.module('profitelo.controller.dashboard.payments-thank-you-page', [
    'profitelo.components.interface.top-modal-navbar',
  'profitelo.components.dashboard.thank-you-page'
])
  .config(['$stateProvider', config])
  .controller('paymentsThankYouPageController', ['$state', paymentsThankYouPageController])
