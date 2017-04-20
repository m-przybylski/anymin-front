import * as angular from 'angular'
import 'angular-translate'
import {DashboardSettingsNotificationsController} from './notifications.controller'
import './notifications.sass'
import '../../../../common/directives/interface/pro-checkbox/pro-checkbox'
import '../../../../common/components/interface/radio/radio'

const dashboardSettingsNotificationsModule = angular.module('profitelo.controller.dashboard.settings.notifications', [
  'ui.router',
  'pascalprecht.translate',
  'profitelo.directives.interface.pro-checkbox',
  'profitelo.components.interface.radio'
])
.config(function ($stateProvider: ng.ui.IStateProvider) {
  $stateProvider.state('app.dashboard.settings.notifications', {
    url: '/notifications',
    template: require('./notifications.pug')(),
    controller: 'dashboardSettingsNotifications',
    controllerAs: 'vm'
  })
})
.controller('dashboardSettingsNotifications', DashboardSettingsNotificationsController)
  .name

export default dashboardSettingsNotificationsModule
