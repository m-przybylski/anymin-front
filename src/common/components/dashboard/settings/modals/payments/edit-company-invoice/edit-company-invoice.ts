namespace profitelo.components.dashboard.settings.modals.payments.editCompanyInvoice {


  export interface IEditCompanyInvoiceControllerScope extends ng.IScope {
    callback: () => void
  }

  export class EditCompanyInvoiceController implements ng.IController {

    public isNavbar: boolean = true
    public isFullscreen: boolean = true

    public onModalClose = (): void => {
      this.$uibModalInstance.dismiss('cancel')
    }

    public onFormSucceed = () => {
      this.$uibModalInstance.dismiss('cancel')
    }

    /* @ngInject */
    constructor(private $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance) {

    }
  }

  angular.module('profitelo.components.dashboard.settings.modals.payments.edit-company-invoice', [
    'ui.bootstrap',
    'profitelo.components.dashboard.invoice',
    'profitelo.components.interface.preloader',
    'profitelo.directives.interface.scrollable'
  ])
  .controller('editCompanyInvoiceController', EditCompanyInvoiceController)

}
