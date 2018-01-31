import { NavbarComponentController } from './navbar.controller';

// tslint:disable:member-ordering
export class NavbarComponent implements ng.IComponentOptions {
  public controller: ng.Injectable<ng.IControllerConstructor> = NavbarComponentController;
  public template: string = require('./navbar.html');
  public bindings: {[boundProperty: string]: string} = {
    searchInputQueryValue: '<'
  };
}
