import { ActiveCallBarComponentController } from './active-call-bar.controller';
// tslint:disable:member-ordering
export class ActiveCallBarComponent implements ng.IComponentOptions {
  public template = require('./active-call-bar.html');
  public controller: ng.Injectable<ng.IControllerConstructor> = ActiveCallBarComponentController;
  public bindings: {[boundProperty: string]: string} = {
  };
}
