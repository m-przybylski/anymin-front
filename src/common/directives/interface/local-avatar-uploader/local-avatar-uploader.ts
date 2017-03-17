namespace profitelo.directives.interface.localAvatarUploader {

  interface ILocalAvatarUploaderDirectiveScope extends ng.IScope {
    onFileUpload: (noLoadEventObject: any, changeEventObject: any, callback: () => void) => void
    imageSource: string
  }

  class LocalAvatarUploaderDirective implements ng.IDirective {
    public template = require('./local-avatar-uploader.pug')()
    public restrict: string = 'E'
    public transclude: boolean = false
    public scope = {
      onFileUpload: '=?'
    }

    /* @ngInject */
    constructor() {
    }

    public link = (scope: ILocalAvatarUploaderDirectiveScope, element: any, _attr: ng.IAttributes) => {

      element.find('input').on('change', (changeEventObject: any) => {
        const reader = new FileReader()
        reader.onload = (noLoadEventObject: any) => {
          scope.onFileUpload(noLoadEventObject.target.result, changeEventObject.target.files[0], () => {
            element.find('input')[0].value = ''
          })
        }
        reader.readAsDataURL(changeEventObject.target.files[0])
      })

    }

    public static getInstance = () => {
      const instance = () =>
        new LocalAvatarUploaderDirective()
      instance.$inject = []
      return instance
    }

  }

  angular.module('profitelo.directives.interface.local-avatar-uploader', [])
  .directive('localAvatarUploader', LocalAvatarUploaderDirective.getInstance())
}
