import * as angular from 'angular'
import expertNavigationModule from '../../../../common/components/dashboard/expert/navigation/navigation';
import expertNoActivitiesModule from '../../../../common/components/dashboard/expert/activities/no-activities/no-activities';
import {DashboardExpertActivitiesController} from './activities.controller'

const  dashboardExpertActivitiesModule = angular.module('profitelo.controller.dashboard.expert.activities', [
  'ui.router',
  expertNavigationModule,
  expertNoActivitiesModule
])
  .config(function ($stateProvider: ng.ui.IStateProvider) {
    $stateProvider.state('app.dashboard.expert.activities', {
      url: '/activities',
      template: require('./activities.pug')(),
      controller: 'DashboardExpertActivitiesController',
      controllerAs: 'vm'
    })
  })
  .controller('DashboardExpertActivitiesController', DashboardExpertActivitiesController)
  .name

export default dashboardExpertActivitiesModule
