namespace profitelo.dashboard.settings.security {

  import IModalsService = profitelo.services.modals.IModalsService

  export class DashboardSettingsSecurityController implements ng.IController {
    public hasMobilePin: boolean

    constructor(private modalsService: IModalsService, User: any) {
      this.hasMobilePin = User.getData('account').hasMobilePin
    }

    public openSecurityChangePasswordSettingsModal = () => {
      this.modalsService.createSecurityChangePasswordSettingsModal()
    }

    public openSecurityPinSecuritySettingsModal = () => {
      this.modalsService.createSecurityPinSecuritySettingsModal()
    }
  }

  angular.module('profitelo.controller.dashboard.settings.security', [
    'ui.router',
    'c7s.ng.userAuth',
    'ngLodash',
    'profitelo.components.dashboard.settings.manage-devices',
    'profitelo.services.modals'
  ])
  .config(($stateProvider: ng.ui.IStateProvider, UserRolesProvider: any) => {
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
