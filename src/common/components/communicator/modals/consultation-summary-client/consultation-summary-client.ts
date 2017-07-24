import * as angular from 'angular'
import * as _ from 'lodash'
import apiModule from 'profitelo-api-ng/api.module'
import {ServiceApi} from 'profitelo-api-ng/api/api'
import {Tag, ServiceRecommendation, GetService} from 'profitelo-api-ng/model/models'
import {CallSummaryService} from '../../../../services/call-summary/call-summary.service'
import callSummaryModule from '../../../../services/call-summary/call-summary'
import urlModule from '../../../../services/url/url'
import {ClientCallSummary} from '../../../../models/ClientCallSummary'

export interface IConsultationSummaryClientParentControllerScope extends ng.IScope {
  serviceId: string
}

export interface IConsultationSummaryClientControllerScope extends ng.IScope {
  expertAvatarToken?: string
  rating: number
  callSummary?: ClientCallSummary
  isRecommended: boolean
  recommendServiceTags: () => void
  closeModal: () => void
  onModalClose: () => void
  onTagsSelectChange: (tags: Tag[]) => void
  recommendService: () => void
  isFullscreen: boolean
  isNavbar: boolean
  $parent: IConsultationSummaryClientParentControllerScope
}

export class ConsultationSummaryClientController {

  private tags: Tag[] = []

  /* @ngInject */
  constructor(private $log: ng.ILogService, private $scope: IConsultationSummaryClientControllerScope,
               private $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance,
              private callSummaryService: CallSummaryService,
              private ServiceApi: ServiceApi) {

    $scope.isFullscreen = true
    $scope.isNavbar = true
    $scope.isRecommended = false

    callSummaryService.onCallSummary(this.onCallSummary)
    this.loadFromExistingCallSummaries()
    this.initScope()
  }

  private initScope = (): void => {
    this.$scope.callSummary = undefined
    this.$scope.expertAvatarUrl = ''
    this.$scope.chooseExpertsTag = false

    this.$scope.recommendServiceTags = (): void => {
      if (this.$scope.callSummary) {
        this.ServiceApi.putServiceRecommendationsRoute(
          this.$scope.callSummary.serviceUsageEventId,
          {tags: _.map(this.tags, tag => tag.id)}
        ).then(this.onRecommendServiceTags, this.onRecommendServiceTagsError)
        this.$scope.closeModal()
      }
    }

    this.$scope.onTagsSelectChange = (tags: Tag[]): Tag[] =>
      this.tags = tags

    this.$scope.closeModal = (): void => {
      this.$uibModalInstance.dismiss('cancel')
    }

    this.$scope.onModalClose = (): void => {
      this.$scope.closeModal()
    }

    this.$scope.recommendService = (): void => {
      if (this.$scope.callSummary) {
        this.ServiceApi.postServiceRecommendationRoute(this.$scope.callSummary.serviceUsageEventId)
          .then(this.onRecommendService, this.onRecommendServiceError)
      }
    }
  }

  private setCallSummary = (callSummary: ClientCallSummary): void => {
    this.$scope.callSummary = callSummary

    if (callSummary.companyExpertProfile.expertDetails) {
      this.$scope.expertAvatarToken = callSummary.companyExpertProfile.expertDetails.avatar
    }
    this.$scope.rating = callSummary.service.rating
  }

  private onCallSummary = (data: any): void => {
    this.$log.debug(data)
    const callSummary = data.callSummary
    if (callSummary.service.id === this.$scope.$parent.serviceId) {
      this.setCallSummary(callSummary)
    }
  }

  private loadFromExistingCallSummaries = (): void => {
    const obj = this.callSummaryService.takeCallSummary(this.$scope.$parent.serviceId)
    if (obj) {
      this.onCallSummary(obj)
    }
  }

  private onRecommendServiceError = (err?: any): void =>
    this.$log.error(err)

  private onRecommendService = (_res: ServiceRecommendation): boolean =>
    this.$scope.isRecommended = true

  private onRecommendServiceTags = (res: GetService): void =>
    this.$log.debug(res)

  private onRecommendServiceTagsError = (err?: any): void =>
    this.$log.error(err)
}

export const consultationSummaryClientModule =
  angular.module('profitelo.components.communicator.modals.consultation-summary-client', [
  'profitelo.components.interface.multiselect',
  callSummaryModule,
  urlModule,
  apiModule,
  'ui.bootstrap',
  'profitelo.components.interface.preloader',
  'profitelo.directives.interface.scrollable'
])
  .controller('consultationSummaryClientController', ConsultationSummaryClientController)
  .name
