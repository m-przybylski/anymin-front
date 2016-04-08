function proUploader($timeout) {

  function  linkFunction(scope, element, attr) {
    scope.animate = function(){
      scope.header = "COMMON.DIRECTIVES.INTERFACE.UPLOADER.HEADER"
      let fillContent = $(element).find('.upload-field-fill')
      fillContent.animate({
        height: "100%"
      }, 1000)
    }


  }

  return {
    templateUrl: 'directives/interface/pro-uploader/pro-uploader.tpl.html',
    restrict: 'E',
    replace: true,
    link: linkFunction,
    scope: {
      proModel: '=',
      defaultValue: '@',
      accept: '@',
      pattern: '@'

    }
  }
}

angular.module('profitelo.directives.interface.pro-uploader', [])
  .directive('proUploader', proUploader)