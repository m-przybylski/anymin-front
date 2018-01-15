import {CallSummary} from '../../../../models/CallSummary'
import {CallSummaryService} from '../../../../services/call-summary/call-summary.service'
import {IExpertCallSummary} from '../../../../models/ExpertCallSummary'
import {MoneyDto, GetTechnicalProblem} from 'profitelo-api-ng/model/models'
import {ServiceApi} from 'profitelo-api-ng/api/api'
import {TopAlertService} from '../../../../services/top-alert/top-alert.service'
import {TranslatorService} from '../../../../services/translator/translator.service';
import {ErrorHandlerService} from '../../../../services/error-handler/error-handler.service'

import {
  ConsultationSummaryExpertService, IComplaintReason
} from './consultation-summary-expert.service'
import {Subscription} from 'rxjs/Subscription'

export interface IConsultationSummaryExpertControllerScope extends ng.IScope {
  callSummary?: CallSummary
  onModalClose: () => void
  isFullscreen: boolean
  isNavbar: boolean
  serviceId: string
}

export class ConsultationSummaryExpertController implements ng.IController {
  public complaintReasons: IComplaintReason[]
  public isFullscreen: boolean = true
  public isNavbar: boolean = true
  public callSummary?: IExpertCallSummary
  public isLoading: boolean

  public clientName: string
  public serviceName: string
  public callDuration: number
  public profit: MoneyDto
  public clientAvatar: string
  public clientReportMessage: string = ''
  public isSendingClientReport: boolean = false
  public isClientReportSent: boolean = false
  public isSubmitted: boolean = false

  public radioModel: GetTechnicalProblem.ProblemTypeEnum
  public technicalProblemsDescription: string

  private callSummarySubscription: Subscription
  private static readonly minValidClientReportMessageLength: number = 3
  private sueId: string

  static $inject = ['$scope', '$uibModalInstance', 'callSummaryService', 'ServiceApi', 'topAlertService',
    'translatorService', 'errorHandler', 'consultationSummaryExpertService'];

  constructor(private $scope: IConsultationSummaryExpertControllerScope,
              private $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance,
              private callSummaryService: CallSummaryService,
              private ServiceApi: ServiceApi,
              private topAlertService: TopAlertService,
              private translatorService: TranslatorService,
              private errorHandler: ErrorHandlerService,
              private consultationSummaryExpertService: ConsultationSummaryExpertService) {
    this.isLoading = true
    this.complaintReasons = this.consultationSummaryExpertService.complaintReasons
    this.callSummarySubscription = this.callSummaryService.onCallSummary(this.onCallSummary)
    this.loadFromExistingCallSummaries()
  }

  public onSendTechnicalProblems = (): void => {
    this.consultationSummaryExpertService.sendTechnicalProblems(this.sueId, this.radioModel,
      this.technicalProblemsDescription).then(() => {
      this.onModalClose()
      this.topAlertService.success({
        message: this.translatorService.translate('COMMUNICATOR.MODALS.CONSULTATION_SUMMARY_EXPERT.SUCCESS_MESSAGE'),
        timeout: 2
      })
    }).catch((error) => {
      this.errorHandler.handleServerError(error)
    })
  }

  public onSelectComplaint = (problemType: GetTechnicalProblem.ProblemTypeEnum): GetTechnicalProblem.ProblemTypeEnum =>
    this.radioModel = problemType

  public onDescriptionChange = (description: string): string =>
    this.technicalProblemsDescription = description

  public onSendClientReportClick = (): void => {
    this.isSubmitted = true
    if (this.isClientReportValid())
      this.sendClientReport(this.sueId, this.clientReportMessage)
  }

  public sendClientReport = (sueId: string, message: string): void => {
    this.isSendingClientReport = true

    this.ServiceApi.postExpertComplaintRoute(sueId, {message}).then(() => {
      this.topAlertService.success({
        message:
          this.translatorService.translate('COMMUNICATOR.MODALS.CONSULTATION_SUMMARY_EXPERT.SUCCESS_MESSAGE'),
        timeout: 2
      })
      this.isClientReportSent = true
    }).catch((error) => {
      this.errorHandler.handleServerError(error, 'Can not send report client')
    }).finally(() => {
      this.isSendingClientReport = false
    })
  }

  public isClientReportValid = (): boolean => this.clientReportMessage.length >=
    ConsultationSummaryExpertController.minValidClientReportMessageLength

  public onModalClose = (): void => this.$uibModalInstance.dismiss('cancel')

  private onCallSummary = (callSummary: IExpertCallSummary): void => {
    if (callSummary.service.id === this.$scope.serviceId) {
      this.callSummary = callSummary
      this.isLoading = false
      if (this.callSummary.clientAccountSettings) {
        this.clientName = this.callSummary.clientAccountSettings.nickname
        this.clientAvatar = this.callSummary.clientAccountSettings.avatar
      }
      this.serviceName = this.callSummary.service.name
      this.profit = this.callSummary.profit
      this.callDuration = this.callSummary.callDuration
      this.sueId = this.callSummary.serviceUsageEventId
      this.clearSummary(callSummary)
    }
  }

  private loadFromExistingCallSummaries = (): void => {
    const callSummary = this.callSummaryService.getCallSummary(this.$scope.serviceId)
    callSummary && this.callSummaryService.isExpertCallSummary(callSummary)
      ? this.onCallSummary(callSummary) : undefined
  }

  private clearSummary = (callSummary: CallSummary): void => {
    this.callSummarySubscription.unsubscribe()
    this.callSummaryService.removeCallSummary(callSummary)
  }
}
