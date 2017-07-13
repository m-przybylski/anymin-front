import {ServiceApi} from 'profitelo-api-ng/api/api'
import {Tag, GetService} from 'profitelo-api-ng/model/models'
import {CallSummaryService} from '../../../../services/call-summary/call-summary.service'
import * as _ from 'lodash'
import {IAngularEvent} from 'angular'
import {ClientCallSummary} from '../../../../models/ClientCallSummary'
import {IFilterService} from '../../../../services/filter/filter.service'

export interface IConsultationSummaryClientControllerScope extends ng.IScope {
  expertAvatar: string
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
  chooseExpertsTag: boolean
  serviceId: string
}

interface ItechnicalProblems {
  id: string,
  isDescriptive: boolean,
  name: string
}

export class ConsultationSummaryClientController implements ng.IController {

  public isFullscreen: boolean = true
  public isNavbar: boolean = true
  public isRecommended: boolean = false
  public tags: Tag[]
  public technicalProblems: ItechnicalProblems[]
  public currentSize: number
  public tabsContainerStyles = {
    height: this.currentSize
  }
  public clientReportModel: string = ''
  private currentTabId: string = 'tab-0'
  private isSendButtonClicked: boolean = false

  /* @ngInject */
  constructor(private $log: ng.ILogService,
              private $scope: IConsultationSummaryClientControllerScope,
              private $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance,
              private callSummaryService: CallSummaryService,
              private ServiceApi: ServiceApi,
              private $filter: IFilterService) {

    this.callSummaryService.onCallSummary(this.onCallSummary)
    this.loadFromExistingCallSummaries()
    this.initScope()

    this.technicalProblems = [
      {
        id: 'id2value',
        isDescriptive: false,
        name: 'COMMUNICATOR.MODALS.CONSULTATION_SUMMARY_CLIENT.TECHNICAL_PROBLEMS_TAB.I_DIDNT_HEAR'
      },
      {
        id: 'id3value',
        isDescriptive: false,
        name: 'COMMUNICATOR.MODALS.CONSULTATION_SUMMARY_CLIENT.TECHNICAL_PROBLEMS_TAB.EXPERT_DOESNT_HEAR',
      },
      {
        id: 'id4value',
        isDescriptive: false,
        name: 'COMMUNICATOR.MODALS.CONSULTATION_SUMMARY_CLIENT.TECHNICAL_PROBLEMS_TAB.NOISES'
      },
      {
        id: 'id5value',
        isDescriptive: true,
        name: 'COMMUNICATOR.MODALS.CONSULTATION_SUMMARY_CLIENT.TECHNICAL_PROBLEMS_TAB.OTHER',
      }
    ]

  }

  public showTagsTab = (): void => {
    const minimalCallDurationTime = 30
    if (this.$scope.callSummary &&  this.$scope.callSummary.callDuration >= minimalCallDurationTime) {
      this.currentTabId = 'tab-1'
    } else {
      this.showCommentTab()
    }
  }

  public showCommentTab = (): void => {
    this.currentTabId = 'tab-2'
    this.addCloseModalListener()
  }

  public setTabsContainerSize = (currentSize: number): void => {
    this.tabsContainerStyles.height = currentSize
  }

  public sendComment = (): void => {
    this.isSendButtonClicked = true
    this.closeModal()
  }

  private addCloseModalListener = (): void => {
    this.$scope.$on('modal.closing', (event: IAngularEvent) => {
      if (this.isCommentExist() && !this.isSendButtonClicked) {
       const confirmWindowMessage: string =
         this.$filter('translate')('COMMUNICATOR.MODALS.CONSULTATION_SUMMARY_CLIENT.CONFIRM_WINDOW_MESSAGE')
        if (!confirm(confirmWindowMessage)) {
          event.preventDefault()
        }
      }
    })
  }

  private closeModal = (): void => {
    this.$uibModalInstance.dismiss('cancel')
  }

  private initScope = (): void => {
    this.$scope.callSummary = undefined
    this.$scope.expertAvatar = ''
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

    this.$scope.recommendService = (): void => {
      if (this.$scope.callSummary) {
        this.ServiceApi.postServiceRecommendationRoute(this.$scope.callSummary.serviceUsageEventId)
          .then(this.onRecommendService, this.onRecommendServiceError)
      }
    }

  }

  private setCallSummary = (_callSummary: ClientCallSummary): void => {
    this.$scope.callSummary = _callSummary
    if (_callSummary.companyExpertProfile.expertDetails) {
      this.$scope.expertAvatar = _callSummary.companyExpertProfile.expertDetails.avatar
      this.$scope.rating = _callSummary.service.rating
    }
  }

  private onCallSummary = (data: any): void => {
    this.$log.debug(data)
    const callSummary = data.callSummary
    if (callSummary.service.id === this.$scope.serviceId) {
      this.setCallSummary(callSummary)
    }
  }

  private loadFromExistingCallSummaries = (): void => {
    const obj = this.callSummaryService.takeCallSummary(this.$scope.serviceId)
    if (obj) {
      this.onCallSummary(obj)
    }
  }

  private onRecommendServiceError = (err: Error): void =>
    this.$log.error(err)

  private onRecommendService = (): boolean =>
    this.$scope.isRecommended = true

  private onRecommendServiceTags = (res: GetService): void =>
    this.$log.debug(res)

  private onRecommendServiceTagsError = (err: Error): void =>
    this.$log.error(err)

  private isCommentExist = (): boolean => this.clientReportModel.length > 0

}
