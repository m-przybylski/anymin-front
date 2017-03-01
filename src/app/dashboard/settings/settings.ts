namespace profitelo.app.dashboard.settings {

  export class SettingsController implements ng.IController {

    public stateNames = [
      'general',
      'security',
      'payments',
      'payouts',
      'notifications'
    ]

    public currentState: string = this.stateNames[0]

    /* ngInject */
    constructor($state: ng.ui.IStateService, $scope: ng.IScope, private lodash: _.LoDashStatic) {

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

      if (realStateName && angular.isDefined(realStateName) && this.lodash.includes(this.stateNames, realStateName)) {
        (<any>this.stateNames)[this.currentState] = false
        this.currentState = realStateName
      }

      (<any>this.stateNames)[realStateName] = true
    }

    private getRealStateName = (string: string) => {
      const stringsArray = string.split('.')
      return stringsArray[3]
    }
  }

  function config($stateProvider: ng.ui.IStateProvider) {
    $stateProvider.state('app.dashboard.settings', {
      abstract: true,
      url: '/settings',
      controllerAs: 'vm',
      controller: 'settingsController',
      templateUrl: 'dashboard/settings/settings.tpl.html',
      data: {
        pageTitle: 'PAGE_TITLE.CLIENT_DASHBOARD',
        showMenu: false
      }
    })
  }

  angular.module('profitelo.controller.dashboard.settings', [
    'ui.router',
    'ngTouch',
    'ngLodash',
    'profitelo.services.session',
    'profitelo.components.settings.navigation'
  ])
  .config(config)
  .controller('settingsController', SettingsController)
}
