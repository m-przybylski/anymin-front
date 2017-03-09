import * as angular from "angular"
import {CommonSettingsService} from "../../../services/common-settings/common-settings.service"

/* @ngInject */
function organizationSuggestionsController(CommonSettingsService: CommonSettingsService) {

  this.profileImage = (index: number) => {
    return !!this.organizations.results[index].img ? CommonSettingsService.links.imageUrl.replace('%s', this.organizations.results[index].img) : false
  }

  return this
}

let organizationSuggestions = {
  transclude: true,
  template: require('./organization-suggestions.jade')(),
  bindings: {
    organizations: '<',
    searchModel: '<'
  },
  controller: organizationSuggestionsController,
  controllerAs: 'vm'
}

angular.module('profitelo.components.pro-search-dropdown.organization-suggestions', [
  'profitelo.services.commonSettings',
  'profitelo.filters.search-bold-filter'
])
  .component('organizationSuggestions', organizationSuggestions)
