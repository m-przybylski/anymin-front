// tslint:disable:no-require-imports
// tslint:disable:no-duplicate-imports
import * as angular from 'angular';
import { ISocialUrl, UrlService } from '../../services/url/url.service';
import { IDirective } from 'angular';

export interface ISocialIconGetterLink extends ng.IScope {
  url?: string;
  social?: ISocialUrl;
}

function proSocialIconGetter(urlService: UrlService): IDirective<ng.IScope> {

  function proSocialIconGetterLink(scope: ISocialIconGetterLink): void {

    scope.$watch('url', function (newVal: string, _oldVal: string): void {
      scope.social = urlService.resolveSocialUrl(newVal);
    });
  }

  return {
    restrict: 'EA',
    replace: true,
    transclude: true,
    template: require('./pro-social-icon-getter.html'),
    scope: {
      url: '='
    },
    link: proSocialIconGetterLink
  };
}

angular.module('profitelo.directives.pro-social-icon-getter', [
  'profitelo.services.url'
])
  .directive('proSocialIconGetter', ['urlService', proSocialIconGetter]);
