import * as angular from 'angular';
import expertNoActivitiesModule
  from '../../../../common/components/dashboard/expert/activities/no-activities/no-activities';
import { DashboardExpertActivitiesController } from './activities.controller';
import expertActivityModule from '../../../../common/components/dashboard/expert/activities/activity/activity';
import { DashboardActivitiesService }
  from '../../../../common/services/dashboard-activites/dashboard-activities.service';
import expertActivitiesModule from '../../../../common/services/dashboard-activites/dashboard-activites';
import { FinancialOperation, GetActivityFilters } from 'profitelo-api-ng/model/models';
import dashboardFiltersModule from '../../../../common/components/dashboard/shared/filters/filters';
import promiseModule from '../../../../common/services/promise/promise';
import errorHandlerModule from '../../../../common/services/error-handler/error-handler';
import noResultsInformationModule
  from '../../../../common/components/dashboard/no-results-information/no-results-information';
import { StateProvider } from '@uirouter/angularjs';
import uiRouter from '@uirouter/angularjs';
import loggerModule from '../../../../common/services/logger/logger';

const dashboardExpertActivitiesModule = angular.module('profitelo.controller.dashboard.expert.activities', [
  'profitelo.components.interface.preloader-container',
  uiRouter,
  expertNoActivitiesModule,
  dashboardFiltersModule,
  expertActivitiesModule,
  expertActivityModule,
  promiseModule,
  loggerModule,
  errorHandlerModule,
  noResultsInformationModule
])
  .config(['$stateProvider', ($stateProvider: StateProvider): void => {
    $stateProvider.state('app.dashboard.expert.activities', {
      url: '/activities',
      template: require('./activities.html'),
      controller: 'dashboardExpertActivitiesController',
      controllerAs: 'vm',
      resolve: {
        filtersData: ['dashboardActivitiesService', (dashboardActivitiesService: DashboardActivitiesService):
          ng.IPromise<GetActivityFilters> =>
          dashboardActivitiesService.resolveFilters(FinancialOperation.AccountTypeEnum.PROFILE)]
      }
    });
  }])
  .controller('dashboardExpertActivitiesController', DashboardExpertActivitiesController)
  .name;

export default dashboardExpertActivitiesModule;
