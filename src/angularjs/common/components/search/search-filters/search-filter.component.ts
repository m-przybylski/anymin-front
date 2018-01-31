import { SearchFiltersComponentController } from './search-filters.controller';
export class SearchFiltersComponent implements ng.IComponentOptions {
  controller: ng.Injectable<ng.IControllerConstructor> = SearchFiltersComponentController;
  template = require('./search-filers.html');
  bindings: {[boundProperty: string]: string} = {
    tags: '<'
  };
}
