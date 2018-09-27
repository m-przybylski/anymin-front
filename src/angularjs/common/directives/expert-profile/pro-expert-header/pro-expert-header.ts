// tslint:disable:only-arrow-functions
// tslint:disable:no-require-imports
// tslint:disable:no-import-side-effect
// tslint:disable:no-implicit-dependencies
// tslint:disable:no-duplicate-imports
// tslint:disable:no-any
import * as angular from 'angular';
import { UrlService } from '../../../services/url/url.service';
import urlModule from '../../../services/url/url';
import 'angularjs/common/components/interface/show-more-text/show-more-text';
import { IDirective } from 'angular';

// tslint:disable:strict-type-predicates
function proExpertHeader(urlService: UrlService): IDirective<ng.IScope> {
  function linkFunction(scope: any, _element: ng.IRootElementService): void {
    scope.handleUserImage = (imgToken: string): string =>
      imgToken !== null || imgToken === '' ? urlService.resolveFileUrl(imgToken) : '';

    scope.checkCollaboratedExperts = (): boolean =>
      scope.profile.type === 'company' ||
      !scope.profile.colaboratedOrganizations ||
      scope.profile.colaboratedOrganizations.length < 1;
  }

  return {
    template: require('./pro-expert-header.html'),
    restrict: 'E',
    replace: true,
    link: linkFunction,
    scope: {
      profile: '=?',
      handleLike: '&',
    },
  };
}

angular
  .module('profitelo.directives.expert-profile.pro-expert-header', [
    'profitelo.components.interface.show-more-text',
    urlModule,
  ])
  .directive('proExpertHeader', ['urlService', proExpertHeader]);
