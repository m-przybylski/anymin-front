import {PagePreloaderComponentController} from './page-preloader.controller'
export class PagePreloaderComponent implements ng.IComponentOptions {
  controller: ng.Injectable<ng.IControllerConstructor> = PagePreloaderComponentController
  template = require('./page-preloader.html')
  bindings: { [boundProperty: string]: string } = {
  }
}
