import { AvatarUploaderComponentController } from './avatar-uploader.controller';
// tslint:disable:member-ordering
export class AvatarUploaderComponent implements ng.IComponentOptions {
  public transclude: boolean = true;
  public controller: ng.Injectable<ng.IControllerConstructor> = AvatarUploaderComponentController;
  public template = require('./avatar-uploader.html');
  public bindings: {[boundProperty: string]: string} = {
    avatarToken: '=?',
    isValid: '<',
    isSubmitted: '<',
    validationText: '@'
  };
}
