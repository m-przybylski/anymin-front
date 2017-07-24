import * as angular from 'angular'
import {UrlService} from '../../../services/url/url.service'
import urlModule from '../../../services/url/url'
import 'common/components/interface/show-more-text/show-more-text'
import {IDirective} from 'angular'

function proExpertHeader(urlService: UrlService): IDirective {

  function linkFunction(scope: any, _element: ng.IRootElementService): void {

    scope.handleUserImage = (imgToken: string): string => {
      return imgToken !== null || imgToken === '' ? urlService.resolveFileUrl(imgToken) : ''
    }

    scope.checkCollaboratedExperts = (): boolean => {
      return scope.profile.type === 'company' || !scope.profile.colaboratedOrganizations
        || scope.profile.colaboratedOrganizations.length < 1
    }

  }

  return {
    template: require('./pro-expert-header.pug')(),
    restrict: 'E',
    replace: true,
    link: linkFunction,
    scope: {
      profile: '=?',
      handleLike: '&'
    }
  }
}

angular.module('profitelo.directives.expert-profile.pro-expert-header', [
  'profitelo.components.interface.show-more-text',
  urlModule
])
  .directive('proExpertHeader', proExpertHeader)
