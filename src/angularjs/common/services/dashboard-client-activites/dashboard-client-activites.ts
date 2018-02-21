import * as angular from 'angular';
import { DashboardClientActivitiesService } from './dashboard-client-activities.service';
import apiModule from 'profitelo-api-ng/api.module';

const dashboardActivitiesModule = angular.module('profitelo.services.dashboard-activities', [
  apiModule
])
.service('dashboardActivitiesService', DashboardClientActivitiesService)
  .name;

export default dashboardActivitiesModule;
