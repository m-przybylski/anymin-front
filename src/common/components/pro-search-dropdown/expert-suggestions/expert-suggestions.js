(function() {

  /* @ngInject */
  function expertSuggestionsController(CommonSettingsService) {

    this.profileImage = (index) => {
        return !!this.experts.results[index].img ? CommonSettingsService.links.imageUrl.replace('%s', this.experts.results[index].img) : null
    }

    return this
  }

  let expertSuggestions = {
    transclude: true,
    templateUrl: 'components/pro-search-dropdown/expert-suggestions/expert-suggestions.tpl.html',
    bindings: {
      experts: '<',
      searchModel: '<'
    },
    controller: expertSuggestionsController,
    controllerAs: 'vm'
  }

  angular.module('profitelo.components.pro-search-dropdown.expert-suggestions', [
    'profitelo.services.commonSettings',
    'profitelo.filters.search-bold-filter'
  ])
    .component('expertSuggestions', expertSuggestions)

}())
