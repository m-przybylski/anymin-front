namespace profitelo.dashboard.settings.payments {

  export class DashboardSettingsPaymentsController implements ng.IController {
    paymentsSate: boolean

    constructor() {
      this.paymentsSate = false
    }
  }

  angular.module('profitelo.controller.dashboard.settings.payments', [
    'ui.router',
    'c7s.ng.userAuth'
  ])
  .config(($stateProvider: ng.ui.IStateProvider, UserRolesProvider: any) => {
    $stateProvider.state('app.dashboard.settings.payments', {
      url: '/payments',
      templateUrl: 'dashboard/settings/payments/payments.tpl.html',
      controller: 'dashboardSettingsPaymentsController',
      controllerAs: 'vm',
      data: {
        access: UserRolesProvider.getAccessLevel('user')
      }
    })
  })
  .controller('dashboardSettingsPaymentsController', DashboardSettingsPaymentsController)
}
