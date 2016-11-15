(function() {

  /* @ngInject */
  function serviceSuggestionsController(CommonSettingsService) {

    this.profileImage = (index) => {
      return !!this.services.results[index].owner.img ? CommonSettingsService.links.imageUrl.replace('%s', this.services.results[index].owner.img) : false
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
