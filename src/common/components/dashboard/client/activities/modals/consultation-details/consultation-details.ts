import Tag = profitelo.models.Tag
import Money = profitelo.models.Money
import ClientDashboardCallDetails = profitelo.models.ClientDashboardCallDetails

(function() {

  interface IConsultationDetailsScope extends ng.IScope {
    isLoading: boolean
    expertAvatar: string
    expertName: string
    recommendedTags: Array<Tag>
    serviceName: string
    serviceId: string
    callCost: Money
    startedAt: Date
    callDuration: number
    callCostPerMinute: Money
    isRecommended: boolean
    isRecommendable: boolean
    sueId: string
    serviceTags: Array<Tag>
    onModalClose: Function
  }

  function controller($log: ng.ILogService, $scope: IConsultationDetailsScope, $uibModalInstance, ServiceApi,
                      urlService, ViewsApi) {
    $scope.isLoading = true
    $scope.recommendedTags = []
    $scope.serviceTags = []

    const onGetCallDetails = (callDetails: ClientDashboardCallDetails) => {

      const onServiceTags = (res) => {
        openClientActivityModal(res[0].tags)
      }

      const onServiceTagsError = (err) => {
        $log.error(err)
      }

      const openClientActivityModal = (serviceTags: Array<Tag> = []) => {
        const expertAvatarFileId = callDetails.expertProfile.expertDetails.avatar
        $scope.expertAvatar = expertAvatarFileId ? urlService.resolveFileUrl(expertAvatarFileId) : null
        $scope.expertName = callDetails.expertProfile.expertDetails.name
        $scope.recommendedTags = callDetails.recommendedTags
        $scope.serviceName = callDetails.service.details.name
        $scope.serviceId = callDetails.service.id
        $scope.callCost = callDetails.serviceUsageDetails.callCost
        $scope.startedAt = callDetails.serviceUsageDetails.startedAt
        $scope.callDuration = callDetails.serviceUsageDetails.callDuration
        $scope.callCostPerMinute = callDetails.service.details.price
        $scope.isRecommended = callDetails.isRecommended
        $scope.isRecommendable = callDetails.isRecommendable
        $scope.serviceTags = serviceTags
        $scope.isLoading = false
      }

      ServiceApi.postServicesTags({
        serviceIds: [callDetails.service.id]
      }).$promise.then(onServiceTags, onServiceTagsError)
    }

    const onGetCallDetailsError = (err) => {
      $scope.isLoading = false
      $log.error(err)
    }

    ViewsApi.getClientDashboardCallDetails({
      sueId: $scope.sueId
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
    'profitelo.services.url'
  ])
    .controller('clientConsultationDetails', controller)

}())