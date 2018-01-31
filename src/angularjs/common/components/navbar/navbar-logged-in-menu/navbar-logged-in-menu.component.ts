import { NavbarLoggedInMenuComponentController } from './navbar-logged-in-menu.controller';
// tslint:disable:member-ordering
export class NavbarLoggedInMenuComponent implements ng.IComponentOptions {
  public controller: ng.Injectable<ng.IControllerConstructor> = NavbarLoggedInMenuComponentController;
  public template = require('./navbar-logged-in-menu.html');
  public bindings: {[boundProperty: string]: string} = {
    logoutAction: '<'
  };
}
