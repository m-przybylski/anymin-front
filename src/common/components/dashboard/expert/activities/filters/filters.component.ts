import {ExpertFiltersComponentController} from './filters.controller'

export class ExpertFiltersComponent implements ng.IComponentOptions {
  controller: ng.Injectable<ng.IControllerConstructor> = ExpertFiltersComponentController
  template = require('./filters.pug')()
  bindings: {}
}
