// tslint:disable:only-arrow-functions
// tslint:disable:no-require-imports
// tslint:disable:no-duplicate-imports
import * as angular from 'angular';
import { IDirective } from 'angular';
import { Config } from '../../../../config';
import { CommonConfig } from '../../../../common-config';

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
      scope.zendeskUrl = CommonConfig.getCommonConfig().urls.zendesk;
      scope.anymindBlogUrl = CommonConfig.getCommonConfig().urls['widget-blog'];
      scope.termsOfServiceUrl = CommonConfig.getCommonConfig().urls['terms-of-service'];
      scope.privacyPolicyUrl = CommonConfig.getCommonConfig().urls['privacy-policy'];
      scope.helpMailUrl = CommonConfig.getCommonConfig().config['help-mail'];
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
