import * as angular from "angular"
import {Tag} from "../../../../../../api/model/Tag"
import {MoneyDto} from "../../../../../../api/model/MoneyDto"
import {ServiceApi} from "../../../../../../api/api/ServiceApi"
import {UrlService} from "../../../../../../services/url/url.service"
import {ViewsApi} from "../../../../../../api/api/ViewsApi"
import {GetCallDetails} from "../../../../../../api/model/GetCallDetails"
import apiModule from "../../../../../../api/api.module"
import urlModule from "../../../../../../services/url/url"
import filtersModule from "../../../../../../filters/filters"
import "../../../../../../components/interface/collapse-btn/collapse-btn"
import "./complain/complain"
import "./consultation-details-chat/consultation-details-chat"
import "./recommended-tags/recommended-tags"


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
                    $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance, ServiceApi: ServiceApi,
                    urlService: UrlService, ViewsApi: ViewsApi) {
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
  apiModule,
  'profitelo.components.interface.preloader',
  'profitelo.directives.interface.scrollable',
  filtersModule,
  'profitelo.components.interface.collapse-btn',
  'profitelo.components.dashboard.client.activities.modals.consultation-details.complain',
  'profitelo.components.dashboard.client.activities.modals.consultation-details.consultation-details-chat',
  'profitelo.components.dashboard.client.activities.modals.consultation-details.recommended-tags',
  urlModule
])
  .controller('clientConsultationDetails', controller)
