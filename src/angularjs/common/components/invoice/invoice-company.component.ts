// tslint:disable:no-require-imports
import { InvoiceCompanyFormComponentController } from './invoice-company.controller';

// tslint:disable:member-ordering
export class InvoiceCompanyFormComponent implements ng.IComponentOptions {
  public controllerAs: '$ctrl';
  public controller: ng.Injectable<ng.IControllerConstructor> = InvoiceCompanyFormComponentController;
  public template = require('./invoice-company.html');
}
