// tslint:disable:no-duplicate-imports
import * as angular from 'angular';
import { DashboardSettingsPayoutsController } from './payouts.controller';
import { PayoutsService } from './payouts.service';
import modalsModule from '../../../../common/services/modals/modals';
import translatorModule from '../../../../common/services/translator/translator';
import errorHandlerModule from '../../../../common/services/error-handler/error-handler';
import topAlertModule from '../../../../common/services/top-alert/top-alert';
import { StateProvider } from '@uirouter/angularjs';
import uiRouter from '@uirouter/angularjs';
import invoiceDetailsModalModule
from '../../../../common/components/dashboard/settings/modals/payouts/company-invoice-details/company-invoice-details';

const dashboardSettingsPayoutsModule = angular.module('profitelo.controller.dashboard.settings.payouts', [
  modalsModule,
  translatorModule,
  errorHandlerModule,
  uiRouter,
  topAlertModule,
  invoiceDetailsModalModule
])
  .config(['$stateProvider', ($stateProvider: StateProvider): void => {
    $stateProvider.state('app.dashboard.settings.payouts', {
      url: '/payouts',
      template: require('./payouts.html'),
      controller: 'dashboardSettingsPayoutsController',
      controllerAs: 'vm'
    });
  }])
  .controller('dashboardSettingsPayoutsController', DashboardSettingsPayoutsController)
  .service('payoutsService', PayoutsService)
  .name;

export default dashboardSettingsPayoutsModule;
