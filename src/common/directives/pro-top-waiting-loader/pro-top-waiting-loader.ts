(function() {

  function proTopWaitingLoader(proTopWaitingLoaderService) {

    function proTopWaitingLoaderLinkFn(scope, element, attr) {

      let setProgress = (progress) => {
        scope.progress = progress
      }
      
      proTopWaitingLoaderService.bindProgress(setProgress)

    }
    
    return {
      restrict:       'E',
      replace:        true,
      templateUrl:    'directives/pro-top-waiting-loader/pro-top-waiting-loader.tpl.html',
      link: proTopWaitingLoaderLinkFn
    }
  }

  angular.module('profitelo.directives.pro-top-waiting-loader', [
    'pascalprecht.translate',
    'profitelo.services.pro-top-waiting-loader-service'
  ])
  .directive('proTopWaitingLoader', proTopWaitingLoader)

}())