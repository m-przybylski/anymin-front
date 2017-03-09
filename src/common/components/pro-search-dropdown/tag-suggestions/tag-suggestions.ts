(function() {
  let tagSuggestions = {
    transclude: true,
    template: require('./tag-suggestions.jade')(),
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
