import * as angular from 'angular'
import {CallSummaryService} from '../../../../services/call-summary/call-summary.service'
import {CallSummary} from '../../../../models/CallSummary'
import tagsListModule from '../../../tags-list/tags-list'
import textareaModule from '../../../interface/textarea/textarea'

export interface IConsultationSummaryExpertParentControllerScope extends ng.IScope {
  serviceId: string
}

export interface IConsultationSummaryExpertControllerScope extends ng.IScope {
  callSummary: CallSummary | null
  onModalClose: () => void
  isFullscreen: boolean
  isNavbar: boolean
  $parent: IConsultationSummaryExpertParentControllerScope
}

interface IComplaintReasons {
  id: string,
  isDescriptive: boolean,
  name: string
}

export class ConsultationSummaryExpertController {
  public complaintReasons: IComplaintReasons[]

  /* @ngInject */
  constructor(private $scope: IConsultationSummaryExpertControllerScope,
              $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance,
              private callSummaryService: CallSummaryService) {

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

    $scope.isFullscreen = true
    $scope.isNavbar = true

    $scope.callSummary = null

    $scope.onModalClose = () =>
      $uibModalInstance.dismiss('cancel')

    this.callSummaryService.onCallSummary(this.onCallSummary)

    this.loadFromExistingCallSummaries()
  }

  private onCallSummary = (data: any) => {
    const callSummary: CallSummary = data.callSummary
    if (callSummary.service.id === this.$scope.$parent.serviceId) {
      this.$scope.callSummary = callSummary
    }
    console.log(callSummary)

  }

  private loadFromExistingCallSummaries = () => {
    const obj = this.callSummaryService.takeCallSummary(this.$scope.$parent.serviceId)
    if (obj) {
      this.onCallSummary(obj)
    }
  }
}

angular.module('profitelo.components.communicator.modals.consultation-summary-expert', [
  'ui.bootstrap',
  'profitelo.services.call-summary',
  'profitelo.components.interface.preloader',
  tagsListModule,
  'profitelo.components.interface.radio-text',
  textareaModule
])
  .controller('consultationSummaryExpertController', ConsultationSummaryExpertController)
