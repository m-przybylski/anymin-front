import {ExpertInvoiceComponentController} from './invoice.controller'

export class ExpertInvoiceComponent implements ng.IComponentOptions {
  template = require('./invoice.html')
  controller: ng.Injectable<ng.IControllerConstructor> = ExpertInvoiceComponentController
}
