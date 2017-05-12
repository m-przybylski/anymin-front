import * as angular from 'angular'
import userAvatarModule from '../../interface/user-avatar/user-avatar'

/* @ngInject */
function expertSuggestionsController() {

  return this
}

const expertSuggestions = {
  transclude: true,
  template: require('./expert-suggestions.pug')(),
  bindings: {
    experts: '<',
    searchModel: '<'
  },
  controller: expertSuggestionsController,
  controllerAs: 'vm'
}

angular.module('profitelo.components.pro-search-dropdown.expert-suggestions', [
  'profitelo.filters.search-bold-filter',
  userAvatarModule
])
  .component('expertSuggestions', expertSuggestions)
