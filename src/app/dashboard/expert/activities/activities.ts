import * as angular from 'angular'
import expertNavigationModule from '../../../../common/components/dashboard/expert/navigation/navigation';
import expertNoActivitiesModule from '../../../../common/components/dashboard/expert/activities/no-activities/no-activities';
import {DashboardExpertActivitiesController} from './activities.controller'
import expertActivityModule from '../../../../common/components/dashboard/expert/activities/activity/activity';
import expertFiltersModule from '../../../../common/components/dashboard/expert/activities/filters/filters';
import './activities.sass'

const dashboardExpertActivitiesModule = angular.module('profitelo.controller.dashboard.expert.activities', [
  'ui.router',
  expertNavigationModule,
  expertNoActivitiesModule,
  expertFiltersModule,
  expertActivityModule
])
.config(function ($stateProvider: ng.ui.IStateProvider) {
  $stateProvider.state('app.dashboard.expert.activities', {
    url: '/activities',
    template: require('./activities.pug')(),
    controller: 'dashboardExpertActivities',
    controllerAs: 'vm'
  })
})
.controller('dashboardExpertActivities', DashboardExpertActivitiesController)
  .name

export default dashboardExpertActivitiesModule
