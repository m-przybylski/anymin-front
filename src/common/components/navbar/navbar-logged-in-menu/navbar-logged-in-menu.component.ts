import {NavbarLoggedInMenuComponentController} from "./navbar-logged-in-menu.controller"
export class NavbarLoggedInMenuComponent implements ng.IComponentOptions {
  controller: ng.Injectable<ng.IControllerConstructor> = NavbarLoggedInMenuComponentController
  template: string = require('./navbar-logged-in-menu.pug')()
  bindings: {[boundProperty: string]: string} = {
    logoutAction: '<'
  }
}
