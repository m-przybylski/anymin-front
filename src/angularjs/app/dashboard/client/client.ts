// tslint:disable:no-require-imports
// tslint:disable:no-invalid-this
// tslint:disable:no-import-side-effect
// tslint:disable:no-implicit-dependencies
import * as angular from 'angular';
import 'angularjs/common/components/dashboard/client/navigation/navigation';
import './activities/activities';
import './favourites/favourites';
import DashboardClientInvoicesModule from './invoices/invoices';
import { StateProvider } from '@uirouter/angularjs';

function clientController(): void {

  return this;
}

function config($stateProvider: StateProvider): void {
  $stateProvider.state('app.dashboard.client', {
    abstract: true,
    url: '/client',
    controllerAs: 'vm',
    controller: 'clientController',
    template: require('./client.html'),
    data: {
      pageTitle: 'PAGE_TITLE.CLIENT_DASHBOARD',
      showMenu: false
    }
  });
}

angular.module('profitelo.controller.dashboard.client', [
    'ngTouch',
  'profitelo.components.dashboard.client.navigation',
  'profitelo.controller.dashboard.client.activities',
  'profitelo.controller.dashboard.client.favourites',
  DashboardClientInvoicesModule
])
  .config(['$stateProvider', config])
  .controller('clientController', [clientController]);
