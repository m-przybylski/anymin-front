import * as angular from 'angular';
import { IDirective } from 'angular';

(function(): void {
  function proAdviceTile(): IDirective<ng.IScope> {

    return {
      template:  require('./pro-advice-tile.html'),
      restrict:     'E',
      replace: true,
      scope: {
        ngModel: '='
      }
    };
  }

  angular.module('profitelo.directives.pro-advice-tile', [])
  .directive('proAdviceTile', [proAdviceTile]);

}());
