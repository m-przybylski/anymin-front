namespace profitelo.dashboard.settings.payouts {

  import IModalsService = profitelo.services.modals.IModalsService

  export class DashboardSettingsPayoutsController implements ng.IController {
    public isAnyPayoutMethod: boolean = false

    constructor(private modalsService: IModalsService, private $state: ng.ui.IStateService) {
    }

    public addPayoutsMethod = () : void => {
      this.modalsService.createPayoutsMethodControllerModal(this.onModalClose)
    }

    private onModalClose = (): void => {
      this.$state.reload()
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
