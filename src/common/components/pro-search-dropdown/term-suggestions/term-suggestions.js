(function() {
  /* @ngInject */
  function controller() {

  }

  const component = {
    transclude: true,
    templateUrl: 'components/pro-search-dropdown/term-suggestions/term-suggestions.tpl.html',
    bindings: {
      terms: '<',
      categorySlugs: '<'
    },
    controller: controller,
    controllerAs: 'vm'
  }

  angular.module('profitelo.components.pro-search-dropdown.term-suggestions', [
    'profitelo.services.search-url'
  ])
    .component('termSuggestions', component)

}())
