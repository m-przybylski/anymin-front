(function() {
  /* @ngInject */
  function controller($log, ServiceApi) {

    this.isRecommendTags = this.isRecommended
    this.areRecommednedTagsSelected = this.selectedTags.length > 0

    const getServiceTags = () => {

      const onServiceTags = (res) => {
        this.userTags = res[0].tags
      }

      const onServiceTagsError = (err) => {
        $log.error(err)
      }

      ServiceApi.postServicesTags({
        serviceIds: [this.service.id]
      }).$promise.then(onServiceTags, onServiceTagsError)
    }

    const onRecommendService = (res) => {
      this.recommendTags = !this.isRecommendTags
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
      this.areRecommednedTagsSelected = true
      this.onTagSend()
    }

    const onRecommendServiceTagsError = (err) =>
      $log.error(err)

    this.saveRecommendedTags = () => {
      ServiceApi.putServiceRecommendations({
        serviceUsageEventId: this.serviceUsageEventId,
        tags: _.map(this.selectedTags, (tag : any) => tag.id)
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
      service: '<',
      userTags: '<'
    }
  }

  angular.module('profitelo.components.dashboard.client.activities.modals.consultation-details.recommended-tags', [
    'pascalprecht.translate',
    'profitelo.swaggerResources',
    'profitelo.components.interface.multiselect'
  ])
    .component('clientRecommendedTags', component)
}())

