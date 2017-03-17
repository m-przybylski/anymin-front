import * as angular from 'angular'
import 'angular-touch'
import 'angular-permission'
import './charge-account/charge-account'
import './payments-thank-you-page/payments-thank-you-page'
import './invitation/invitation'
import './client/client'
import './settings/settings'
import './service-provider/service-provider'
import navbarModule from '../../common/components/navbar/navbar'

/* @ngInject */
class DashboardController {

  constructor() {
  }
}


const dashboardPageModule = angular.module('profitelo.controller.dashboard', [
  'ui.router',
  'permission',
  'permission.ui',
  'ngTouch',
  navbarModule,
  'profitelo.controller.dashboard.charge-account',
  'profitelo.controller.dashboard.payments-thank-you-page',
  'profitelo.controller.dashboard.invitation',
  'profitelo.controller.dashboard.client',
  'profitelo.controller.dashboard.settings',
  'profitelo.controller.dashboard.service-provider'
])
  .config(($stateProvider: ng.ui.IStateProvider) => {
    $stateProvider.state('app.dashboard', {
      abstract: true,
      url: '/dashboard',
      template: require('./dashboard.pug')(),
      controller: 'DashboardController',
      controllerAs: 'dashboardController',
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
