import * as angular from 'angular'
import './expert.sass'
import dashboardExpertActivitiesModule from './activities/activities'
import {ExpertController} from './expert.controller'
import dashboardExpertComplainsModule from './complains/complains'

const expertDashboardModule = angular.module('profitelo.controller.dashboard.expert', [
  'ui.router',
  'ngTouch',
  dashboardExpertActivitiesModule,
  dashboardExpertComplainsModule
])
.config(($stateProvider: ng.ui.IStateProvider) => {
  $stateProvider.state('app.dashboard.expert', {
    controllerAs: 'vm',
    url: '/expert',
    abstract: true,
    template: require('./expert.pug')(),
    controller: 'expertDashboard',
    data: {
      pageTitle: 'PAGE_TITLE.EXPERT_DASHBOARD',
    }
  })
})
.controller('expertDashboard', ExpertController)
  .name

export default expertDashboardModule
