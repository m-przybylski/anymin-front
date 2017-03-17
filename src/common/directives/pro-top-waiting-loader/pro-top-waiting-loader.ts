import * as angular from 'angular'
import topWaitingLoader from '../../services/top-waiting-loader/top-waiting-loader'
import {TopWaitingLoaderService} from '../../services/top-waiting-loader/top-waiting-loader.service'

function proTopWaitingLoader(topWaitingLoaderService: TopWaitingLoaderService) {

  function proTopWaitingLoaderLinkFn(scope: any, _element: ng.IRootElementService, _attr: ng.IAttributes) {

    let setProgress = (progress: number) => {
      scope.progress = progress
    }

    topWaitingLoaderService.bindProgress(setProgress)
  }

  return {
    restrict: 'E',
    replace: true,
    template: require('./pro-top-waiting-loader.pug')(),
    link: proTopWaitingLoaderLinkFn
  }
}

angular.module('profitelo.directives.pro-top-waiting-loader', [
  'pascalprecht.translate',
  topWaitingLoader
])
  .directive('proTopWaitingLoader', proTopWaitingLoader)
