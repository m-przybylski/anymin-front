(function () {
  /* @ngInject */
  function controller($state, urlService) {

    this.consultationOwnerImage = () => {
      const imageToken = this.profile.avatar || this.profile.logo
      return imageToken !== null || imageToken === '' ? urlService.resolveFileUrl(imageToken) : false
    }

    this.goToProfile = () => {
      const stateName = this.favouriteExpert.profile.organizationDetails ?
        'app.company-profile' : 'app.expert-profile'
      $state.go(stateName, {profileId: this.favouriteExpert.profile.id})
    }

    this.$onInit = () => {
      this.profile = this.favouriteExpert.profile.organizationDetails ?
        this.favouriteExpert.profile.organizationDetails : this.favouriteExpert.profile.expertDetails
    }

    return this
  }

  const component = {
    templateUrl: 'components/dashboard/client/favourites/favourite-experts/favourite-expert/favourite-expert.tpl.html',
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
}())
