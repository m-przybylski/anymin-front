// tslint:disable:readonly-array
// tslint:disable:no-shadowed-variable
import { TranslatorService } from '../../../../services/translator/translator.service';
import { GetTechnicalProblem } from 'profitelo-api-ng/model/models';
import { ServiceUsageEventApi } from 'profitelo-api-ng/api/ServiceUsageEventApi';

export interface IComplaintReason {
  id: GetTechnicalProblem.ProblemTypeEnum;
  isDescriptionRequired: boolean;
  name: string;
  label: string;
}

// tslint:disable:member-ordering
export class ConsultationSummaryExpertService implements ng.IController {

  public complaintReasons: IComplaintReason[] = [
    {
      id: GetTechnicalProblem.ProblemTypeEnum.CONNECTIONINTERRUPTED,
      isDescriptionRequired: false,
      name: 'complaintForm',
      label: this.translatorService.translate(
        'COMMUNICATOR.MODALS.CONSULTATION_SUMMARY_EXPERT.CONNECTION_INTERRUPTED')
    },
    {
      id: GetTechnicalProblem.ProblemTypeEnum.CHATPROBLEM,
      isDescriptionRequired: false,
      name: 'complaintForm',
      label: this.translatorService.translate(
        'COMMUNICATOR.MODALS.CONSULTATION_SUMMARY_EXPERT.CHAT_PROBLEM')
    },
    {
      id: GetTechnicalProblem.ProblemTypeEnum.IMAGEORSOUNDPROBLEM,
      isDescriptionRequired: false,
      name: 'complaintForm',
      label: this.translatorService.translate(
        'COMMUNICATOR.MODALS.CONSULTATION_SUMMARY_EXPERT.IMAGE_OR_SOUND_PROBLEM')
    },
    {
      id: GetTechnicalProblem.ProblemTypeEnum.OTHER,
      isDescriptionRequired: true,
      name: 'complaintForm',
      label: this.translatorService.translate(
        'COMMUNICATOR.MODALS.CONSULTATION_SUMMARY_EXPERT.OTHER')
    }
  ];

  public static $inject = ['translatorService', 'ServiceUsageEventApi'];

    constructor(private translatorService: TranslatorService,
                private ServiceUsageEventApi: ServiceUsageEventApi) {
  }

  public sendTechnicalProblems =
    (sueId: string, problemType: GetTechnicalProblem.ProblemTypeEnum, description?: string): ng.IPromise<{}> =>
    this.ServiceUsageEventApi.postTechnicalProblemRoute(sueId, {problemType, description})
}
