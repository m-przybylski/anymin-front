import * as angular from 'angular'
import {IDirective} from 'angular'
import {CommonConfig} from '../../../../generated_modules/common-config/common-config'
import {Config} from '../../../app/config';

interface IProFooterScope extends ng.IScope {
  isPlatformForExpert: boolean
  zendeskUrl: string
  anymindLandingUrl: string
  anymindBlogUrl: string
  termsOfServiceUrl: string
  privacyPolicyUrl: string
  helpMailUrl: string
}

(function(): void {
  function proFooter(CommonConfig: CommonConfig): IDirective<ng.IScope> {

    function linkFunction(scope: IProFooterScope): void {
      scope.isPlatformForExpert = Config.isPlatformForExpert
      scope.zendeskUrl = CommonConfig.getAllData().urls.zendesk
      scope.anymindLandingUrl = CommonConfig.getAllData().urls['widget-landing']
      scope.anymindBlogUrl = CommonConfig.getAllData().urls['widget-blog']
      scope.termsOfServiceUrl = CommonConfig.getAllData().urls['terms-of-service']
      scope.privacyPolicyUrl = CommonConfig.getAllData().urls['privacy-policy']
      scope.helpMailUrl = CommonConfig.getAllData().config['help-mail']
    }

    return {
      template: require('./pro-footer.pug')(),
      restrict: 'E',
      link: linkFunction,
      replace: true
    }
  }

  angular.module('profitelo.directives.pro-footer', [
    'pascalprecht.translate',
    'commonConfig'
  ])
  .directive('proFooter', proFooter)

}())
