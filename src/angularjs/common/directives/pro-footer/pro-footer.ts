// tslint:disable:only-arrow-functions
// tslint:disable:no-require-imports
// tslint:disable:no-duplicate-imports
import * as angular from 'angular';
import { IDirective } from 'angular';
import { Config } from '../../../../config';

interface IProFooterScope extends ng.IScope {
  googlePlayUrl: string;
  isPlatformForExpert: boolean;
  zendeskUrl: string;
  anymindBlogUrl: string;
  termsOfServiceUrl: string;
  privacyPolicyUrl: string;
  helpMailUrl: string;
}

(function(): void {
  function proFooter(): IDirective<ng.IScope> {

    function linkFunction(scope: IProFooterScope): void {
      scope.googlePlayUrl = Config.googlePlayProfile.url;
      scope.isPlatformForExpert = Config.isPlatformForExpert;
      scope.zendeskUrl = 'https://anymind.zendesk.com/';
      scope.anymindBlogUrl = 'https://anymind-widget.com/blog/';
      scope.termsOfServiceUrl = 'https://anymind.com/regulamin/';
      scope.privacyPolicyUrl = 'https://anymind.com/polityka-prywatnosci/';
      scope.helpMailUrl = 'hello@anymind.com';
    }

    return {
      template: require('./pro-footer.html'),
      restrict: 'E',
      link: linkFunction,
      replace: true
    };
  }

  angular.module('profitelo.directives.pro-footer', [
    'pascalprecht.translate'
  ])
  .directive('proFooter', [proFooter]);

}());
