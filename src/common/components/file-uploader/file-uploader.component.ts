import {FileUploaderComponentController} from './file-uploader.controller'
export class FileUploaderComponent implements ng.IComponentOptions {
  transclude: boolean = true
  controller: ng.Injectable<ng.IControllerConstructor> = FileUploaderComponentController
  template = require('./file-uploader.pug')()
  bindings: {[boundProperty: string]: string} = {
    tokenList: '=?',
    isValidCallback: '<'
  }
}
