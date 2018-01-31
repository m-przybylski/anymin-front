import { TilesComponentController } from './tiles.controller';
export class TilesComponent implements ng.IComponentOptions {
  controllerAs: '$ctrl';
  controller: ng.Injectable<ng.IControllerConstructor> = TilesComponentController;
  template = require('./tiles.html');
  bindings: {[boundProperty: string]: string} = {};
}
