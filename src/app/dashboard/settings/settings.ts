import * as angular from 'angular'
import * as _ from 'lodash'
import './general/general'
import './payments/payments'
import './payouts/payouts'
import './security/security'
import 'common/components/dashboard/settings/navigation/navigation'
import 'common/constants/time.constatnt'
import 'angular-touch'
import dashboardSettingsNotificationsModule from './notifications/notifications';

export class SettingsController implements ng.IController {

  public stateNames = [
    'general',
    'security',
    'payments',
    'payouts',
    'notifications'
  ]

  public currentState: string = this.stateNames[0]

  /* @ngInject */
  constructor($state: ng.ui.IStateService, $scope: ng.IScope) {

    $scope.$watch(() => {
      return $state.current.name
    }, (newVal, _oldVal) => {
      if (newVal) {
        this.handleStateChange(newVal)
      }
    })
  }

  private handleStateChange = (stateName: string) => {

    const realStateName = this.getRealStateName(stateName)

    if (realStateName && angular.isDefined(realStateName) && _.includes(this.stateNames, realStateName)) {
      (<any>this.stateNames)[this.currentState] = false
      this.currentState = realStateName
    }

    (<any>this.stateNames)[realStateName] = true
  }

  private getRealStateName = (stateName: string) => {
    const stringsArray = stateName.split('.')
    return stringsArray[3]
  }
}

function config($stateProvider: ng.ui.IStateProvider) {
  $stateProvider.state('app.dashboard.settings', {
    abstract: true,
    url: '/settings',
    controllerAs: 'vm',
    controller: 'settingsController',
    template: require('./settings.pug')(),
    data: {
      pageTitle: 'PAGE_TITLE.CLIENT_DASHBOARD',
      showMenu: false
    }
  })
}

angular.module('profitelo.controller.dashboard.settings', [
  'ui.router',
  'ngTouch',

  'profitelo.components.settings.navigation',
  'profitelo.controller.dashboard.settings.general',
  'profitelo.controller.dashboard.settings.security',
  'profitelo.controller.dashboard.settings.payments',
  'profitelo.controller.dashboard.settings.payouts',
  dashboardSettingsNotificationsModule
])
  .config(config)
  .controller('settingsController', SettingsController)
