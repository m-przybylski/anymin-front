(function() {
  let expertSuggestions = {
    transclude: true,
    templateUrl: 'components/pro-search-dropdown/expert-suggestions/expert-suggestions.tpl.html',
    bindings: {
      experts: '<'
    },
    controllerAs: 'vm'
  }

  angular.module('profitelo.components.pro-search-dropdown.expert-suggestions', [
  ])
    .component('expertSuggestions', expertSuggestions)

}())
