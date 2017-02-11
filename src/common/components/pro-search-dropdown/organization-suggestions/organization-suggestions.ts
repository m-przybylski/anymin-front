namespace profitelo.components.proSearchDropdown.organizationDetails {

  import ICommonSettingsService = profitelo.services.commonSettings.ICommonSettingsService

  /* @ngInject */
  function organizationSuggestionsController(CommonSettingsService: ICommonSettingsService) {

    this.profileImage = (index: number) => {
      return !!this.organizations.results[index].img ? CommonSettingsService.links.imageUrl.replace('%s', this.organizations.results[index].img) : false
    }

    return this
  }

  let organizationSuggestions = {
    transclude: true,
    templateUrl: 'components/pro-search-dropdown/organization-suggestions/organization-suggestions.tpl.html',
    bindings: {
      organizations: '<',
      searchModel: '<'
    },
    controller: organizationSuggestionsController,
    controllerAs: 'vm'
  }

  angular.module('profitelo.components.pro-search-dropdown.organization-suggestions', [
    'profitelo.services.commonSettings',
    'profitelo.filters.search-bold-filter'
  ])
    .component('organizationSuggestions', organizationSuggestions)

}
