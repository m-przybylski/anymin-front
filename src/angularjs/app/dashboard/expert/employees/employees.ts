// tslint:disable:no-require-imports
// tslint:disable:no-duplicate-imports
import * as angular from 'angular';
import { DashboardExpertEmployeesController } from './employees.controller';
import expertEmployeeModule from '../../../../common/components/dashboard/expert/employees/employee/employee';
import modalsModule from '../../../../common/services/modals/modals';
import apiModule from 'profitelo-api-ng/api.module';
import pendingInvitationModule
  from '../../../../common/components/dashboard/expert/employees/pending-invitation/pending-invitation';
import { StateProvider } from '@uirouter/angularjs';
import uiRouter from '@uirouter/angularjs';

const dashboardExpertEmployeesModule = angular.module('profitelo.controller.dashboard.expert.employees', [
  'profitelo.components.interface.preloader-container',
  uiRouter,
  expertEmployeeModule,
  modalsModule,
  apiModule,
  pendingInvitationModule
])
  .config(['$stateProvider', ($stateProvider: StateProvider): void => {
    $stateProvider.state('app.dashboard.expert.employees', {
      url: '/employees',
      template: require('./employees.html'),
      controller: 'dashboardExpertEmployeesController',
      controllerAs: 'vm'
    });
  }])
  .controller('dashboardExpertEmployeesController', DashboardExpertEmployeesController)
  .name;

export default dashboardExpertEmployeesModule;
