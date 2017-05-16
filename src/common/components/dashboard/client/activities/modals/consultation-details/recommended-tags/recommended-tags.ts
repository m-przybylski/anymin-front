import * as angular from 'angular'
import * as _ from 'lodash'
import apiModule from 'profitelo-api-ng/api.module'
import {ServiceApi} from 'profitelo-api-ng/api/api'
import {Tag} from 'profitelo-api-ng/model/models'

/* @ngInject */
function controller($log: ng.ILogService, ServiceApi: ServiceApi) {

  const updateBindings = () => {
    if (this.selectedTags) {
      this.areTagsRecommended = this.selectedTags.length > 0
    }
  }

  this.$onInit = () => {
    updateBindings()
  }

  this.$onChanges = () => {
    updateBindings()
  }

  const onRecommendService = (_res: any) => {
    this.isRecommended = true
  }

  const onRecommendServiceError = (err: any) =>
    $log.error(err)

  this.recommendConsultation = () => {
    ServiceApi.postServiceRecommendationRoute(this.serviceUsageEventId)
      .then(onRecommendService, onRecommendServiceError)
  }

  this.onSelectChange = (tagsArray: Array<Tag>) => {
    this.selectedTags = tagsArray
  }

  const onRecommendServiceTags = (_res: any) => {
    this.areTagsRecommended = true
  }

  const onRecommendServiceTagsError = (err: any) =>
    $log.error(err)

  this.saveRecommendedTags = () => {
    ServiceApi.putServiceRecommendationsRoute(
      this.serviceUsageEventId,
      {tags: _.map(this.selectedTags, (tag: any) => tag.id)}
    ).then(onRecommendServiceTags, onRecommendServiceTagsError)
  }

  return this
}

const component = {
  template: require('./recommended-tags.pug')(),
  controller: controller,
  controllerAs: '$ctrl',
  bindings: {
    selectedTags: '<',
    isRecommended: '<',
    serviceUsageEventId: '<',
    tags: '<'
  }
}

angular.module('profitelo.components.dashboard.client.activities.modals.consultation-details.recommended-tags', [
  'pascalprecht.translate',

  apiModule,
  'profitelo.components.interface.multiselect'
])
  .component('clientRecommendedTags', component)
