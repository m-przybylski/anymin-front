import { LoaderComponentController } from './loader.controller';

// tslint:disable:member-ordering
export class LoaderComponent implements ng.IComponentOptions {
  public controller: ng.Injectable<ng.IControllerConstructor> = LoaderComponentController;
  public template = require('./loader.html');
  public bindings: {[boundProperty: string]: string} = {
    fileUploadInfo: '<',
    fileUploadError: '<'
  };
}
