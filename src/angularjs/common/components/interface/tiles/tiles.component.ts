import {TilesComponentController} from './tiles.controller'
export class TilesComponent implements ng.IComponentOptions {
  controllerAs: '$ctrl'
  controller: ng.Injectable<ng.IControllerConstructor> = TilesComponentController
  template = require('./tiles.pug')
  bindings: {[boundProperty: string]: string} = {}
}
