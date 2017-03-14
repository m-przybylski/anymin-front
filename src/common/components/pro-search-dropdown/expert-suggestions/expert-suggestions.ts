import * as angular from "angular"
import {CommonSettingsService} from "../../../services/common-settings/common-settings.service"


/* @ngInject */
function expertSuggestionsController(CommonSettingsService: CommonSettingsService) {

  this.profileImage = (index: number) => {
    return !!this.experts.results[index].img ? CommonSettingsService.links.imageUrl.replace('%s', this.experts.results[index].img) : false
  }

  return this
}

let expertSuggestions = {
  transclude: true,
  template: require('./expert-suggestions.jade')(),
  bindings: {
    experts: '<',
    searchModel: '<'
  },
  controller: expertSuggestionsController,
  controllerAs: 'vm'
}

angular.module('profitelo.components.pro-search-dropdown.expert-suggestions', [
  'profitelo.services.commonSettings',
  'profitelo.filters.search-bold-filter'
])
  .component('expertSuggestions', expertSuggestions)
