import * as angular from 'angular';
import { ExpertController } from './expert.controller';
import dashboardExpertActivitiesModule from './activities/activities';
import dashboardExpertEmployeesModule from './employees/employees';
import dashboardExpertComplainsModule from './complains/complains';
import expertNavigationModule from '../../../common/components/dashboard/expert/navigation/navigation';
import dashboardExpertInvoicesModule from './invoices/invoices';
import dashboardExpertManageProfileModule from './manage-profile/manage-profile';
import AvatarUploaderModule from '../../../common/components/avatar-uploader/avatar-uploader';
import { UserService } from '../../../common/services/user/user.service';
import { StateService, StateProvider } from '@uirouter/angularjs';
import uiRouter from '@uirouter/angularjs';

const expertDashboardModule = angular.module('profitelo.controller.dashboard.expert', [
  'ngTouch',
  uiRouter,
  expertNavigationModule,
  dashboardExpertActivitiesModule,
  dashboardExpertEmployeesModule,
  dashboardExpertComplainsModule,
  dashboardExpertInvoicesModule,
  dashboardExpertManageProfileModule,
  AvatarUploaderModule
])
  .config(['$stateProvider', ($stateProvider: StateProvider): void => {
    $stateProvider.state('app.dashboard.expert', {
      controllerAs: 'vm',
      url: '/expert',
      abstract: true,
      template: require('./expert.html'),
      controller: 'expertDashboard',
      resolve: {
        isPlatformForExpert: ['userService', '$state', (userService: UserService, $state: StateService): void => {
          userService.getUser().then((user) => {
            if ((user.isExpert || user.isCompany)) {
              return true;
            } else {
              $state.go('app.wizard.create-profile');
              return;
            }
          });
        }]
      },
      data: {
        pageTitle: 'PAGE_TITLE.EXPERT_DASHBOARD',
      }
    });
  }])
  .controller('expertDashboard', ExpertController)
  .name;

export default expertDashboardModule;
