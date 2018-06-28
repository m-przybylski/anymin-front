// tslint:disable:no-require-imports
// tslint:disable:no-import-side-effect
// tslint:disable:no-duplicate-imports
import * as angular from 'angular';
import 'angular-translate';
import { DashboardSettingsNotificationsController } from './notifications.controller';
import '../../../../common/components/interface/radio/radio';
import { StateProvider } from '@uirouter/angularjs';
import uiRouter from '@uirouter/angularjs';

const dashboardSettingsNotificationsModule = angular.module('profitelo.controller.dashboard.settings.notifications', [
  'pascalprecht.translate',
  uiRouter,
  'profitelo.components.interface.radio'
])
  .config(['$stateProvider', ($stateProvider: StateProvider): void => {
    $stateProvider.state('app.dashboard.settings.notifications', {
      url: '/notifications',
      template: require('./notifications.html'),
      controller: 'dashboardSettingsNotifications',
      controllerAs: 'vm'
    });
  }])
  .controller('dashboardSettingsNotifications', DashboardSettingsNotificationsController)
  .name;

export default dashboardSettingsNotificationsModule;
