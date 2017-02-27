namespace profitelo.dashboard.settings.payouts {

  export class DashboardSettingsPayoutsController implements ng.IController {
    public isAnyPayoutMethod: boolean = false
    public isPayoutInvoiceExist: boolean = true

    constructor() {
    }
  }

  angular.module('profitelo.controller.dashboard.settings.payouts', [
    'ui.router',
    'c7s.ng.userAuth'
  ])
  .config(($stateProvider: ng.ui.IStateProvider, UserRolesProvider: any) => {
    $stateProvider.state('app.dashboard.settings.payouts', {
      url: '/payouts',
      templateUrl: 'dashboard/settings/payouts/payouts.tpl.html',
      controller: 'dashboardSettingsPayoutsController',
      controllerAs: 'vm',
      data: {
        access: UserRolesProvider.getAccessLevel('user')
      }
    })
  })
  .controller('dashboardSettingsPayoutsController', DashboardSettingsPayoutsController)
}
