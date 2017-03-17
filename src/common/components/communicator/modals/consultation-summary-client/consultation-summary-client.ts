import * as angular from 'angular'
import * as _ from 'lodash'
import apiModule from 'profitelo-api-ng/api.module'
import {ServiceApi} from 'profitelo-api-ng/api/api'
import {Tag, ServiceRecommendation, GetService} from 'profitelo-api-ng/model/models'
import {CallSummaryService} from '../../../../services/call-summary/call-summary.service'
import {UrlService} from '../../../../services/url/url.service'
import {CallSummary} from '../../../../models/CallSummary'

export interface IConsultationSummaryClientParentControllerScope extends ng.IScope {
  serviceId: string
}

export interface IConsultationSummaryClientControllerScope extends ng.IScope {
  expertAvatarUrl: string
  rating: number
  callSummary: CallSummary | null
  chooseExpertsTag: boolean
  recommendServiceTags: () => void
  closeModal: () => void
  onModalClose: () => void
  onTagsSelectChange: (tags: Array<Tag>) => void
  recommendService: () => void
  isFullscreen: boolean
  isNavbar: boolean
  $parent: IConsultationSummaryClientParentControllerScope
}

export class ConsultationSummaryClientController {

  private tags: Array<Tag> = []

  /* @ngInject */
  constructor(private $log: ng.ILogService, private $scope: IConsultationSummaryClientControllerScope,
               private $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance,
              private callSummaryService: CallSummaryService, private urlService: UrlService,
              private ServiceApi: ServiceApi) {

    $scope.isFullscreen = true
    $scope.isNavbar = true

    callSummaryService.onCallSummary(this.onCallSummary)
    this.loadFromExistingCallSummaries()
    this.initScope()
  }

  private initScope = () => {
    this.$scope.callSummary = null
    this.$scope.expertAvatarUrl = ''
    this.$scope.chooseExpertsTag = false

    this.$scope.recommendServiceTags = () => {
      if (this.$scope.callSummary) {
        this.ServiceApi.putServiceRecommendationsRoute(
          this.$scope.callSummary.serviceUsageEventId,
          {tags: _.map(this.tags, tag => tag.id)}
        ).then(this.onRecommendServiceTags, this.onRecommendServiceTagsError)
        this.$scope.closeModal()
      }
    }

    this.$scope.onTagsSelectChange = (tags: Array<Tag>) =>
      this.tags = tags

    this.$scope.closeModal = () => {
      this.$uibModalInstance.dismiss('cancel')
    }

    this.$scope.onModalClose = () => {
      this.$scope.closeModal()
    }

    this.$scope.recommendService = () => {
      if (this.$scope.callSummary) {
        this.ServiceApi.postServiceRecommendationRoute(this.$scope.callSummary.serviceUsageEventId)
          .then(this.onRecommendService, this.onRecommendServiceError)
      }
    }
  }

  private setCallSummary = (_callSummary: CallSummary) => {
    this.$scope.callSummary = _callSummary
    const avatar = _callSummary.companyExpertProfile.expertDetails.avatar
    this.$scope.expertAvatarUrl = (avatar) ? this.urlService.resolveFileUrl(avatar) : ''
    this.$scope.rating = _callSummary.service.rating
  }

  private onCallSummary = (data: any) => {
    this.$log.debug(data)
    const callSummary = data.callSummary
    if (callSummary.service.id === this.$scope.$parent.serviceId) {
      this.setCallSummary(callSummary)
    }
  }

  private loadFromExistingCallSummaries = () => {
    const obj = this.callSummaryService.takeCallSummary(this.$scope.$parent.serviceId)
    if (obj) {
      this.onCallSummary(obj)
    }
  }

  private onRecommendServiceError = (err: any) =>
    this.$log.error(err)

  private onRecommendService = (_res: ServiceRecommendation) =>
    this.$scope.chooseExpertsTag = true

  private onRecommendServiceTags = (res: GetService) =>
    this.$log.debug(res)

  private onRecommendServiceTagsError = (err: any) =>
    this.$log.error(err)
}

angular.module('profitelo.components.communicator.modals.consultation-summary-client', [
  'profitelo.components.interface.multiselect',
  'profitelo.services.call-summary',
  'profitelo.services.url',
  apiModule,
  'ui.bootstrap',
  'profitelo.components.interface.preloader',

  'profitelo.directives.interface.scrollable'
])
  .controller('consultationSummaryClientController', ConsultationSummaryClientController)
