namespace profitelo.directives.interface.localAvatarUploader {

  interface ILocalAvatarUploaderDirectiveScope extends ng.IScope {
    onFileUpload: Function
    imageSource: string
  }

  class LocalAvatarUploaderDirective implements ng.IDirective {
    public templateUrl: string = 'directives/interface/local-avatar-uploader/local-avatar-uploader.tpl.html'
    public restrict: string = 'E'
    public transclude: boolean = false
    public scope = {
      onFileUpload: '=?'
    }

    private element: any

    /* ngInject */
    constructor() {
    }

    public link = (scope: ILocalAvatarUploaderDirectiveScope, element: ng.IAugmentedJQuery, _attr: ng.IAttributes) => {
      this.element = element

      this.element.find('input').on('change', (changeEventObject: any) => {
        const reader = new FileReader()
        reader.onload = (noLoadEventObject: any) => {
          scope.onFileUpload(noLoadEventObject.target.result, changeEventObject.target.files[0], () => {
            this.element.find('input')[0].value = ''
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
