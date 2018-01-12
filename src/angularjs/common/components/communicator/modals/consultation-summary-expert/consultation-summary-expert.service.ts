import {TranslatorService} from '../../../../services/translator/translator.service'
import {ServiceApi} from 'profitelo-api-ng/api/api'
import {GetTechnicalProblem} from 'profitelo-api-ng/model/models'

export interface IComplaintReason {
  id: string,
  isDescriptionRequired: boolean,
  name: string,
  label: string
}

export class ConsultationSummaryExpertService implements ng.IController {

  public complaintReasons: IComplaintReason[] = [
    {
      id: 'EXPERT_COULD_NOT_HEAR_CLIENT',
      isDescriptionRequired: false,
      name: 'complaintForm',
      label: this.translatorService.translate(
        'COMMUNICATOR.MODALS.CONSULTATION_SUMMARY_EXPERT.CLIENT_COULD_NOT_HEAR_EXPERT')
    },
    {
      id: 'CLIENT_COULD_NOT_HEAR_EXPERT',
      isDescriptionRequired: false,
      name: 'complaintForm',
      label: this.translatorService.translate(
        'COMMUNICATOR.MODALS.CONSULTATION_SUMMARY_EXPERT.EXPERT_COULD_NOT_HEAR_CLIENT')
    },
    {
      id: 'NOISE',
      isDescriptionRequired: false,
      name: 'complaintForm',
      label: this.translatorService.translate(
        'COMMUNICATOR.MODALS.CONSULTATION_SUMMARY_EXPERT.NOISE')
    },
    {
      id: 'OTHER',
      isDescriptionRequired: true,
      name: 'complaintForm',
      label: this.translatorService.translate(
        'COMMUNICATOR.MODALS.CONSULTATION_SUMMARY_EXPERT.OTHER')
    }
  ]

  static $inject = ['translatorService', 'ServiceApi'];

    constructor(private translatorService: TranslatorService,
              private ServiceApi: ServiceApi) {
  }

  public sendTechnicalProblems =
    (sueId: string, problemType: GetTechnicalProblem.ProblemTypeEnum, description?: string): ng.IPromise<{}> =>
    this.ServiceApi.postTechnicalProblemRoute(sueId, {problemType, description})
}
