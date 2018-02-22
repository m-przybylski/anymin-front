import * as angular from 'angular';
import { DashboardClientActivitiesService } from './dashboard-client-activities.service';
import apiModule from 'profitelo-api-ng/api.module';

const dashboardClientActivitiesModule = angular.module('profitelo.services.dashboard-client-activities', [
  apiModule
])
.service('dashboardClientActivitiesService', DashboardClientActivitiesService)
  .name;

export default dashboardClientActivitiesModule;
