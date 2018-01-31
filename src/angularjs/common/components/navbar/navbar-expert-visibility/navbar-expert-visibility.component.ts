import { NavbarExpertVisibilityComponentController } from './navbar-expert-visibility.controller';

// tslint:disable:member-ordering
export class NavbarExpertVisibilityComponent implements ng.IComponentOptions {
  public transclude = true;
  public controller: ng.Injectable<ng.IControllerConstructor> = NavbarExpertVisibilityComponentController;
  public template = require('./navbar-expert-visibility.html');
  public bindings: {[boundProperty: string]: string} = {};
}
