import * as angular from 'angular'
import {UrlService} from '../../services/url/url.service'
import {IDirective} from 'angular'

function proSocialIconGetter(urlService: UrlService): IDirective<ng.IScope, ng.IScope> {

  function proSocialIconGetterLink(scope: any): void {

    scope.$watch('url', function (newVal: string, _oldVal: string): void {
      scope.social = urlService.resolveSocialUrl(newVal)
    })
  }

  return {
    restrict: 'EA',
    replace: true,
    transclude: true,
    template: require('./pro-social-icon-getter.pug')(),
    scope: {
      url: '='
    },
    link: proSocialIconGetterLink
  }
}

angular.module('profitelo.directives.pro-social-icon-getter', [
  'profitelo.services.url'
])
  .directive('proSocialIconGetter', proSocialIconGetter)
