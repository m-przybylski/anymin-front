import * as angular from 'angular'
import {IDirective} from 'angular'

(function (): void {
  function proExpertSeeMore(): IDirective<ng.IScope, ng.IScope> {

    return {
      template: require('./pro-expert-see-more.pug')(),
      restrict: 'E',
      replace: true
    }
  }

  angular.module('profitelo.directives.pro-expert-see-more', [])
    .directive('proExpertSeeMore', proExpertSeeMore)

}())
