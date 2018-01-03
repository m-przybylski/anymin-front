import {LoaderComponentController} from './loader.controller'

export class LoaderComponent implements ng.IComponentOptions {
  controller: ng.Injectable<ng.IControllerConstructor> = LoaderComponentController
  template = require('./loader.pug')
  bindings: {[boundProperty: string]: string} = {
    fileUploadInfo: '<',
    fileUploadError: '<'
  }
}
