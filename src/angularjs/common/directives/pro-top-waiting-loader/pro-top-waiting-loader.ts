// tslint:disable:no-duplicate-imports
// tslint:disable:no-any
import * as angular from 'angular';
import topWaitingLoader from '../../services/top-waiting-loader/top-waiting-loader';
import { TopWaitingLoaderService } from '../../services/top-waiting-loader/top-waiting-loader.service';
import { IDirective } from 'angular';

function proTopWaitingLoader(topWaitingLoaderService: TopWaitingLoaderService): IDirective<ng.IScope> {

  function proTopWaitingLoaderLinkFn(scope: any, _element: ng.IRootElementService, _attr: ng.IAttributes): void {

    const setProgress = (progress: number): void => {
      scope.progress = progress;
    };

    topWaitingLoaderService.bindProgress(setProgress);
  }

  return {
    restrict: 'E',
    template: require('./pro-top-waiting-loader.html'),
    link: proTopWaitingLoaderLinkFn
  };
}

angular.module('profitelo.directives.pro-top-waiting-loader', [
  'pascalprecht.translate',
  topWaitingLoader
])
  .directive('proTopWaitingLoader', ['topWaitingLoaderService', proTopWaitingLoader]);
