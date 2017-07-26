import * as angular from 'angular'
import {IDirective} from 'angular'

(function(): void {
  function proFooter(): IDirective {

    return {
      template: require('./pro-footer.pug')(),
      restrict: 'E',
      replace: true
    }
  }

  angular.module('profitelo.directives.pro-footer', [
    'pascalprecht.translate'
  ])
  .directive('proFooter', proFooter)

}())
