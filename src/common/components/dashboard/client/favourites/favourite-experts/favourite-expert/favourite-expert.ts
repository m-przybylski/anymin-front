(function() {
  /* @ngInject */
  function controller($state, HelperService) {
    this.profile = this.favouriteExpert.profile.organizationDetails ? this.favouriteExpert.profile.organizationDetails : this.favouriteExpert.profile.expertDetails

    this.consultationOwnerImage = () => {
       const imageToken = this.profile.avatar || this.profile.logo
       return imageToken !== null ||  imageToken === '' ? HelperService.fileUrlResolver(imageToken) : false
    }
    this.goToProfile = () => {
      const stateName  = this.favouriteExpert.profile.organizationDetails ? 'app.company-profile' : 'app.expert-profile'
      $state.go(stateName, { profileId: this.favouriteExpert.profile.id })
    }
    return this
  }

  const component = {
    templateUrl: 'components/dashboard/client/favourites/favourite-experts/favourite-expert/favourite-expert.tpl.html',
    controller: controller,
    controllerAs: '$ctrl',
    bindings: {
      favouriteExpert:'<'
    }
  }

  angular.module('profitelo.components.dashboard.client.favourites.favourite-experts.favourite-expert', [
    'pascalprecht.translate',
    'ui.router',
    'profitelo.services.helper'
  ])
    .component('clientFavouriteExpert', component)
}())
