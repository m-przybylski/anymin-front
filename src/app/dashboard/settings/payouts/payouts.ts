namespace profitelo.dashboard.settings.payouts {

  export class DashboardSettingsPayoutsController implements ng.IController {
    public isAnyPayoutMethod: boolean = false
    public isPayoutInvoiceExist: boolean = true

    constructor() {
    }
  }

  angular.module('profitelo.controller.dashboard.settings.payouts', [
    'ui.router',
    'profitelo.services.session'
  ])
  .config(($stateProvider: ng.ui.IStateProvider) => {
    $stateProvider.state('app.dashboard.settings.payouts', {
      url: '/payouts',
      templateUrl: 'dashboard/settings/payouts/payouts.tpl.html',
      controller: 'dashboardSettingsPayoutsController',
      controllerAs: 'vm',
      data: {
      }
    })
  })
  .controller('dashboardSettingsPayoutsController', DashboardSettingsPayoutsController)
}
