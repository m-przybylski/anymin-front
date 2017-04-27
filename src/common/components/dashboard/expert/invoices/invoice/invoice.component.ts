import {ExpertInvoiceComponentController} from './invoice.controller'

export class ExpertInvoiceComponent implements ng.IComponentOptions {
  template = require('./invoice.pug')()
  controller: ng.Injectable<ng.IControllerConstructor> = ExpertInvoiceComponentController
}
