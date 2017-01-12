(function() {

  function controller($log, $scope, $uibModalInstance, ServiceApi, HelperService, ViewsApi) {

    $scope.loading = true

    $scope.ActivityDetailsModalDataObject = {
      expertAvatar: null,
      expert: {},
      recommendedTags: [],
      service: {},
      callCost: {},
      startedAt: 0,
      callDuration: 0,
      callCostPerMinute: {},
      isRecommended: false,
      isRecommendable: true,
      sueId: '',
      userTags: []
    }

    const onGetCallDetails = (callDetails: ClientDashboardCallDetails) => {

      const onServiceTags = (res) => {
        openClientActivityModal(res[0].tags)
      }

      const onServiceTagsError = (err) => {
        $log.error(err)
      }

      const openClientActivityModal = (userTags = []) => {
        const expertAvatarFileId = callDetails.expertProfile.expertDetails.avatar

        $scope.ActivityDetailsModalDataObject = {
          expertAvatar: expertAvatarFileId ? HelperService.fileUrlResolver(expertAvatarFileId) : null,
          expert: callDetails.expertProfile,
          recommendedTags: callDetails.recommendedTags,
          service: callDetails.service,
          callCost: callDetails.serviceUsageDetails.callCost,
          startedAt: callDetails.serviceUsageDetails.startedAt,
          callDuration: callDetails.serviceUsageDetails.callDuration,
          callCostPerMinute: callDetails.service.details.price,
          isRecommended: callDetails.isRecommended,
          isRecommendable: callDetails.isRecommendable,
          sueId: this.activity.sueProfileServiceTuple.serviceUsageEvent.id,
          userTags: userTags
        }
        $scope.isLoading = false
      }

      if (callDetails.isRecommended) {
        ServiceApi.postServicesTags({
          serviceIds: [callDetails.service.id]
        }).$promise.then(onServiceTags, onServiceTagsError)
      } else {
        openClientActivityModal()
      }
    }

    const onGetCallDetailsError = (err) => {
      $scope.isLoading = false
      $log.error(err)
    }

    ViewsApi.getClientDashboardCallDetails({
      sueId: this.activity.sueProfileServiceTuple.serviceUsageEvent.id
    }).$promise.then(onGetCallDetails, onGetCallDetailsError)

    $scope.onModalClose = () =>
      $uibModalInstance.dismiss('cancel')
  }

  angular.module('profitelo.components.dashboard.client.activities.modals.consultation-details', [
    'ui.bootstrap',
    'profitelo.swaggerResources',
    'profitelo.components.interface.preloader',
    'profitelo.filters.milliseconds-to-datetime',
    'profitelo.components.interface.collapse-btn',
    'profitelo.components.dashboard.client.activities.modals.consultation-details.complain',
    'profitelo.components.dashboard.client.activities.modals.consultation-details.consultation-details-chat',
    'profitelo.components.dashboard.client.activities.modals.consultation-details.recommended-tags',
    'profitelo.services.helper'
  ])
    .controller('clientConsultationDetails', controller)

}())