(function() {
  /* @ngInject */
  function controller($log, ServiceApi) {

    this.recommendTags = this.isRecommended

    const getServiceTags = () => {

      const onServiceTags = (res) => {
        this.tags = res[0].tags
      }

      const onServiceTagsError = (err) => {
        $log.error(err)
      }

      ServiceApi.postServicesTags({
        serviceIds: [this.service.id]
      }).$promise.then(onServiceTags, onServiceTagsError)
    }


    if (this.isRecommended) {
      getServiceTags()
    }

    const onRecommendService = (res) => {
      this.recommendTags = !this.recommendTags
      getServiceTags()
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
      this.isRecommended = true
    }

    const onRecommendServiceTagsError = (err) =>
      $log.error(err)

    this.saveRecommendedTags = () => {
      ServiceApi.putServiceRecommendations({
        serviceRecommendationId: this.service.id,
        tags: _.map(this.selectedTags, tag => tag.id)
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
      service: '<'
    }
  }

  angular.module('profitelo.components.dashboard.client.activities.modals.consultation-details.recommended-tags', [
    'pascalprecht.translate',
    'profitelo.swaggerResources',
    'profitelo.components.interface.multiselect'
  ])
    .component('clientRecommendedTags', component)
}())

