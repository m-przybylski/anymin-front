import {CallSummary} from '../../../../models/CallSummary'
import {CallSummaryService} from '../../../../services/call-summary/call-summary.service'
import {ExpertCallSummary} from '../../../../models/ExpertCallSummary'

export interface IConsultationSummaryExpertParentControllerScope extends ng.IScope {
  serviceId: string
}

export interface IConsultationSummaryExpertControllerScope extends ng.IScope {
  callSummary?: CallSummary
  onModalClose: () => void
  isFullscreen: boolean
  isNavbar: boolean
  $parent: IConsultationSummaryExpertParentControllerScope
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
  public callSummary?: CallSummary
  public isLoading: boolean

  public onModalClose = () =>
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
        name: 'DASHBOARD.CLIENT.ACTIVITIES.MODALS.CONSULTATION_DETAILS.COMPLAINS.REPORT_COMPLAINS.REASON_INCOPENTENT_EXPERT',
      },
      {
        id: 'id3value',
        isDescriptive: false,
        name: 'DASHBOARD.CLIENT.ACTIVITIES.MODALS.CONSULTATION_DETAILS.COMPLAINS.REPORT_COMPLAINS.REASON_RUDE_EXPERT',
      },
      {
        id: 'id4value',
        isDescriptive: false,
        name: 'DASHBOARD.CLIENT.ACTIVITIES.MODALS.CONSULTATION_DETAILS.COMPLAINS.REPORT_COMPLAINS.REASON_TECHNICAL_PROBLEMS',
      },
      {
        id: 'id5value',
        isDescriptive: true,
        name: 'DASHBOARD.CLIENT.ACTIVITIES.MODALS.CONSULTATION_DETAILS.COMPLAINS.REPORT_COMPLAINS.REASON_OTHER',
      }
    ]

    this.callSummaryService.onCallSummary(this.onCallSummary)
    this.loadFromExistingCallSummaries()
  }

  private onCallSummary = (data: CallSummary): void => {
    const callSummary: ExpertCallSummary = data.callSummary
    if (callSummary.service.id === this.$scope.$parent.serviceId) {
      this.callSummary = callSummary
      this.isLoading = false
    }
  }

  private loadFromExistingCallSummaries = (): void => {
    const callSummary = this.callSummaryService.takeCallSummary(this.$scope.$parent.serviceId)
    callSummary ? this.onCallSummary(callSummary) : undefined
  }
}
