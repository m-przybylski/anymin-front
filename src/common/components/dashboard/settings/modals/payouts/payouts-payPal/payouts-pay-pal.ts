namespace profitelo.components.dashboard.settings.modals.payouts.payoutsPayPal {

  import IPayoutsApi = profitelo.api.IPayoutsApi
  import JValue = profitelo.api.JValue
  import ICommonSettingsService = profitelo.services.commonSettings.ICommonSettingsService

  export interface IPayoutsPayPalControllerScope extends ng.IScope {
    callback: () => void
  }

  export class PayoutsPayPalController implements ng.IController {
    isNavbar: boolean = true
    isFullscreen: boolean = true
    isPayoutBankMethod: boolean = false
    isPayoutPaypalMethod: boolean = false
    payPalEmail: string
    emailPattern = this.CommonSettingsService.localSettings.emailPattern
    /* @ngInject */
    constructor(private $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance,
                private $scope: IPayoutsPayPalControllerScope, private PayoutsApi: IPayoutsApi,
                private CommonSettingsService: ICommonSettingsService) {

    }

    public choosePayoutBankMethod = () => {
      this.isPayoutBankMethod = true
      this.isPayoutPaypalMethod = false
    }

    public addPayPalAccount = () => {
      this.PayoutsApi.postPayPalAccountPayoutMethodRoute({
        email: this.payPalEmail,
        isDefault: true
      }).then(this.onPostPayPalAccountSucceed, this.onPostPayPalAccountError)
    }

    private onPostPayPalAccountSucceed = (_response: ng.IPromise<JValue>) => {
      this.$scope.callback()
      this.$uibModalInstance.dismiss('cancel')
    }

    private onPostPayPalAccountError = (error: any) => {
      this.$uibModalInstance.dismiss('cancel')
      throw new Error('Can not add new payouts method - paypal account: ' + error)
    }


    public choosePayoutPaypalMethod = () => {
      this.isPayoutPaypalMethod = true
      this.isPayoutBankMethod = false
    }

    public onModalClose = (): void => {
      this.$uibModalInstance.dismiss('cancel')
    }

  }

  angular.module('profitelo.components.dashboard.settings.modals.payouts.payouts-pay-pal', [
    'ui.bootstrap',
    'profitelo.api.PayoutsApi',
    'profitelo.services.commonSettings',
    'profitelo.components.interface.preloader',
    'profitelo.directives.interface.scrollable',
    'profitelo.directives.interface.pro-input'
  ])
  .controller('payoutsPayPalController', PayoutsPayPalController)

}
