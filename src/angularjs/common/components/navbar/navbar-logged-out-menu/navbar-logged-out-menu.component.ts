import {NavbarLoggedOutMenuComponentController} from './navbar-logged-out-menu.controller'
export class NavbarLoggedOutMenuComponent implements ng.IComponentOptions {
  controller: ng.Injectable<ng.IControllerConstructor> = NavbarLoggedOutMenuComponentController
  template: string = require('./navbar-logged-out-menu.html')
  bindings: {[boundProperty: string]: string} = {

  }
}
