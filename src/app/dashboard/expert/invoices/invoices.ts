import * as angular from 'angular'
import {DashboardExpertInvoicesController} from './invoices.controller'
import './invoices.sass'
import expertInvoiceModule from '../../../../common/components/dashboard/expert/invoices/invoice/invoice';

const  dashboardExpertInvoicesModule = angular.module('profitelo.controller.dashboard.expert.filters', [
  'ui.router',
  expertInvoiceModule
])
  .config(function ($stateProvider: ng.ui.IStateProvider): void {
    $stateProvider.state('app.dashboard.expert.invoices', {
      url: '/invoices',
      template: require('./invoices.pug')(),
      controller: 'dashboardExpertInvoicesController',
      controllerAs: 'vm'
    })
  })
  .controller('dashboardExpertInvoicesController', DashboardExpertInvoicesController)
  .name

export default dashboardExpertInvoicesModule
