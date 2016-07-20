(function() {
  let termSuggestions = {
    transclude: true,
    templateUrl: 'components/pro-search-dropdown/term-suggestions/term-suggestions.tpl.html',
    bindings: {
      terms: '<'
    },
    controllerAs: 'vm'
  }

  angular.module('profitelo.components.pro-search-dropdown.term-suggestions', [

  ])
    .component('termSuggestions', termSuggestions)

}())
