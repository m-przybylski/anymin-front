import * as angular from 'angular'
import sessionModule from '../../services/session/session'

export class InvoiceCompanyFormComponentController implements ng.IController {

  /* @ngInject */
  constructor() {
  }

}

class PayPalPaymentFormComponent implements ng.IComponentOptions {
  controllerAs: '$ctrl'
  controller: ng.Injectable<ng.IControllerConstructor> = InvoiceCompanyFormComponentController
  template = require('./invoice-company.pug')()
  replace: true
}

angular.module('profitelo.components.dashboard.invoice', [
  sessionModule
])
  .component('invoiceCompany', new PayPalPaymentFormComponent())
