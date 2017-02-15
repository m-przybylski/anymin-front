namespace profitelo.dashboard.settings.payments {

  export class DashboardSettingsPaymentsController implements ng.IController {
    public isAnyPaymentMethod: boolean
    public isPaymentsMethodExist: boolean
    public isPaymentsInvoiceExist: boolean

    constructor() {
      this.isAnyPaymentMethod = false
      this.isPaymentsMethodExist = true
      this.isPaymentsInvoiceExist = true
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
