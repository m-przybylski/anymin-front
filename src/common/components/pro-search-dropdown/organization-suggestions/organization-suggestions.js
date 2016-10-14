( function() {
  let organizationSuggestions = {
    transclude: true,
    templateUrl: 'components/pro-search-dropdown/organization-suggestions/organization-suggestions.tpl.html',
    bindings: {
      organizations: '<',
      searchModel: '<'
    },
    controllerAs: 'vm'
  }

  angular.module('profitelo.components.pro-search-dropdown.organization-suggestions', [
    'profitelo.filters.search-bold-filter'
  ])
    .component('organizationSuggestions', organizationSuggestions)

}())
