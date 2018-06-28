// tslint:disable:no-require-imports
import { ExpertEmployeesFiltersComponentController } from './filters.controller';
// tslint:disable:member-ordering
export class ExpertEmployeesFiltersComponent implements ng.IComponentOptions {
  public controller: ng.Injectable<ng.IControllerConstructor> = ExpertEmployeesFiltersComponentController;
  public template = require('./filters.html');
  public bindings: {[boundProperty: string]: string} = {
    onModalCloseCallback: '<'
  };
}
