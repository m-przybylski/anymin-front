(function() {
  let serviceSuggestions = {
    transclude: true,
    templateUrl: 'components/pro-search-dropdown/service-suggestions/service-suggestions.tpl.html',
    bindings: {
      services: '<'
    },
    controllerAs: 'vm'
  }

  angular.module('profitelo.components.pro-search-dropdown.service-suggestions', [
  ])
    .component('serviceSuggestions', serviceSuggestions)

}())
