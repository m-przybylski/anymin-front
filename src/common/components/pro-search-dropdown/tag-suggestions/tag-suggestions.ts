(function() {
  const tagSuggestions = {
    transclude: true,
    template: require('./tag-suggestions.pug')(),
    bindings: {
      tags: '<',
      searchModel: '<'
    },
    controllerAs: 'vm'
  }

  angular.module('profitelo.components.pro-search-dropdown.tag-suggestions', [
    'profitelo.filters.search-bold-filter'
  ])
    .component('tagSuggestions', tagSuggestions)
}())
