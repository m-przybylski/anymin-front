function proUploader() {

  function  linkFunction(scope, element, attr) {

  }

  return {
    templateUrl: 'directives/interface/pro-uploader/pro-uploader.tpl.html',
    restrict: 'E',
    replace: true,
    link: linkFunction,
    scope: {
      proModel: '=',
      defaultValue: '@'

    }
  }
}

angular.module('profitelo.directives.interface.pro-uploader', [
  'ngFileUpload'
])
  .directive('proUploader', proUploader)