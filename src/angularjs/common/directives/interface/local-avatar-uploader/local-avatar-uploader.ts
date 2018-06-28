// tslint:disable:readonly-array
// tslint:disable:prefer-method-signature
// tslint:disable:no-require-imports
// tslint:disable:no-empty
// tslint:disable:no-any
// tslint:disable:newline-before-return
import * as angular from 'angular';

interface ILocalAvatarUploaderDirectiveScope extends ng.IScope {
  onFileUpload: (noLoadEventObject: any, changeEventObject: any, callback: () => void) => void;
  imageSource: string;
}

// tslint:disable:member-ordering
class LocalAvatarUploaderDirective implements ng.IDirective<ng.IScope> {
  public template = require('./local-avatar-uploader.html');
  public restrict = 'E';
  public transclude = false;
  public scope = {
    onFileUpload: '=?'
  };

  public static $inject = [];

  constructor() {
  }

  public link = (scope: ILocalAvatarUploaderDirectiveScope, element: any, _attr: ng.IAttributes): void => {

    element.find('input').on('change', (changeEventObject: any) => {
      const reader = new FileReader();
      reader.onload = (noLoadEventObject: any): void => {
        scope.onFileUpload(noLoadEventObject.target.result, changeEventObject.target.files[0], () => {
          element.find('input')[0].value = '';
        });
      };
      reader.readAsDataURL(changeEventObject.target.files[0]);
    });

  }

  public static getInstance = (): () => LocalAvatarUploaderDirective => {
    const instance = (): LocalAvatarUploaderDirective =>
      new LocalAvatarUploaderDirective();
    instance.$inject = [];
    return instance;
  }

}

angular.module('profitelo.directives.interface.local-avatar-uploader', [])
  .directive('localAvatarUploader', LocalAvatarUploaderDirective.getInstance());
