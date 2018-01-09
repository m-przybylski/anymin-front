import * as angular from 'angular'
import {DashboardExpertInvoicesController} from './invoices.controller'
import expertInvoiceModule from '../../../../common/components/dashboard/expert/invoices/invoice/invoice';
import {StateProvider} from '@uirouter/angularjs'
import uiRouter from '@uirouter/angularjs'

const dashboardExpertInvoicesModule = angular.module('profitelo.controller.dashboard.expert.filters', [
  expertInvoiceModule,
  uiRouter
])
  .config(function ($stateProvider: StateProvider): void {
    $stateProvider.state('app.dashboard.expert.invoices', {
      url: '/invoices',
      template: require('./invoices.pug'),
      controller: 'dashboardExpertInvoicesController',
      controllerAs: 'vm'
    })
  })
  .controller('dashboardExpertInvoicesController', DashboardExpertInvoicesController)
  .name

export default dashboardExpertInvoicesModule
