import {NavbarAvailbilityComponentController} from './navbar-availbility.controller'

export class NavbarAvailbilityComponent implements ng.IComponentOptions {
  transclude: boolean = true
  controller: ng.Injectable<ng.IControllerConstructor> = NavbarAvailbilityComponentController
  template = require('./navbar-availbility.pug')()
  bindings: {[boundProperty: string]: string} = {}
}
