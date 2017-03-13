import * as angular from "angular"
import filtersModule from "../../../filters/filters"
import searchUrlModule from "../../../services/search-url/search-url"

const component = {
  transclude: true,
  template: require("./term-suggestions.jade")(),
  bindings: {
    terms: '<',
    categorySlugs: '<',
    searchModel: '<'
  },
  controllerAs: 'vm'
}

angular.module('profitelo.components.pro-search-dropdown.term-suggestions', [
  searchUrlModule,
  filtersModule
])
  .component('termSuggestions', component)
