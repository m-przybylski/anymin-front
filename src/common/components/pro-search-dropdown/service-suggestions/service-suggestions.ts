(function() {

  /* @ngInject */
  function serviceSuggestionsController($state, CommonSettingsService) {

    this.profileImage = (index) => {
      return !!this.services.results[index].owner.img ? CommonSettingsService.links.imageUrl.replace('%s', this.services.results[index].owner.img) : false
    }

    this.goToProfile = (indexOfService) => {
        const service = this.services.results[indexOfService]
        const stateName = service.owner.type === 'ORG' ? 'app.company-profile' : 'app.expert-profile'
        $state.go(stateName, {profileId: service.owner.id, primaryConsultationId: service.id})
    }

    return this
  }

  let serviceSuggestions = {
    transclude: true,
    templateUrl: 'components/pro-search-dropdown/service-suggestions/service-suggestions.tpl.html',
    bindings: {
      services: '<',
      searchModel: '<'
    },
    controller: serviceSuggestionsController,
    controllerAs: 'vm'
  }

  angular.module('profitelo.components.pro-search-dropdown.service-suggestions', [
    'profitelo.services.commonSettings',
    'profitelo.filters.search-bold-filter'
  ])
    .component('serviceSuggestions', serviceSuggestions)

}())
