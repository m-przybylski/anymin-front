// tslint:disable:no-require-imports
import { SearchFiltersComponentController } from './search-filters.controller';
// tslint:disable:member-ordering
export class SearchFiltersComponent implements ng.IComponentOptions {
  public controller: ng.Injectable<ng.IControllerConstructor> = SearchFiltersComponentController;
  public template = require('./search-filers.html');
  public bindings: {[boundProperty: string]: string} = {
    tags: '<'
  };
}
