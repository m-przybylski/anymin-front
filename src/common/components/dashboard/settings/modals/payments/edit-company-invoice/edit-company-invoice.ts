namespace profitelo.components.dashboard.settings.modals.payments.editCompanyInvoice {


  export interface IEditCompanyInvoiceControllerScope extends ng.IScope {
    callback: () => void
  }

  export class EditCompanyInvoiceController implements ng.IController {

    public isNavbar: boolean = true
    public isFullscreen: boolean = true
    public onBraintreeFormLoad: boolean = false

    public onModalClose = (): void => {
      this.$uibModalInstance.dismiss('cancel')
    }

    public onFormSucceed = () => {
      this.$uibModalInstance.dismiss('cancel')
    }

    public onLoad = () => {
      this.onBraintreeFormLoad = true
    }

    /* @ngInject */
    constructor(private $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance) {

    }
  }

  angular.module('profitelo.components.dashboard.settings.modals.payments.edit-company-invoice', [
    'ui.bootstrap',
    'profitelo.components.braintree-form',
    'profitelo.components.interface.preloader',
    'profitelo.directives.interface.pro-input',
    'profitelo.services.phone-number',
    'profitelo.components.dashboard.invoice',
    'profitelo.directives.interface.scrollable'
  ])
  .controller('editCompanyInvoiceController', EditCompanyInvoiceController)

}
