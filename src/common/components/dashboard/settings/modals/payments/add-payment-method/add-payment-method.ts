namespace profitelo.components.dashboard.settings.modals.payments.addPaymentMethod {


  export interface IAddPaymentMethodControllerScope extends ng.IScope {
    callback: () => void
  }

  export class AddPaymentMethodController implements ng.IController {

    public isNavbar: boolean = true
    public isFullscreen: boolean = true
    public onBraintreeFormLoad: boolean = false

    public onModalClose = (): void => {
      this.$uibModalInstance.dismiss('cancel')
    }

    public onLoad = () => {
      this.onBraintreeFormLoad = true
    }

    public onFormSucceed = () => {
      this.$uibModalInstance.dismiss('cancel')
    }
    /* @ngInject */
    constructor(private $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance) {

    }
  }

  angular.module('profitelo.components.dashboard.settings.modals.payments.add-payment-method', [
    'ui.bootstrap',
    'profitelo.components.braintree-form',
    'profitelo.components.interface.preloader',
    'profitelo.directives.interface.scrollable'
  ])
  .controller('addPaymentMethodController', AddPaymentMethodController)

}
