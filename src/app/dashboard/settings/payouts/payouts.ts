import * as angular from 'angular'
import apiModule from 'profitelo-api-ng/api.module'
import {DashboardSettingsPayoutsController} from './payouts.controller'
import {PayoutsSettingsResolver} from './payouts.resolver'

import {PayoutMethodsDto} from 'profitelo-api-ng/model/models'

const dashboardSettingsPayoutsModule = angular.module('profitelo.controller.dashboard.settings.payouts', [
  'ui.router',
  apiModule
])
.config(($stateProvider: ng.ui.IStateProvider) => {
  $stateProvider.state('app.dashboard.settings.payouts', {
    url: '/payouts',
    template: require('./payouts.pug')(),
    controller: 'dashboardSettingsPayoutsController',
    controllerAs: 'vm',
    resolve: {
      payoutsMethods: (payoutsSettingsResolver: PayoutsSettingsResolver): ng.IPromise<PayoutMethodsDto> =>
        payoutsSettingsResolver.resolve()
    }
  })
})
.controller('dashboardSettingsPayoutsController', DashboardSettingsPayoutsController)
.service('payoutsSettingsResolver', PayoutsSettingsResolver)
  .name

export default dashboardSettingsPayoutsModule
