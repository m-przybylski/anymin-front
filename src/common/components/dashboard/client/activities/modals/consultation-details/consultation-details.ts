namespace profitelo.components.dashboard.client.activities.modals.consultationDetails {

  import Tag = profitelo.models.Tag
  import Money = profitelo.models.Money
  import ClientDashboardCallDetails = profitelo.models.ClientDashboardCallDetails
  import IUrlService = profitelo.services.helper.IUrlService

  interface IConsultationDetailsScope extends ng.IScope {
    isLoading: boolean
    expertAvatar?: string
    expertName?: string
    recommendedTags: Array<Tag>
    serviceName: string
    serviceId: string
    callCost: Money
    startedAt: Date
    callDuration: number
    callCostPerMinute?: Money
    isRecommended: boolean
    isRecommendable: boolean
    sueId: string
    serviceTags: Array<Tag>
    onModalClose: Function
    isFullscreen: boolean
    isNavbar: boolean
  }

  function controller($log: ng.ILogService, $scope: IConsultationDetailsScope,
                      $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance, ServiceApi: any,
                      urlService: IUrlService, ViewsApi: any) {
    $scope.isLoading = true
    $scope.isFullscreen = true
    $scope.isNavbar = true
    $scope.recommendedTags = []
    $scope.serviceTags = []

    const onGetCallDetails = (callDetails: ClientDashboardCallDetails) => {

      const onServiceTags = (res: any) => {
        openClientActivityModal(res[0] ? res[0].tags : [])
      }

      const onServiceTagsError = (err: any) => {
        $log.error(err)
      }

      const openClientActivityModal = (serviceTags: Array<Tag> = []) => {
        const expertAvatarFileId = callDetails.expertProfile.expertDetails.avatar
        $scope.expertAvatar = expertAvatarFileId ? urlService.resolveFileUrl(expertAvatarFileId) : undefined
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

    const onGetCallDetailsError = (err: any) => {
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
    'profitelo.directives.interface.scrollable',
    'profitelo.filters.milliseconds-to-datetime',
    'profitelo.components.interface.collapse-btn',
    'profitelo.components.dashboard.client.activities.modals.consultation-details.complain',
    'profitelo.components.dashboard.client.activities.modals.consultation-details.consultation-details-chat',
    'profitelo.components.dashboard.client.activities.modals.consultation-details.recommended-tags',
    'profitelo.services.url'
  ])
    .controller('clientConsultationDetails', controller)
}
