(function() {

  function controller($log, $timeout, $scope, $uibModalInstance, ViewsApi, HelperService) {
    $scope.isLoading = true

    $scope.onModalClose = () =>
      $uibModalInstance.dismiss('cancel')

    const onGetCallDetails = (res) => {
      const expertAvatarFileId = res.expertProfile.expertDetails.avatar
      $scope.expertAvatar = expertAvatarFileId ? HelperService.fileUrlResolver(expertAvatarFileId) : null
      $scope.expert = res.expertProfile
      $scope.isRecommended = res.isRecommended
      $scope.recommendedTags = res.recommendedTags
      $scope.service = res.service
      $scope.callCost = res.serviceUsageDetails.callCost
      $scope.startedAt = res.serviceUsageDetails.startedAt
      $scope.callDuration = res.serviceUsageDetails.callDuration
      $scope.callCostPerMinute = res.service.details.price
      $scope.isRecommended = res.isRecommended
      $timeout(() => $scope.isLoading = false, 400)
    }

    const onGetCallDetailsError = (err) =>
      $log.error(err)


    ViewsApi.getClientDashboardCallDetails({
      sueId: $scope.sueId
    }).$promise.then(onGetCallDetails, onGetCallDetailsError)

    return this
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