import {NavbarComponentController} from './navbar.controller'

export class NavbarComponent implements ng.IComponentOptions {
  controller: ng.Injectable<ng.IControllerConstructor> = NavbarComponentController
  template: string = require('./navbar.pug')()
  bindings: {[boundProperty: string]: string} = {
    searchModel: '=?'
  }
}
