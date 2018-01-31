import { TilesComponentController } from './tiles.controller';
// tslint:disable:member-ordering
export class TilesComponent implements ng.IComponentOptions {
  public controllerAs: '$ctrl';
  public controller: ng.Injectable<ng.IControllerConstructor> = TilesComponentController;
  public template = require('./tiles.html');
  public bindings: {[boundProperty: string]: string} = {};
}
