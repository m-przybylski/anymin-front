// tslint:disable:no-require-imports
import { InputLinksComponentController } from './input-links.controller';
// tslint:disable:member-ordering
export class InputLinksComponent implements ng.IComponentOptions {
  public transclude = true;
  public controller: ng.Injectable<ng.IControllerConstructor> = InputLinksComponentController;
  public template = require('./input-links.html');
  public bindings: {[boundProperty: string]: string} = {
    selectedLinks: '=?',
    label: '@'
  };
}
