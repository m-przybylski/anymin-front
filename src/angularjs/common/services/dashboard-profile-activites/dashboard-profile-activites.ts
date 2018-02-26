import * as angular from 'angular';
import { DashboardProfileActivitiesService } from './dashboard-profile-activities.service';
import apiModule from 'profitelo-api-ng/api.module';

const dashboardProfileActivitiesModule = angular.module('profitelo.services.dashboard-profile-activities', [
  apiModule
])
.service('dashboardProfileActivitiesService', DashboardProfileActivitiesService)
  .name;

export default dashboardProfileActivitiesModule;
