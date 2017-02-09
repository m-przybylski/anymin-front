namespace profitelo.directives.proTopWaitingLoader {

  import ITopWaitingLoaderService = profitelo.services.topWaitingLoader.ITopWaitingLoaderService

  function proTopWaitingLoader(topWaitingLoaderService: ITopWaitingLoaderService) {

    function proTopWaitingLoaderLinkFn(scope: any, _element: ng.IRootElementService, _attr: ng.IAttributes) {

      let setProgress = (progress: number) => {
        scope.progress = progress
      }

      topWaitingLoaderService.bindProgress(setProgress)
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

}

