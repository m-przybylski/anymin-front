// tslint:disable:no-require-imports
// tslint:disable:no-duplicate-imports
import * as angular from 'angular';
import { IDirective } from 'angular';

(function (): void {
  function proExpertSeeMore(): IDirective<ng.IScope> {

    return {
      template: require('./pro-expert-see-more.html'),
      restrict: 'E'
    };
  }

  angular.module('profitelo.directives.pro-expert-see-more', [])
    .directive('proExpertSeeMore', [proExpertSeeMore]);

}());
