import * as angular from 'angular'
import {DashboardExpertManageProfileController} from './manage-profile.controller'
import './manage-profile.sass'
import modalsModule from '../../../../common/services/modals/modals'

const dashboardExpertManageProfileModule = angular.module('profitelo.controller.dashboard.expert.manage-profile', [
  'ui.router',
  modalsModule
])
  .config(($stateProvider: ng.ui.IStateProvider) => {
    $stateProvider.state('app.dashboard.expert.manage-profile', {
      url: '/manage-profile',
      template: require('./manage-profile.pug')(),
      controller: 'dashboardExpertManageProfile',
      controllerAs: 'vm'
    })
  })
  .controller('dashboardExpertManageProfile', DashboardExpertManageProfileController)
  .name

export default dashboardExpertManageProfileModule
