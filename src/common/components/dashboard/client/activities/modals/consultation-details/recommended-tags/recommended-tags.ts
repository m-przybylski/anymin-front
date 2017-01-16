(function () {
  /* @ngInject */
  function controller($log, ServiceApi) {

    const updateBindings = () => {
      this.areTagsRecommended = this.selectedTags.length > 0
    }

    this.$onInit = () => {
      updateBindings()
    }

    this.$onChanges = () => {
      updateBindings()
    }

    const onRecommendService = (res) => {
      this.isRecommended = true
    }

    const onRecommendServiceError = (err) =>
      $log.error(err)

    this.recommendConsultation = () => {
      ServiceApi.postServiceRecommendation({
        serviceUsageEventId: this.serviceUsageEventId
      }).$promise.then(onRecommendService, onRecommendServiceError)
    }

    this.onSelectChange = (tagsArray) => {
      this.selectedTags = tagsArray
    }

    const onRecommendServiceTags = (res) => {
      this.areTagsRecommended = true
    }

    const onRecommendServiceTagsError = (err) =>
      $log.error(err)

    this.saveRecommendedTags = () => {
      ServiceApi.putServiceRecommendations({
        serviceUsageEventId: this.serviceUsageEventId,
        tags: _.map(this.selectedTags, (tag: any) => tag.id)
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
    'profitelo.swaggerResources',
    'profitelo.components.interface.multiselect'
  ])
  .component('clientRecommendedTags', component)
}())

