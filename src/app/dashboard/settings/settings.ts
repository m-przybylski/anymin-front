namespace profitelo.app.dashboard.settings {

  class SettingsController implements ng.IController {

    public stateNames = [
      'general',
      'security',
      'payments',
      'payouts',
      'notifications'
    ]

    public currentState: string = this.stateNames[0]

    /* ngInject */
    constructor(private $state: ng.ui.IStateService, private $scope: ng.IScope, private lodash: _.LoDashStatic) {

      $scope.$watch(() => {
        return $state.current.name
      }, (newVal, oldVal) => {
        if (newVal) {
          this.handleStateChange(newVal)
        }
      })
    }

    private handleStateChange = (stateName: string) => {

      const realStateName = this.getRealStateName(stateName)

      if (realStateName && angular.isDefined(realStateName) && this.lodash.includes(this.stateNames, realStateName)) {
        this.stateNames[this.currentState] = false
        this.currentState = realStateName
      }

      this.stateNames[realStateName] = true
    }




    private getRealStateName = (string: string) => {
      const stringsArray = string.split('.')
      return stringsArray[3]
    }
  }

  function config($stateProvider: ng.ui.IStateProvider, UserRolesProvider) {
    $stateProvider.state('app.dashboard.settings', {
      abstract: true,
      url: '/settings',
      controllerAs: 'vm',
      controller: 'settingsController',
      templateUrl: 'dashboard/settings/settings.tpl.html',
      data: {
        access: UserRolesProvider.getAccessLevel('user'),
        pageTitle: 'PAGE_TITLE.CLIENT_DASHBOARD',
        showMenu: false
      }
    })
  }

  angular.module('profitelo.controller.dashboard.settings', [
    'ui.router',
    'ngTouch',
    'ngLodash',
    'c7s.ng.userAuth',
    'profitelo.components.settings.navigation'
  ])
    .config(config)
    .controller('settingsController', SettingsController)
}