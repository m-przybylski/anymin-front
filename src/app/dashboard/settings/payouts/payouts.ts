import * as angular from 'angular'
import {DashboardSettingsPayoutsController} from './payouts.controller'
import './payouts.sass'
import {PayoutsService} from './payouts.service'
import modalsModule from '../../../../common/services/modals/modals'
import translatorModule from '../../../../common/services/translator/translator'
import errorHandlerModule from '../../../../common/services/error-handler/error-handler'
import topAlertModule from '../../../../common/services/top-alert/top-alert'

const dashboardSettingsPayoutsModule = angular.module('profitelo.controller.dashboard.settings.payouts', [
  'ui.router',
  modalsModule,
  translatorModule,
  errorHandlerModule,
  topAlertModule
])
.config(($stateProvider: ng.ui.IStateProvider) => {
  $stateProvider.state('app.dashboard.settings.payouts', {
    url: '/payouts',
    template: require('./payouts.pug')(),
    controller: 'dashboardSettingsPayoutsController',
    controllerAs: 'vm'
  })
})
.controller('dashboardSettingsPayoutsController', DashboardSettingsPayoutsController)
.service('payoutsService', PayoutsService)
  .name

export default dashboardSettingsPayoutsModule
