import * as angular from 'angular'
import {DashboardClientInvoicesController} from './invoices.controller'
import './invoices.sass'
import expertInvoiceModule from '../../../../common/components/dashboard/expert/invoices/invoice/invoice';
import {UserService} from '../../../../common/services/user/user.service'
import {InvoiceDataResolver} from '../../../../common/resolvers/invoice-data/invoice-data.resolver'

const  DashboardClientInvoicesModule = angular.module('profitelo.controller.dashboard.client.filters', [
  'ui.router',
  expertInvoiceModule
])
  .config(function ($stateProvider: ng.ui.IStateProvider) {
    $stateProvider.state('app.dashboard.client.invoices', {
      url: '/invoices',
      template: require('./invoices.pug')(),
      controller: 'dashboardClientInvoicesController',
      controllerAs: 'vm',
      resolve: {
        getInvoiceData: (invoiceDataResolver: InvoiceDataResolver) => {
          return invoiceDataResolver.resolveCompanyInfo()
        },
        user: (userService: UserService) => {
          return userService.getUser(true)
        }
      }
    })
  })
  .controller('dashboardClientInvoicesController', DashboardClientInvoicesController)
  .name

export default DashboardClientInvoicesModule
