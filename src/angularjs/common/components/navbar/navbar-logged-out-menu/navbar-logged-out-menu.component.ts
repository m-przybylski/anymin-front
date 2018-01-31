import { NavbarLoggedOutMenuComponentController } from './navbar-logged-out-menu.controller';
// tslint:disable:member-ordering
export class NavbarLoggedOutMenuComponent implements ng.IComponentOptions {
  public controller: ng.Injectable<ng.IControllerConstructor> = NavbarLoggedOutMenuComponentController;
  public template = require('./navbar-logged-out-menu.html');
  public bindings: {[boundProperty: string]: string} = {

  };
}
