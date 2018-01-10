import {DashboardFiltersComponentController} from './filters.controller'
export class DashboardFiltersComponent implements ng.IComponentOptions {
  controller: ng.Injectable<ng.IControllerConstructor> = DashboardFiltersComponentController
  template = require('./filters.html')
  bindings: {[boundProperty: string]: string} = {
    filters: '<',
    onSetSearchParams: '<',
    accountType: '<'
  }
}
