import {NavbarExpertVisibilityComponentController} from './navbar-expert-visibility.controller'

export class NavbarExpertVisibilityComponent implements ng.IComponentOptions {
  transclude: boolean = true
  controller: ng.Injectable<ng.IControllerConstructor> = NavbarExpertVisibilityComponentController
  template = require('./navbar-expert-visibility.html')
  bindings: {[boundProperty: string]: string} = {}
}
