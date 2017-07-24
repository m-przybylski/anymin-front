import * as angular from 'angular'
import 'common/components/dashboard/client/navigation/navigation'
import './activities/activities'
import './favourites/favourites'
import DashboardClientInvoicesModule from './invoices/invoices'

function clientController(): void {

  return this
}

function config($stateProvider: ng.ui.IStateProvider): void {
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
  DashboardClientInvoicesModule
])
  .config(config)
  .controller('clientController', clientController)
