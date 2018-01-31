import { NavbarLoggedInMenuComponentController } from './navbar-logged-in-menu.controller';
export class NavbarLoggedInMenuComponent implements ng.IComponentOptions {
  controller: ng.Injectable<ng.IControllerConstructor> = NavbarLoggedInMenuComponentController;
  template: string = require('./navbar-logged-in-menu.html');
  bindings: {[boundProperty: string]: string} = {
    logoutAction: '<'
  };
}
