// tslint:disable:no-invalid-this
// tslint:disable:no-any
import * as angular from 'angular';
// tslint:disable-next-line:import-blacklist
import * as _ from 'lodash';
import apiModule from 'profitelo-api-ng/api.module';
import { GetTag } from 'profitelo-api-ng/model/models';
import { PostSueRating } from 'profitelo-api-ng/model/PostSueRating';
import { ServiceUsageEventApi } from 'profitelo-api-ng/api/ServiceUsageEventApi';

function controller($log: ng.ILogService,
                    ServiceUsageEventApi: ServiceUsageEventApi): void {

  const updateBindings = (): void => {
    if (this.selectedTags) {
      this.areTagsRecommended = this.selectedTags.length > 0;
    }
  };

  this.$onInit = (): void => {
    updateBindings();
  };

  this.$onChanges = (): void => {
    updateBindings();
  };

  const onRecommendService = (_res: any): void => {
    this.isRecommended = true;
  };

  const onRecommendServiceError = (err: any): void =>
    $log.error(err);

  this.recommendConsultation = (): void => {
    ServiceUsageEventApi.postSueRatingRoute(this.serviceUsageEventId, {rate : PostSueRating.RateEnum.POSITIVE})
      .then(onRecommendService, onRecommendServiceError);
  };

  this.onSelectChange = (tagsArray: GetTag[]): void => {
    this.selectedTags = tagsArray;
  };

  const onRecommendServiceTags = (_res: any): void => {
    this.areTagsRecommended = true;
  };

  const onRecommendServiceTagsError = (err: any): void =>
    $log.error(err);

  this.saveRecommendedTags = (): void => {
    ServiceUsageEventApi.putSueRatingRoute(
      this.serviceUsageEventId,
      {tags: _.map(this.selectedTags, (tag: any) => tag.id)}
    ).then(onRecommendServiceTags, onRecommendServiceTagsError);
  };

  return this;
}

const component = {
  template: require('./recommended-tags.html'),
  controller: ['$log', 'ServiceApi', controller],
  controllerAs: '$ctrl',
  bindings: {
    selectedTags: '<',
    isRecommended: '<',
    serviceUsageEventId: '<',
    tags: '<'
  }
};

angular.module('profitelo.components.dashboard.client.activities.modals.consultation-details.recommended-tags', [
  'pascalprecht.translate',

  apiModule,
  'profitelo.components.interface.multiselect'
])
  .component('clientRecommendedTags', component);
