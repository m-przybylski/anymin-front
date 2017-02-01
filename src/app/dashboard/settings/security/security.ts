namespace app.dashboard.settings.security {

  import IClientActivitiesService = profitelo.services.clientActivities.IClientActivitiesService

  class DashboardSettingsSecurityController {

    constructor(private $scope: ng.IScope, private $timeout: ng.ITimeoutService) {

    }



  }

  angular.module('profitelo.controller.dashboard.settings.security', [
    'ui.router',
    'c7s.ng.userAuth',
    'ngLodash'
  ])
  .config(function ($stateProvider, UserRolesProvider) {
    $stateProvider.state('app.dashboard.settings.security', {
      url: '/security',
      templateUrl: 'dashboard/settings/security/security.tpl.html',
      controller: 'DashboardSettingsSecurityController',
      controllerAs: 'vm',
      data: {
        access: UserRolesProvider.getAccessLevel('user')
      },
      resolve: {
        /* istanbul ignore next */
        clientActivities: (clientActivitiesService: IClientActivitiesService) =>
          clientActivitiesService.resolve()
      }
    })
  })
  .controller('DashboardSettingsSecurityController', DashboardSettingsSecurityController)
}
