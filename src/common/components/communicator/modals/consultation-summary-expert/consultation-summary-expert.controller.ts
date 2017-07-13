import {CallSummary} from '../../../../models/CallSummary'
import {CallSummaryService} from '../../../../services/call-summary/call-summary.service'
import {ExpertCallSummary} from '../../../../models/ExpertCallSummary'
import {MoneyDto} from 'profitelo-api-ng/model/models'

export interface IConsultationSummaryExpertControllerScope extends ng.IScope {
  callSummary?: CallSummary
  onModalClose: () => void
  isFullscreen: boolean
  isNavbar: boolean
  serviceId: string
}

interface IComplaintReason {
  id: string,
  isDescriptive: boolean,
  name: string
}

export class ConsultationSummaryExpertController implements ng.IController {
  public complaintReasons: IComplaintReason[]
  public isFullscreen: boolean = true
  public isNavbar: boolean = true
  public callSummary?: ExpertCallSummary
  public isLoading: boolean

  public clientName: string
  public serviceName: string
  public callDuration: number
  public profit: MoneyDto
  public clientAvatar: string

  public onModalClose = (): void =>
    this.$uibModalInstance.dismiss('cancel')

  /* @ngInject */
  constructor(private $scope: IConsultationSummaryExpertControllerScope,
              private $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance,
              private callSummaryService: CallSummaryService) {

    this.isLoading = true

    this.complaintReasons = [
      {
        id: 'id2value',
        isDescriptive: false,
        name: 'DASHBOARD.EXPERT.ACTIVITIES.MODALS.CONSULTATION_DETAILS.COMPLAINS.REPORT_COMPLAINS.' +
        'REASON_INCOPENTENT_CLIENT',
      },
      {
        id: 'id3value',
        isDescriptive: false,
        name: 'DASHBOARD.EXPERT.ACTIVITIES.MODALS.CONSULTATION_DETAILS.COMPLAINS.REPORT_COMPLAINS.' +
        'REASON_RUDE_CLIENT',
      },
      {
        id: 'id4value',
        isDescriptive: false,
        name: 'DASHBOARD.EXPERT.ACTIVITIES.MODALS.CONSULTATION_DETAILS.COMPLAINS.REPORT_COMPLAINS.' +
        'REASON_TECHNICAL_PROBLEMS',
      },
      {
        id: 'id5value',
        isDescriptive: true,
        name: 'DASHBOARD.EXPERT.ACTIVITIES.MODALS.CONSULTATION_DETAILS.COMPLAINS.REPORT_COMPLAINS.REASON_OTHER',
      }
    ]

    this.callSummaryService.onCallSummary(this.onCallSummary)
    this.loadFromExistingCallSummaries()
  }

  private onCallSummary = (data: CallSummary): void => {
    const callSummary: ExpertCallSummary = data.callSummary
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
    }
  }

  private loadFromExistingCallSummaries = (): void => {
    const callSummary = this.callSummaryService.takeCallSummary(this.$scope.serviceId)
    callSummary ? this.onCallSummary(callSummary) : undefined
  }
}
