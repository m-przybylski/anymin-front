// tslint:disable:no-require-imports
// tslint:disable:no-duplicate-imports
import * as angular from 'angular';
import { DashboardClientInvoicesController } from './invoices.controller';
import expertInvoiceModule from '../../../../common/components/dashboard/expert/invoices/invoice/invoice';
import { UserService } from '../../../../common/services/user/user.service';
import { InvoiceDataResolver } from '../../../../common/resolvers/invoice-data/invoice-data.resolver';
import { GetCompanyInvoiceDetails } from 'profitelo-api-ng/model/models';
import { StateProvider } from '@uirouter/angularjs';
import uiRouter from '@uirouter/angularjs';
import { Account } from '@anymind-ng/api';

const DashboardClientInvoicesModule = angular
  .module('profitelo.controller.dashboard.client.filters', [expertInvoiceModule, uiRouter])
  .config([
    '$stateProvider',
    ($stateProvider: StateProvider): void => {
      $stateProvider.state('app.dashboard.client.invoices', {
        url: '/invoices',
        template: require('./invoices.html'),
        controller: 'dashboardClientInvoicesController',
        controllerAs: 'vm',
        resolve: {
          getInvoiceData: [
            'invoiceDataResolver',
            (invoiceDataResolver: InvoiceDataResolver): ng.IPromise<void | GetCompanyInvoiceDetails> =>
              invoiceDataResolver.resolveCompanyInfo(),
          ],
          user: ['userService', (userService: UserService): ng.IPromise<Account> => userService.getUser(true)],
        },
      });
    },
  ])
  .controller('dashboardClientInvoicesController', DashboardClientInvoicesController).name;

export default DashboardClientInvoicesModule;
