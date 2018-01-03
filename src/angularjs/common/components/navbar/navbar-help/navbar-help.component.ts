import {NavbarHelpComponentController} from './navbar-help.controller'

export class NavbarHelpComponent implements ng.IComponentOptions {
  controller: ng.Injectable<ng.IControllerConstructor> = NavbarHelpComponentController
  template: string = require('./navbar-help.pug')
  bindings: {[boundProperty: string]: string} = {
    onClick: '<'
  }
}
