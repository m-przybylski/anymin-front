import { AvatarUploaderComponentController } from './avatar-uploader.controller';
export class AvatarUploaderComponent implements ng.IComponentOptions {
  transclude: boolean = true;
  controller: ng.Injectable<ng.IControllerConstructor> = AvatarUploaderComponentController;
  template = require('./avatar-uploader.html');
  bindings: {[boundProperty: string]: string} = {
    avatarToken: '=?',
    isValid: '<',
    isSubmitted: '<',
    validationText: '@'
  };
}
