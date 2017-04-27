import * as angular from 'angular'
import {FinancesApi} from 'profitelo-api-ng/api/api'
import 'common/components/dashboard/client/navigation/navigation'
import './activities/activities'
import './favourites/favourites'

function clientController(FinancesApi: FinancesApi) {

  FinancesApi.getClientBalanceRoute().then((clientBalance) => {
    this.clientBalance = clientBalance
  }, (error) => {
    throw new Error('Can not get client balance: ' + error)
  })

  return this
}

function config($stateProvider: ng.ui.IStateProvider) {
  $stateProvider.state('app.dashboard.client', {
    abstract: true,
    url: '/client',
    controllerAs: 'vm',
    controller: 'clientController',
    template: require('./client.pug')(),
    data: {
      pageTitle: 'PAGE_TITLE.CLIENT_DASHBOARD',
      showMenu: false
    }
  })
}

angular.module('profitelo.controller.dashboard.client', [
  'ui.router',
  'ngTouch',
  'profitelo.components.dashboard.client.navigation',
  'profitelo.controller.dashboard.client.activities',
  'profitelo.controller.dashboard.client.favourites',
])
  .config(config)
  .controller('clientController', clientController)
