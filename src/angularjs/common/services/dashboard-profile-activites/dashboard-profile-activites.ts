import * as angular from 'angular';
import { DashboardActivitiesService } from './dashboard-activities.service';
import apiModule from 'profitelo-api-ng/api.module';

const dashboardActivitiesModule = angular.module('profitelo.services.dashboard-activities', [
  apiModule
])
.service('dashboardActivitiesService', DashboardActivitiesService)
  .name;

export default dashboardActivitiesModule;
