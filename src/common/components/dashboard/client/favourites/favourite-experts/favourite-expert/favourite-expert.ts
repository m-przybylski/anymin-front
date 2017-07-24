import * as angular from 'angular'
import {UrlService} from '../../../../../../services/url/url.service'

/* @ngInject */
function controller($state: ng.ui.IStateService, urlService: UrlService): void {

  const ORGANIZATION_SHORTCUT = 'ORG'

  this.consultationOwnerImage = (): string | boolean => {
    const imageToken = this.profile.avatar || this.profile.logo
    return imageToken !== null || imageToken === '' ? urlService.resolveFileUrl(imageToken) : false
  }

  this.goToProfile = (): void => {
    const stateName = this.favouriteExpert.profileFavourite.profileType === ORGANIZATION_SHORTCUT ?
      'app.company-profile' : 'app.expert-profile'
    $state.go(stateName, {profileId: this.favouriteExpert.profile.id})
  }

  this.$onInit = (): void => {
    this.profile = this.favouriteExpert.profileFavourite.profileType === ORGANIZATION_SHORTCUT ?
      this.favouriteExpert.profile.organizationDetails : this.favouriteExpert.profile.expertDetails
  }

  return this
}

const component = {
  template: require('./favourite-expert.pug')(),
  controller: controller,
  controllerAs: '$ctrl',
  bindings: {
    favouriteExpert: '<'
  }
}

angular.module('profitelo.components.dashboard.client.favourites.favourite-experts.favourite-expert', [
  'pascalprecht.translate',
  'ui.router',
  'profitelo.services.url'
])
  .component('clientFavouriteExpert', component)
