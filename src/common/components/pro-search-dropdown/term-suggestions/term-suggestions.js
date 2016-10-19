(function() {
  const component = {
    transclude: true,
    templateUrl: 'components/pro-search-dropdown/term-suggestions/term-suggestions.tpl.html',
    bindings: {
      terms: '<',
      categorySlugs: '<',
      searchModel: '<'
    },
    controllerAs: 'vm'
  }

  angular.module('profitelo.components.pro-search-dropdown.term-suggestions', [
    'profitelo.services.search-url',
    'profitelo.filters.search-bold-filter',
    'profitelo.filters.rankSearch'
  ])
    .component('termSuggestions', component)

}())
