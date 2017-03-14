import {NavbarComponentController} from "./navbar.controller"

export class NavbarComponent implements ng.IComponentOptions {
  controller: ng.Injectable<ng.IControllerConstructor> = NavbarComponentController
  template: string = require('./navbar.jade')()
  bindings: {[boundProperty: string]: string} = {
    logoutAction: '=?'
  }
}
