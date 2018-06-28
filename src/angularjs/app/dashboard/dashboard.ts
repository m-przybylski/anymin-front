// tslint:disable:no-require-imports
// tslint:disable:no-import-side-effect
// tslint:disable:no-duplicate-imports
// tslint:disable:curly
import * as angular from 'angular';
import 'angular-touch';
import 'angular-permission';
import './payments-thank-you-page/payments-thank-you-page';
import './client/client';
import './expert/expert';
import './settings/settings';
import navbarModule from '../../common/components/navbar/navbar';
import expertDashboardModule from './expert/expert';
import { StateService, StateProvider } from '@uirouter/angularjs';
import uiRouter from '@uirouter/angularjs';
import { UserService } from '../../common/services/user/user.service';
import { Config } from '../../../config';

class DashboardController {

  public static $inject = ['$scope', '$state'];

  public isPayment = false;

  constructor($scope: ng.IScope, $state: StateService) {
    // TODO Remove after UX-TEST
    $scope.$watch(() => $state.current, (newValue, _oldValue) => {
      this.isPayment = newValue.name === 'app.dashboard.charge-account';
    });
  }
}

const dashboardPageModule = angular.module('profitelo.controller.dashboard', [
  'permission',
  uiRouter,
  'permission.ui',
  'ngTouch',
  navbarModule,
  'profitelo.controller.dashboard.payments-thank-you-page',
  'profitelo.controller.dashboard.client',
  expertDashboardModule,
  'profitelo.controller.dashboard.settings'
])
  .config(['$stateProvider', ($stateProvider: StateProvider): void => {
    $stateProvider.state('app.dashboard', {
      abstract: true,
      url: '/dashboard',
      template: require('./dashboard.html'),
      controller: 'DashboardController',
      controllerAs: 'vm',
      onEnter: ['userService', '$state', (userService: UserService, $state: StateService): void => {
          if (Config.isPlatformForExpert)
            userService.getUser().then((response) => {
              if (!response.hasPassword) $state.go('app.post-register.set-password');
              else if (!response.unverifiedEmail && !response.email) $state.go('app.post-register.set-email');
            });
        }],
      data: {
        permissions: {
          only: ['user'],
          redirectTo: ['$location', ($location: ng.ILocationService): void => {
            $location.path('/login');
          }]
        },
        pageTitle: 'PAGE_TITLE.DASHBOARD'
      }
    });
  }])
  .controller('DashboardController', DashboardController)
  .name;

export default dashboardPageModule;
