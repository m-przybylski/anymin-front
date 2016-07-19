(function() {
  let tagSuggestions = {
    transclude: true,
    templateUrl: 'components/pro-search-dropdown/tag-suggestions/tag-suggestions.tpl.html',
    bindings: {
      tags: '<'
    },
    controllerAs: 'vm'
  }

  angular.module('profitelo.components.pro-search-dropdown.tag-suggestions', [
  ])
    .component('tagSuggestions', tagSuggestions)

}())
