import * as angular from 'angular'
import {IDirective} from 'angular'
import {isPlatformForExpert} from '../../constants/platform-for-expert.constant'
import {urls} from '../../constants/urls.constant'

interface IProFooterScope extends ng.IScope {
  isPlatformForExpert: boolean
  zendeskUrl: string
}

(function(): void {
  function proFooter(): IDirective {

    function linkFunction(scope: IProFooterScope): void {
      scope.isPlatformForExpert = isPlatformForExpert
      scope.zendeskUrl = urls.zendesk
    }

    return {
      template: require('./pro-footer.pug')(),
      restrict: 'E',
      link: linkFunction,
      replace: true
    }
  }

  angular.module('profitelo.directives.pro-footer', [
    'pascalprecht.translate'
  ])
  .directive('proFooter', proFooter)

}())
