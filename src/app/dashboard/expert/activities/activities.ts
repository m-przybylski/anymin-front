import * as angular from 'angular'
import expertNoActivitiesModule from '../../../../common/components/dashboard/expert/activities/no-activities/no-activities';
import {DashboardExpertActivitiesController} from './activities.controller'
import expertActivityModule from '../../../../common/components/dashboard/expert/activities/activity/activity';
import './activities.sass'
import {DashboardActivitiesService} from '../../../../common/services/dashboard-activites/dashboard-activities.service'
import expertActivitiesModule from '../../../../common/services/dashboard-activites/dashboard-activites'
import {FinancialOperation} from 'profitelo-api-ng/model/models'
import dashboardFiltersModule from '../../../../common/components/dashboard/shared/filters/filters'

const dashboardExpertActivitiesModule = angular.module('profitelo.controller.dashboard.expert.activities', [
  'ui.router',
  'profitelo.components.interface.preloader-container',
  expertNoActivitiesModule,
  dashboardFiltersModule,
  expertActivitiesModule,
  expertActivityModule
])
.config(function ($stateProvider: ng.ui.IStateProvider) {
  $stateProvider.state('app.dashboard.expert.activities', {
    url: '/activities',
    template: require('./activities.pug')(),
    controller: 'dashboardExpertActivitiesController',
    controllerAs: 'vm',
    resolve: {
      /* istanbul ignore next */
      filtersData: (dashboardActivitiesService: DashboardActivitiesService) =>
        dashboardActivitiesService.resolveFilters(FinancialOperation.AccountTypeEnum.PROFILE)
    }
  })
})
.controller('dashboardExpertActivitiesController', DashboardExpertActivitiesController)
  .name

export default dashboardExpertActivitiesModule
