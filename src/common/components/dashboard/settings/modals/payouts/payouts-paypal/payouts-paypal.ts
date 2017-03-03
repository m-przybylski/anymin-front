namespace profitelo.components.dashboard.settings.modals.payouts.payoutsPaypal {

  export interface IPayoutsPaypalControllerControllerScope extends ng.IScope {
    callback: () => void
  }

  export class PayoutsPaypalController implements ng.IController {
    isNavbar: boolean = true
    isFullscreen: boolean = true
    isPayoutBankMethod: boolean = false
    isPayoutPaypalMethod: boolean = false

    /* @ngInject */
    constructor(private $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance) {
    }

    public choosePayoutBankMethod = () => {
      this.isPayoutBankMethod = true
      this.isPayoutPaypalMethod = false
    }

    public choosePayoutPaypalMethod = () => {
      this.isPayoutPaypalMethod = true
      this.isPayoutBankMethod = false
    }

    public onModalClose = (): void => {
      this.$uibModalInstance.dismiss('cancel')
    }

  }

  angular.module('profitelo.components.dashboard.settings.modals.payouts.payouts-paypal', [
    'ui.bootstrap',
    'profitelo.components.interface.preloader',
    'profitelo.directives.interface.scrollable',
    'profitelo.directives.interface.pro-input'
  ])
  .controller('payoutsPaypal', PayoutsPaypalController)

}
