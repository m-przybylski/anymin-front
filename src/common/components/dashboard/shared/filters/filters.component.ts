import {DashboardFiltersComponentController} from './filters.controller'
export class DashboardFiltersComponent implements ng.IComponentOptions {
  controller: ng.Injectable<ng.IControllerConstructor> = DashboardFiltersComponentController
  template = require('./filters.pug')()
  bindings: {[boundProperty: string]: string} = {
    filters: '<',
    onSetSearchParams: '<',
    accountType: '<'
  }
}
