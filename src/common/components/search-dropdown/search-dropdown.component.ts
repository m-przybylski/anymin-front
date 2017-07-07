import {SearchDropdownController} from './search-dropdown.controller'
export class SearchDropdownComponent implements ng.IComponentOptions {
  controller: ng.Injectable<ng.IControllerConstructor> = SearchDropdownController
  template: string = require('./search-dropdown.pug')()
  bindings: {[boundProperty: string]: string} = {
    searchValue: '<'
  }
}
