namespace profitelo.components.proSearchDropdown.expertSuggestions {

  import ICommonSettingsService = profitelo.services.commonSettings.ICommonSettingsService

  /* @ngInject */
  function expertSuggestionsController(CommonSettingsService: ICommonSettingsService) {

    this.profileImage = (index: number) => {
      return !!this.experts.results[index].img ? CommonSettingsService.links.imageUrl.replace('%s', this.experts.results[index].img) : false
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

}
