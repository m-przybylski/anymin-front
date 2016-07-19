(function() {
  let organizationSuggestions = {
    transclude: true,
    templateUrl: 'components/pro-search-dropdown/organization-suggestions/organization-suggestions.tpl.html',
    bindings: {
      organizations: '<'
    },
    controllerAs: 'vm'
  }

  angular.module('profitelo.components.pro-search-dropdown.organization-suggestions', [
  ])
    .component('organizationSuggestions', organizationSuggestions)

}())
