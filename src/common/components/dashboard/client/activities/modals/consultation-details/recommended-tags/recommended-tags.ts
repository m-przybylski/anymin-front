namespace profitelo.components.dashboard.client.activities.modals.consultationDetails.recommendedTags {

  import Tag = profitelo.models.Tag

  /* @ngInject */
  function controller($log: ng.ILogService, lodash: _.LoDashStatic, ServiceApi: any) {

    const updateBindings = () => {
      this.areTagsRecommended = this.selectedTags.length > 0
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
      ServiceApi.postServiceRecommendation({
        serviceUsageEventId: this.serviceUsageEventId
      }).$promise.then(onRecommendService, onRecommendServiceError)
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
      ServiceApi.putServiceRecommendations({
        serviceUsageEventId: this.serviceUsageEventId,
        tags: lodash.map(this.selectedTags, (tag: any) => tag.id)
      }).$promise.then(onRecommendServiceTags, onRecommendServiceTagsError)
    }

    return this
  }

  const component = {
    templateUrl: 'components/dashboard/client/activities/modals/consultation-details/recommended-tags/recommended-tags.tpl.html',
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
    'ngLodash',
    'profitelo.swaggerResources',
    'profitelo.components.interface.multiselect'
  ])
    .component('clientRecommendedTags', component)
}

