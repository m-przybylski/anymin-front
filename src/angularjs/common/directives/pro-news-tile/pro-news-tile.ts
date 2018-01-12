import * as angular from 'angular'
import {IDirective} from 'angular'

(function(): void {
  function proNewsTile(): IDirective<ng.IScope> {

    return {
      template:  require('./pro-news-tile.html'),
      restrict:     'E',
      replace: true,
      scope: {
        ngModel: '='
      }
    }
  }

  angular.module('profitelo.directives.pro-news-tile', [])
  .directive('proNewsTile', [proNewsTile])

}())
