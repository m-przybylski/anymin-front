import * as angular from 'angular'
import {DashboardClientInvoicesController} from './invoices.controller'
import expertInvoiceModule from '../../../../common/components/dashboard/expert/invoices/invoice/invoice';
import {UserService} from '../../../../common/services/user/user.service'
import {InvoiceDataResolver} from '../../../../common/resolvers/invoice-data/invoice-data.resolver'
import {GetCompanyInvoiceDetails, AccountDetails} from 'profitelo-api-ng/model/models'
import {StateProvider} from '@uirouter/angularjs'
import uiRouter from '@uirouter/angularjs'

const DashboardClientInvoicesModule = angular.module('profitelo.controller.dashboard.client.filters', [
  expertInvoiceModule,
  uiRouter
])
  .config(function ($stateProvider: StateProvider): void {
    $stateProvider.state('app.dashboard.client.invoices', {
      url: '/invoices',
      template: require('./invoices.pug'),
      controller: 'dashboardClientInvoicesController',
      controllerAs: 'vm',
      resolve: {
        getInvoiceData: (invoiceDataResolver: InvoiceDataResolver): ng.IPromise<void | GetCompanyInvoiceDetails> =>
          invoiceDataResolver.resolveCompanyInfo(),
        user: (userService: UserService): ng.IPromise<AccountDetails> => userService.getUser(true)
      }
    })
  })
  .controller('dashboardClientInvoicesController', DashboardClientInvoicesController)
  .name

export default DashboardClientInvoicesModule
