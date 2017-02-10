namespace app.dashboard.settings.security {

  import IClientActivitiesService = profitelo.services.clientActivities.IClientActivitiesService
  import IModalsService = profitelo.services.modals.IModalsService

  export interface ISettingsControllerScope extends ng.IScope {
    deviceInUseStatus: boolean
    desktopDeviceInUse: boolean
    smartPhoneDeviceInUse: boolean
    tabletDeviceInUse: boolean
  }

  export class DashboardSettingsSecurityController implements ng.IController {
    constructor(private $scope: ISettingsControllerScope,
                private modalsService: IModalsService) {

      $scope.deviceInUseStatus = true
      $scope.desktopDeviceInUse = true
      $scope.tabletDeviceInUse = false
      $scope.smartPhoneDeviceInUse = false
    }

    public openSecurityChangePasswordSettingsModal = () => {
      this.modalsService.createSecurityChangePasswordSettingsModal()
    }

    public openGeneralPhoneSettingsModal = () => {
      this.modalsService.createGeneralPhoneSettingsModal()
    }

  }

  angular.module('profitelo.controller.dashboard.settings.security', [
    'ui.router',
    'c7s.ng.userAuth',
    'ngLodash',
    'profitelo.components.dashboard.settings.manage-devices',
    'profitelo.services.modals'
  ])
  .config(function ($stateProvider, UserRolesProvider) {
    $stateProvider.state('app.dashboard.settings.security', {
      url: '/security',
      templateUrl: 'dashboard/settings/security/security.tpl.html',
      controller: 'dashboardSettingsSecurityController',
      controllerAs: 'vm',
      data: {
        access: UserRolesProvider.getAccessLevel('user')
      }
    })
  })
  .controller('dashboardSettingsSecurityController', DashboardSettingsSecurityController)
}
