import {NavbarVisibilityComponentController} from './navbar-visibility.controller'

export class NavbarVisibilityComponent implements ng.IComponentOptions {
  transclude: boolean = true
  controller: ng.Injectable<ng.IControllerConstructor> = NavbarVisibilityComponentController
  template = require('./navbar-visibility.pug')()
  bindings: {[boundProperty: string]: string} = {}
}
