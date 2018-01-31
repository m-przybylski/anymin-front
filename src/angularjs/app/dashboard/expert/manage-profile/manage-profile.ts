import * as angular from 'angular';
import { DashboardExpertManageProfileController } from './manage-profile.controller';
import modalsModule from '../../../../common/services/modals/modals';
import singleServiceModule
  from '../../../../common/components/dashboard/expert/manage-profile/single-service/single-service';
import consultationFormModalModule from
    '../../../../common/components/dashboard/expert/manage-profile/modals/service-form-modal/service-form-modal';
import { StateProvider } from '@uirouter/angularjs';
import uiRouter from '@uirouter/angularjs';

const dashboardExpertManageProfileModule = angular.module('profitelo.controller.dashboard.expert.manage-profile', [
  modalsModule,
  uiRouter,
  singleServiceModule,
  consultationFormModalModule
])
  .config(['$stateProvider', ($stateProvider: StateProvider): void => {
    $stateProvider.state('app.dashboard.expert.manage-profile', {
      url: '/manage-profile',
      template: require('./manage-profile.html'),
      controller: 'dashboardExpertManageProfile',
      controllerAs: 'vm'
    });
  }])
  .controller('dashboardExpertManageProfile', DashboardExpertManageProfileController)
  .name;

export default dashboardExpertManageProfileModule;
