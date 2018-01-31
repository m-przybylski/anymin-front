import { NavbarHelpComponentController } from './navbar-help.controller';

// tslint:disable:member-ordering
export class NavbarHelpComponent implements ng.IComponentOptions {
  public controller: ng.Injectable<ng.IControllerConstructor> = NavbarHelpComponentController;
  public template = require('./navbar-help.html');
  public bindings: {[boundProperty: string]: string} = {
    onClick: '<'
  };
}
