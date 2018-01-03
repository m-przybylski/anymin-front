import {PagePreloaderComponentController} from './page-preloader.controller'
export class PagePreloaderComponent implements ng.IComponentOptions {
  controller: ng.Injectable<ng.IControllerConstructor> = PagePreloaderComponentController
  template = require('./page-preloader.pug')
  bindings: { [boundProperty: string]: string } = {
  }
}
