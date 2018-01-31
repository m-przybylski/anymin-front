import { ExpertInvoiceComponentController } from './invoice.controller';

// tslint:disable:member-ordering
export class ExpertInvoiceComponent implements ng.IComponentOptions {
  public template = require('./invoice.html');
  public controller: ng.Injectable<ng.IControllerConstructor> = ExpertInvoiceComponentController;
}
