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
      id: GetTechnicalProblem.ProblemTypeEnum.EXPERTCOULDNOTHEARCLIENT,
      isDescriptionRequired: false,
      name: 'complaintForm',
      label: this.translatorService.translate(
        'COMMUNICATOR.MODALS.CONSULTATION_SUMMARY_EXPERT.CLIENT_COULD_NOT_HEAR_EXPERT')
    },
    {
      id: GetTechnicalProblem.ProblemTypeEnum.CLIENTCOULDNOTHEAREXPERT,
      isDescriptionRequired: false,
      name: 'complaintForm',
      label: this.translatorService.translate(
        'COMMUNICATOR.MODALS.CONSULTATION_SUMMARY_EXPERT.EXPERT_COULD_NOT_HEAR_CLIENT')
    },
    {
      id: GetTechnicalProblem.ProblemTypeEnum.NOISE,
      isDescriptionRequired: false,
      name: 'complaintForm',
      label: this.translatorService.translate(
        'COMMUNICATOR.MODALS.CONSULTATION_SUMMARY_EXPERT.NOISE')
    },
    {
      id: GetTechnicalProblem.ProblemTypeEnum.OTHER,
      isDescriptionRequired: true,
      name: 'complaintForm',
      label: this.translatorService.translate(
        'COMMUNICATOR.MODALS.CONSULTATION_SUMMARY_EXPERT.OTHER')
    }
  ];

  public static $inject = ['translatorService', 'serviceUsageEventApi'];

    constructor(private translatorService: TranslatorService,
                private serviceUsageEventApi: ServiceUsageEventApi) {
  }

  public sendTechnicalProblems =
    (sueId: string, problemType: GetTechnicalProblem.ProblemTypeEnum, description?: string): ng.IPromise<{}> =>
    this.serviceUsageEventApi.postTechnicalProblemRoute(sueId, {problemType, description})
}
