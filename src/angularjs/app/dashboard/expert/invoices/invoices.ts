// tslint:disable:no-duplicate-imports
import * as angular from 'angular';
import { DashboardExpertInvoicesController } from './invoices.controller';
import expertInvoiceModule from '../../../../common/components/dashboard/expert/invoices/invoice/invoice';
import { StateProvider } from '@uirouter/angularjs';
import uiRouter from '@uirouter/angularjs';

const dashboardExpertInvoicesModule = angular.module('profitelo.controller.dashboard.expert.filters', [
  expertInvoiceModule,
  uiRouter
])
  .config(['$stateProvider', ($stateProvider: StateProvider): void => {
    $stateProvider.state('app.dashboard.expert.invoices', {
      url: '/invoices',
      template: require('./invoices.html'),
      controller: 'dashboardExpertInvoicesController',
      controllerAs: 'vm'
    });
  }])
  .controller('dashboardExpertInvoicesController', DashboardExpertInvoicesController)
  .name;

export default dashboardExpertInvoicesModule;
