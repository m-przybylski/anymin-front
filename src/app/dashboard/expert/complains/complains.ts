import * as angular from 'angular'
import {DashboardExpertComplainsController} from './complains.controller'
import expertNavigationModule from '../../../../common/components/dashboard/expert/navigation/navigation';
import noContentMessageModule from '../../../../common/components/dashboard/no-content-message/no-content-message';
import './complains.sass'

const  dashboardExpertComplainsModule = angular.module('profitelo.controller.dashboard.expert.complains', [
  'ui.router',
  expertNavigationModule,
  noContentMessageModule
])
  .config(function ($stateProvider: ng.ui.IStateProvider) {
    $stateProvider.state('app.dashboard.expert.complains', {
      url: '/complains',
      template: require('./complains.pug')(),
      controller: 'DashboardExpertComplainsController',
      controllerAs: 'vm'
    })
  })
  .controller('DashboardExpertComplainsController', DashboardExpertComplainsController)
  .name

export default dashboardExpertComplainsModule
