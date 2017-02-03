namespace app.dashboard.settings.security {

  import IClientActivitiesService = profitelo.services.clientActivities.IClientActivitiesService

  class DashboardSettingsSecurityController implements ng.IController {

    constructor(private $timeout: ng.ITimeoutService) {

    }



  }

  angular.module('profitelo.controller.dashboard.settings.security', [
    'ui.router',
    'c7s.ng.userAuth'
  ])
  .config(function ($stateProvider, UserRolesProvider) {
    $stateProvider.state('app.dashboard.settings.security', {
      url: '/security',
      templateUrl: 'dashboard/settings/security/security.tpl.html',
      controller: 'DashboardSettingsSecurityController',
      controllerAs: 'vm',
      data: {
        access: UserRolesProvider.getAccessLevel('user')
      }
    })
  })
  .controller('DashboardSettingsSecurityController', DashboardSettingsSecurityController)
}
