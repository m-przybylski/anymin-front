import * as angular from "angular"
import {PayoutsApi} from "profitelo-api-ng/api/api"
import {PayPalAccountDto, PayoutMethodsDto} from "profitelo-api-ng/model/models"
import {ModalsService} from "../../../../common/services/modals/modals.service"
import {IPayoutsSettingsService} from "../../../../common/resolvers/payouts-resolver/payouts-resolver.service"
import "common/resolvers/payouts-resolver/payouts-resolver.service"

export class DashboardSettingsPayoutsController implements ng.IController {
  public isAnyPayoutMethod: boolean = false
  public payPalAccount?: PayPalAccountDto

  constructor(private modalsService: ModalsService, private $state: ng.ui.IStateService,
              payoutsMethods: PayoutMethodsDto, private PayoutsApi: PayoutsApi) {

    if (payoutsMethods && payoutsMethods.payPalAccount) {
      this.isAnyPayoutMethod = true
      this.payPalAccount = payoutsMethods.payPalAccount
    }
  }

  public deletePaymentMethod = () => {
    this.PayoutsApi.deletePayPalAccountPayoutMethodRoute().then(() => {
      this.$state.reload()
    }, (error) => {
      throw new Error('Can Not delete payout methods: ' + error)
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
  'profitelo.resolvers.payouts-settings'
])
  .config(($stateProvider: ng.ui.IStateProvider) => {
    $stateProvider.state('app.dashboard.settings.payouts', {
      url: '/payouts',
      template: require('./payouts.jade')(),
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
