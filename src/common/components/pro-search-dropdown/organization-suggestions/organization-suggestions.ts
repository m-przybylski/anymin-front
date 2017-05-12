import * as angular from 'angular'
import userAvatarModule from '../../interface/user-avatar/user-avatar'

/* @ngInject */
function organizationSuggestionsController() {

  return this
}

const organizationSuggestions = {
  transclude: true,
  template: require('./organization-suggestions.pug')(),
  bindings: {
    organizations: '<',
    searchModel: '<'
  },
  controller: organizationSuggestionsController,
  controllerAs: 'vm'
}

angular.module('profitelo.components.pro-search-dropdown.organization-suggestions', [
  userAvatarModule,
  'profitelo.filters.search-bold-filter'
])
  .component('organizationSuggestions', organizationSuggestions)
