import { SearchDropdownController } from './search-dropdown.controller';
// tslint:disable:member-ordering
export class SearchDropdownComponent implements ng.IComponentOptions {
  public controller: ng.Injectable<ng.IControllerConstructor> = SearchDropdownController;
  public template = require('./search-dropdown.html');
  public bindings: {[boundProperty: string]: string} = {
    searchValue: '<'
  };
}
