import * as angular from 'angular'
import {UrlService} from '../../../services/url/url.service'
import urlModule from '../../../services/url/url'
import 'common/components/interface/show-more-text/show-more-text'

function proExpertHeader(urlService: UrlService) {

  function linkFunction(scope: any, _element: ng.IRootElementService) {

    scope.handleUserImage = (imgToken: string) => {
      return imgToken !== null || imgToken === '' ? urlService.resolveFileUrl(imgToken) : ''
    }

    scope.checkCollaboratedExperts = () => {
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
