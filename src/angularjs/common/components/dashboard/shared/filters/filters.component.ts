// tslint:disable:no-require-imports
import { DashboardFiltersComponentController } from './filters.controller';
// tslint:disable:member-ordering
export class DashboardFiltersComponent implements ng.IComponentOptions {
  public controller: ng.Injectable<ng.IControllerConstructor> = DashboardFiltersComponentController;
  public template = require('./filters.html');
  public bindings: {[boundProperty: string]: string} = {
    filters: '<',
    onSetSearchParams: '<',
    accountType: '<'
  };
}
