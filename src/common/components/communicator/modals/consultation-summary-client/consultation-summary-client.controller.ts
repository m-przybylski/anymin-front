import {Tag} from 'profitelo-api-ng/model/models'
import {CallSummaryService} from '../../../../services/call-summary/call-summary.service'
import {IAngularEvent} from 'angular'
import {ClientCallSummary} from '../../../../models/ClientCallSummary'
import {IFilterService} from '../../../../services/filter/filter.service'
import {ServiceApi} from 'profitelo-api-ng/api/api'
import {ErrorHandlerService} from '../../../../services/error-handler/error-handler.service'
import {MoneyDto} from 'profitelo-api-ng/model/models'

export interface IConsultationSummaryClientControllerScope extends ng.IScope {
  expertAvatar: string
  expertName: string
  serviceName: string
  consultationCost: MoneyDto
  callDuration: number
  rating: number
  tagsList: Tag[]
  callSummary?: ClientCallSummary
  isRecommendable: boolean
  recommendServiceTags: () => void
  closeModal: () => void
  onModalClose: () => void
  onTagsSelectChange: (tags: Tag[]) => void
  recommendService: () => void
  chooseExpertsTag: boolean
  serviceId: string
}

interface ITechnicalProblem {
  id: string,
  isDescriptive: boolean,
  name: string
}

export class ConsultationSummaryClientController implements ng.IController {
  public tags: Tag[]
  public technicalProblems: ITechnicalProblem[]
  public currentSize: number
  public tabsContainerStyles = {
    height: this.currentSize
  }
  public clientCommentInputValue: string = ''
  public currentTab: string = ConsultationSummaryClientController.tabId.askTab
  private static readonly minValidCommentLength = 3
  private static readonly tabId = {
    askTab: 'ask',
    tagsTab: 'tag',
    commentTab: 'comment'
  }
  private isSendButtonClicked: boolean = false
  private isTechnicalProblemsTab: boolean = true

  /* @ngInject */
  constructor(private $log: ng.ILogService,
              private $scope: IConsultationSummaryClientControllerScope,
              private $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance,
              private callSummaryService: CallSummaryService,
              private $filter: IFilterService,
              private ServiceApi: ServiceApi,
              private errorHandler: ErrorHandlerService) {

    this.callSummaryService.onCallSummary(this.onCallSummary)
    this.loadFromExistingCallSummaries()

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
    this.currentTab = ConsultationSummaryClientController.tabId.tagsTab
    this.isTechnicalProblemsTab = false
  }

  public showCommentTab = (): void => {
    this.currentTab = ConsultationSummaryClientController.tabId.commentTab
    this.isTechnicalProblemsTab = false
    this.addCloseModalListener()
  }

  public setTabsContainerSize = (currentSize: number): void => {
    this.tabsContainerStyles.height = currentSize
  }

  public sendComment = (): void => {
    this.isSendButtonClicked = true
    if (this.isCommentValid() && this.$scope.callSummary) {
      this.ServiceApi.postCommentRoute(this.$scope.callSummary.serviceUsageEventId, {
        content: this.clientCommentInputValue
      }).then(this.closeModal, this.onReject)
    }
  }

  public onTagsSelectChange = (tags: Tag[]): void => {
    this.tags = tags
  }

  public isCommentValid = (): boolean => typeof this.clientCommentInputValue === 'string'
  && this.clientCommentInputValue.length >= ConsultationSummaryClientController.minValidCommentLength

  private onReject = (error: any): void => {
    this.errorHandler.handleServerError(error, 'Can not save service comment')
  }

  private addCloseModalListener = (): void => {
    this.$scope.$on('modal.closing', (event: IAngularEvent) => {
      if (this.isCommentValid() && !this.isSendButtonClicked) {
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

  private setCallSummary = (callSummary: ClientCallSummary): void => {
    this.$scope.callSummary = callSummary
    if (callSummary.companyExpertProfile.expertDetails) {
      this.$scope.expertName = callSummary.companyExpertProfile.expertDetails.name
      this.$scope.serviceName = callSummary.service.name
      this.$scope.consultationCost = callSummary.cost
      this.$scope.tagsList = callSummary.tags.tags
      this.$scope.callDuration = callSummary.callDuration
      this.$scope.expertAvatar = callSummary.companyExpertProfile.expertDetails.avatar
      this.$scope.rating = callSummary.service.rating
      this.$scope.isRecommendable = callSummary.isRecommendable
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
    const callSummary = this.callSummaryService.takeCallSummary(this.$scope.serviceId)
    if (callSummary) {
      this.onCallSummary(callSummary)
    }
  }

}
