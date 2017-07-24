import * as angular from 'angular'
import {DashboardClientInvoicesController} from './invoices.controller'
import './invoices.sass'
import expertInvoiceModule from '../../../../common/components/dashboard/expert/invoices/invoice/invoice';
import {UserService} from '../../../../common/services/user/user.service'
import {InvoiceDataResolver} from '../../../../common/resolvers/invoice-data/invoice-data.resolver'
import {IPromise} from 'angular'
import {CompanyInfo, AccountDetails} from 'profitelo-api-ng/model/models'

const  DashboardClientInvoicesModule = angular.module('profitelo.controller.dashboard.client.filters', [
  'ui.router',
  expertInvoiceModule
])
  .config(function ($stateProvider: ng.ui.IStateProvider): void {
    $stateProvider.state('app.dashboard.client.invoices', {
      url: '/invoices',
      template: require('./invoices.pug')(),
      controller: 'dashboardClientInvoicesController',
      controllerAs: 'vm',
      resolve: {
        getInvoiceData: (invoiceDataResolver: InvoiceDataResolver): IPromise<CompanyInfo> => {
          return invoiceDataResolver.resolveCompanyInfo()
        },
        user: (userService: UserService): IPromise<AccountDetails> => {
          return userService.getUser(true)
        }
      }
    })
  })
  .controller('dashboardClientInvoicesController', DashboardClientInvoicesController)
  .name

export default DashboardClientInvoicesModule
