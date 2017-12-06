import {ExpertEmployeesFiltersComponentController} from './filters.controller'
export class ExpertEmployeesFiltersComponent implements ng.IComponentOptions {
  controller: ng.Injectable<ng.IControllerConstructor> = ExpertEmployeesFiltersComponentController
  template = require('./filters.pug')()
  bindings: {[boundProperty: string]: string} = {
    onModalCloseCallback: '<'
  }
}
