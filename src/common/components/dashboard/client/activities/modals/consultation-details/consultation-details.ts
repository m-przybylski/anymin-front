namespace profitelo.components.dashboard.client.activities.modals.consultationDetails {

  import IUrlService = profitelo.services.helper.IUrlService
  import IServiceApi = profitelo.api.IServiceApi
  import IViewsApi = profitelo.api.IViewsApi
  import GetCallDetails = profitelo.api.GetCallDetails
  import MoneyDto = profitelo.api.MoneyDto
  import Tag = profitelo.api.Tag

  export interface IConsultationDetailsParentScope extends ng.IScope {
    sueId: string
  }

  export interface IConsultationDetailsScope extends ng.IScope {
    isLoading: boolean
    expertAvatar?: string
    expertName?: string
    recommendedTags: Array<Tag>
    serviceName: string
    serviceId: string
    callCost: MoneyDto
    startedAt: Date
    callDuration: number
    callCostPerMinute?: MoneyDto
    isRecommended: boolean
    isRecommendable: boolean
    serviceTags: Array<Tag>
    onModalClose: Function
    isFullscreen: boolean
    isNavbar: boolean
    $parent: IConsultationDetailsParentScope
  }

  function controller($log: ng.ILogService, $scope: IConsultationDetailsScope,
                      $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance, ServiceApi: IServiceApi,
                      urlService: IUrlService, ViewsApi: IViewsApi) {
    $scope.isLoading = true
    $scope.isFullscreen = true
    $scope.isNavbar = true
    $scope.recommendedTags = []
    $scope.serviceTags = []

    const onGetCallDetails = (callDetails: GetCallDetails) => {

      const onServiceTags = (res: any) => {
        openClientActivityModal(res[0] ? res[0].tags : [])
      }

      const onServiceTagsError = (err: any) => {
        $log.error(err)
      }

      const openClientActivityModal = (serviceTags: Array<Tag> = []) => {
        const expertAvatarFileId = callDetails.expertProfile.expertDetails!.avatar
        $scope.expertAvatar = expertAvatarFileId ? urlService.resolveFileUrl(expertAvatarFileId) : undefined
        $scope.expertName = callDetails.expertProfile.expertDetails!.name
        $scope.recommendedTags = callDetails.recommendedTags
        $scope.serviceName = callDetails.service.details!.name
        $scope.serviceId = callDetails.service.id
        $scope.callCost = callDetails.serviceUsageDetails.callCost
        $scope.startedAt = callDetails.serviceUsageDetails.startedAt
        $scope.callDuration = callDetails.serviceUsageDetails.callDuration
        $scope.callCostPerMinute = callDetails.service.details!.price
        $scope.isRecommended = callDetails.isRecommended
        $scope.isRecommendable = callDetails.isRecommendable
        $scope.serviceTags = serviceTags
        $scope.isLoading = false
      }

      ServiceApi.postServicesTagsRoute({
        serviceIds: [callDetails.service.id]
      }).then(onServiceTags, onServiceTagsError)
    }

    const onGetCallDetailsError = (err: any) => {
      $scope.isLoading = false
      $log.error(err)
    }

    ViewsApi.getClientDashboardCallDetailsRoute($scope.$parent.sueId)
      .then((res) => onGetCallDetails(res), onGetCallDetailsError)


    $scope.onModalClose = () =>
      $uibModalInstance.dismiss('cancel')
  }

  angular.module('profitelo.components.dashboard.client.activities.modals.consultation-details', [
    'ui.bootstrap',
    'profitelo.api.ViewsApi',
    'profitelo.api.ServiceApi',
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
