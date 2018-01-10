import {InvoiceCompanyFormComponentController} from './invoice-company.controller';

export class InvoiceCompanyFormComponent implements ng.IComponentOptions {
  controllerAs: '$ctrl'
  controller: ng.Injectable<ng.IControllerConstructor> = InvoiceCompanyFormComponentController
  template = require('./invoice-company.html')
}
