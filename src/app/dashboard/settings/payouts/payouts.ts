namespace profitelo.dashboard.settings.payouts {

  import IModalsService = profitelo.services.modals.IModalsService
  import IPayoutsSettingsService = profitelo.resolvers.payoutsSettings.IPayoutsSettingsService
  import PayPalAccountDto = profitelo.api.PayPalAccountDto
  import PayoutMethodsDto = profitelo.api.PayoutMethodsDto
  import IPayoutsApi = profitelo.api.IPayoutsApi

  export class DashboardSettingsPayoutsController implements ng.IController {
    public isAnyPayoutMethod: boolean = false
    public payPalAccount?: PayPalAccountDto
    constructor(private modalsService: IModalsService, private $state: ng.ui.IStateService,
                payoutsMethods: PayoutMethodsDto, private PayoutsApi: IPayoutsApi) {

      if (payoutsMethods && payoutsMethods.payPalAccount) {
        this.isAnyPayoutMethod = true
        this.payPalAccount = payoutsMethods.payPalAccount
      }
    }

    public deletePaymentMethod = () => {
      this.PayoutsApi.deletePayPalAccountPayoutMethodRoute().then(() => {
        this.$state.reload()
      }, (error) => {
        throw new Error('Can Not delete payout methods: ' + error )
      })
    }

    public addPayoutsMethod = (): void => {
      this.modalsService.createPayoutsMethodControllerModal(this.onModalClose)
    }

    private onModalClose = (): void => {
      this.$state.reload()
    }
  }

  angular.module('profitelo.controller.dashboard.settings.payouts', [
    'ui.router',
    'profitelo.resolvers.payouts-settings',
    'profitelo.services.session'
  ])
  .config(($stateProvider: ng.ui.IStateProvider) => {
    $stateProvider.state('app.dashboard.settings.payouts', {
      url: '/payouts',
      templateUrl: 'dashboard/settings/payouts/payouts.tpl.html',
      controller: 'dashboardSettingsPayoutsController',
      controllerAs: 'vm',
      resolve: {
        payoutsMethods: (payoutsSettingsResolver: IPayoutsSettingsService) => {
          return payoutsSettingsResolver.resolve()
        }
      },
      data: {}
    })
  })
  .controller('dashboardSettingsPayoutsController', DashboardSettingsPayoutsController)
}
