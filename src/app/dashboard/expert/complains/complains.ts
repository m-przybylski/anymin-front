import * as angular from 'angular'
import {DashboardExpertComplainsController} from './complains.controller'
import expertNavigationModule from '../../../../common/components/dashboard/expert/navigation/navigation';
import noContentMessageModule from '../../../../common/components/dashboard/no-content-message/no-content-message';
import dashboardExpertComplainsListModule from '../../../../common/components/dashboard/expert/complains/complains-list/complains-list'
import './complains.sass'

const dashboardExpertComplainsModule = angular.module('profitelo.controller.dashboard.expert.complains', [
  'ui.router',
  expertNavigationModule,
  noContentMessageModule,
  dashboardExpertComplainsListModule
])
  .config(($stateProvider: ng.ui.IStateProvider) => {
    $stateProvider.state('app.dashboard.expert.complains', {
      url: '/complains',
      template: require('./complains.pug')(),
      controller: 'dashboardExpertComplains',
      controllerAs: 'vm'
    })
  })
  .controller('dashboardExpertComplains', DashboardExpertComplainsController)
  .name

export default dashboardExpertComplainsModule
