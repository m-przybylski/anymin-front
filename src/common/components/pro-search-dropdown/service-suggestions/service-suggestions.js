(function() {
  let serviceSuggestions = {
    transclude: true,
    templateUrl: 'components/pro-search-dropdown/service-suggestions/service-suggestions.tpl.html',
    bindings: {
      services: '<',
      searchModel: '<'
    },
    controllerAs: 'vm'
  }

  angular.module('profitelo.components.pro-search-dropdown.service-suggestions', [
    'profitelo.filters.search-bold-filter'
  ])
    .component('serviceSuggestions', serviceSuggestions)

}())
