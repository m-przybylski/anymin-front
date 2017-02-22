namespace profitelo.components.dashboard.invoiceCompany {

  export class InvoiceCompanyFormComponentController implements ng.IController {

    /* @ngInject */
    constructor() {}
  }

  class PayPalPaymentFormComponent implements ng.IComponentOptions {
    controllerAs: '$ctrl'
    controller: ng.Injectable<ng.IControllerConstructor> = InvoiceCompanyFormComponentController
    templateUrl: string =  'components/invoice/invoice-company.tpl.html'
    replace: true
  }


  angular.module('profitelo.components.dashboard.invoice', [
    'c7s.ng.userAuth'
  ])
  .component('invoiceCompany', new PayPalPaymentFormComponent())

}
