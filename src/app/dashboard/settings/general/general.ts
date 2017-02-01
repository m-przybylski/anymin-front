namespace app.dashboard.settings.general {

  import IClientActivitiesService = profitelo.services.clientActivities.IClientActivitiesService

  class DashboardSettingsGeneralController {

    constructor(private $scope: ng.IScope, private $timeout: ng.ITimeoutService) {

    }



  }

  angular.module('profitelo.controller.dashboard.settings.general', [
    'ui.router',
    'c7s.ng.userAuth',
    'ngLodash'
  ])
  .config(function ($stateProvider, UserRolesProvider) {
    $stateProvider.state('app.dashboard.settings.general', {
      url: '/general',
      templateUrl: 'dashboard/settings/general/general.tpl.html',
      controller: 'DashboardSettingsGeneralController',
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
  .controller('DashboardSettingsGeneralController', DashboardSettingsGeneralController)
}
