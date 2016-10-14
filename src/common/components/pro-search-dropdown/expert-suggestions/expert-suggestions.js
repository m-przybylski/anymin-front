(function() {
  let expertSuggestions = {
    transclude: true,
    templateUrl: 'components/pro-search-dropdown/expert-suggestions/expert-suggestions.tpl.html',
    bindings: {
      experts: '<',
      searchModel: '<'
    },
    controllerAs: 'vm'
  }

  angular.module('profitelo.components.pro-search-dropdown.expert-suggestions', [
    'profitelo.filters.search-bold-filter'
  ])
    .component('expertSuggestions', expertSuggestions)

}())
