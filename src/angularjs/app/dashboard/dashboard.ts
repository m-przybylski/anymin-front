import * as angular from 'angular'
import 'angular-touch'
import 'angular-permission'
import './payments-thank-you-page/payments-thank-you-page'
import './client/client'
import './expert/expert'
import './settings/settings'
import navbarModule from '../../common/components/navbar/navbar'
import expertDashboardModule from './expert/expert'
import {StateService, StateProvider} from '@uirouter/angularjs'
import uiRouter from '@uirouter/angularjs'

class DashboardController {

  public isPayment: boolean = false

    constructor($scope: ng.IScope, $state: StateService) {
    // TODO Remove after UX-TEST
    $scope.$watch(() => $state.current, (newValue, _oldValue) => {
      this.isPayment = newValue.name === 'app.dashboard.charge-account'
    })
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
  .config(($stateProvider: StateProvider) => {
    $stateProvider.state('app.dashboard', {
      abstract: true,
      url: '/dashboard',
      template: require('./dashboard.html'),
      controller: 'DashboardController',
      controllerAs: 'vm',
      data: {
        permissions: {
          only: ['user'],
          redirectTo: 'app.login'
        },
        pageTitle: 'PAGE_TITLE.DASHBOARD'
      }
    })
  })
  .controller('DashboardController', DashboardController)
  .name

export default dashboardPageModule
