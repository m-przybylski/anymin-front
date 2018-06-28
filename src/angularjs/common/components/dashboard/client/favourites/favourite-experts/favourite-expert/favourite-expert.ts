// tslint:disable:no-invalid-this
// tslint:disable:no-duplicate-imports
// tslint:disable:newline-before-return
import * as angular from 'angular';
import { UrlService } from '../../../../../../services/url/url.service';
import { StateService } from '@uirouter/angularjs';
import uiRouter from '@uirouter/angularjs';

function controller($state: StateService, urlService: UrlService): void {

  const ORGANIZATION_SHORTCUT = 'ORG';

  this.consultationOwnerImage = (): string | boolean => {
    const imageToken = this.profile.avatar || this.profile.logo;
    return imageToken !== null || imageToken === '' ? urlService.resolveFileUrl(imageToken) : false;
  };

  this.goToProfile = (): void => {
    const stateName = this.favouriteExpert.profileFavourite.profileType === ORGANIZATION_SHORTCUT ?
      'app.company-profile' : 'app.expert-profile';
    $state.go(stateName, {profileId: this.favouriteExpert.profile.id});
  };

  this.$onInit = (): void => {
    this.profile = this.favouriteExpert.profileFavourite.profileType === ORGANIZATION_SHORTCUT ?
      this.favouriteExpert.profile.organizationDetails : this.favouriteExpert.profile.expertDetails;
  };

  return this;
}

const component = {
  template: require('./favourite-expert.html'),
  controller: ['$state', 'urlService', controller],
  controllerAs: '$ctrl',
  bindings: {
    favouriteExpert: '<'
  }
};

angular.module('profitelo.components.dashboard.client.favourites.favourite-experts.favourite-expert', [
  'pascalprecht.translate',
    uiRouter,
    'profitelo.services.url'
])
  .component('clientFavouriteExpert', component);
