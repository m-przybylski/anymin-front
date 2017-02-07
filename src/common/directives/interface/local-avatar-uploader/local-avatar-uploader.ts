namespace profitelo.directives.interface.localAvatarUploader {

  import IRootElementService = angular.IRootElementService
  import IStyleConstant = profitelo.constants.style.IStyleConstant

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
    constructor(private $timeout: ng.ITimeoutService, private $interval: ng.IIntervalService,
                private $window: ng.IWindowService, private styleConstant: IStyleConstant) {
    }

    public link = (scope: ILocalAvatarUploaderDirectiveScope, element: any, attr: ng.IAttributes) => {
      this.element = element

      this.element.find('input').on('change', (e: any) => {
        const reader = new FileReader()

        reader.onload = (e: any) => {
          scope.onFileUpload(e.target.result)

        }

        reader.readAsDataURL(e.target.files[0])
      })

    }

    public static getInstance = () => {
      const instance = ($timeout: ng.ITimeoutService, $window: ng.IWindowService, $interval: ng.IIntervalService,
                        styleConstant) =>
        new LocalAvatarUploaderDirective($timeout, $interval, $window, styleConstant)
      instance.$inject = ['$timeout', '$window', '$interval', 'styleConstant']
      return instance
    }

  }

  angular.module('profitelo.directives.interface.local-avatar-uploader', [])
  .directive('localAvatarUploader', LocalAvatarUploaderDirective.getInstance())
}
