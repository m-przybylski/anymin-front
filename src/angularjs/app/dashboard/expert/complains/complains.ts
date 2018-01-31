import * as angular from 'angular';
import { DashboardExpertComplainsController } from './complains.controller';
import noResultsInformationModule
  from '../../../../common/components/dashboard/no-results-information/no-results-information';
import dashboardExpertComplainsListModule
  from '../../../../common/components/dashboard/expert/complains/complains-list/complains-list';
import { StateProvider } from '@uirouter/angularjs';
import uiRouter from '@uirouter/angularjs';

const dashboardExpertComplainsModule = angular.module('profitelo.controller.dashboard.expert.complains', [
  noResultsInformationModule,
  dashboardExpertComplainsListModule,
  uiRouter
])
  .config(['$stateProvider', ($stateProvider: StateProvider): void => {
    $stateProvider.state('app.dashboard.expert.complains', {
      url: '/complains',
      template: require('./complains.html'),
      controller: 'dashboardExpertComplains',
      controllerAs: 'vm'
    });
  }])
  .controller('dashboardExpertComplains', DashboardExpertComplainsController)
  .name;

export default dashboardExpertComplainsModule;
