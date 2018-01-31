import { FileUploaderComponentController } from './file-uploader.controller';
// tslint:disable:member-ordering
export class FileUploaderComponent implements ng.IComponentOptions {
  public transclude: boolean = true;
  public controller: ng.Injectable<ng.IControllerConstructor> = FileUploaderComponentController;
  public template = require('./file-uploader.html');
  public bindings: {[boundProperty: string]: string} = {
    tokenList: '=?',
    isValidCallback: '<'
  };
}
