import { LoggerService } from '@anymind-ng/core';
import { CallSummaryService } from '../../../../services/call-summary/call-summary.service';
import { IExpertCallSummary } from '../../../../models/ExpertCallSummary';
import { MoneyDto, GetTechnicalProblem, GetCallDetails } from 'profitelo-api-ng/model/models';
import { ServiceApi, ViewsApi } from 'profitelo-api-ng/api/api';
import { TopAlertService } from '../../../../services/top-alert/top-alert.service';
import { TranslatorService } from '../../../../services/translator/translator.service';
import { ErrorHandlerService } from '../../../../services/error-handler/error-handler.service';

import {
  ConsultationSummaryExpertService, IComplaintReason
} from './consultation-summary-expert.service';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

export interface IConsultationSummaryExpertControllerScope extends ng.IScope {
  serviceUsageEventId: string;
}

export class ConsultationSummaryExpertController implements ng.IController {

  public static $inject = ['ViewsApi', 'logger', '$scope', '$uibModalInstance', 'callSummaryService', 'ServiceApi',
    'topAlertService', 'translatorService', 'errorHandler', 'consultationSummaryExpertService'];
  private static readonly minValidClientReportMessageLength = 3;
  public complaintReasons: IComplaintReason[];
  public isFullscreen = true;
  public isNavbar = true;
  public isLoading: boolean;

  public clientNickname: string;
  public serviceName: string;
  public callDuration: number;
  public profit: MoneyDto;
  public clientAvatar?: string;
  public clientReportMessage = '';
  public isSendingClientReport = false;
  public isClientReportSent = false;
  public isSubmitted = false;

  public radioModel?: GetTechnicalProblem.ProblemTypeEnum;
  public technicalProblemsDescription?: string;

  private callSummarySubscription: Subscription;
  private sueId: string;

  private hideTechnicalProblemsEvent = new Subject<void>();
  private hideReportClientEvent = new Subject<void>();

  constructor(ViewsApi: ViewsApi,
              private logger: LoggerService,
              private $scope: IConsultationSummaryExpertControllerScope,
              private $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance,
              private callSummaryService: CallSummaryService,
              private ServiceApi: ServiceApi,
              private topAlertService: TopAlertService,
              private translatorService: TranslatorService,
              private errorHandler: ErrorHandlerService,
              private consultationSummaryExpertService: ConsultationSummaryExpertService) {
    this.isLoading = true;
    this.complaintReasons = this.consultationSummaryExpertService.complaintReasons;
    this.callSummarySubscription = this.callSummaryService.onCallSummary(this.onCallSummary);
    this.sueId = this.$scope.serviceUsageEventId;

    ViewsApi.getDashboardCallDetailsRoute(this.sueId).then(
      this.onCallSummaryByRequest,
      err => this.logger.warn('ConsultationSummaryExpertController: Could not get summary from backend', err)
    );
  }

  public get hideTechnicalProblems$(): Observable<void> {
    return this.hideTechnicalProblemsEvent;
  }

  public get hideReportClient$(): Observable<void> {
    return this.hideReportClientEvent;
  }

  public onTechnicalProblemsCancel = (): void => {
    this.hideTechnicalProblemsEvent.next();
  }

  public onReportClientCancel = (): void => {
    this.hideReportClientEvent.next();
  }

  public onSendTechnicalProblems = (): void => {
    if (this.radioModel) {
      this.consultationSummaryExpertService.sendTechnicalProblems(this.sueId, this.radioModel,
        this.technicalProblemsDescription).then(() => {
        this.onModalClose();
        this.topAlertService.success({
          message: this.translatorService.translate('COMMUNICATOR.MODALS.CONSULTATION_SUMMARY_EXPERT.SUCCESS_MESSAGE'),
          timeout: 2
        });
      }).catch((error) => {
        this.errorHandler.handleServerError(error);
      });
    }
  }

  public onSelectComplaint = (problemType: GetTechnicalProblem.ProblemTypeEnum): GetTechnicalProblem.ProblemTypeEnum =>
    this.radioModel = problemType

  public onDescriptionChange = (description: string): string =>
    this.technicalProblemsDescription = description

  public onSendClientReportClick = (): void => {
    this.isSubmitted = true;
    if (this.isClientReportValid())
      this.sendClientReport(this.sueId, this.clientReportMessage);
  }

  public sendClientReport = (sueId: string, message: string): void => {
    this.isSendingClientReport = true;

    this.ServiceApi.postExpertComplaintRoute(sueId, {message}).then(() => {
      this.topAlertService.success({
        message:
          this.translatorService.translate('COMMUNICATOR.MODALS.CONSULTATION_SUMMARY_EXPERT.SUCCESS_MESSAGE'),
        timeout: 2
      });
      this.isClientReportSent = true;
    }).catch((error) => {
      this.errorHandler.handleServerError(error, 'Can not send report client');
    }).finally(() => {
      this.isSendingClientReport = false;
    });
  }

  public isClientReportValid = (): boolean => this.clientReportMessage.length >=
    ConsultationSummaryExpertController.minValidClientReportMessageLength

  public onModalClose = (): void => this.$uibModalInstance.dismiss('cancel');

  public isTechnicalProblemsFormValid = (): boolean =>
    this.complaintReasons.filter((reason) => reason.isDescriptionRequired && reason.id === this.radioModel
    ).length > 0 ? this.technicalProblemsDescription !== undefined && this.technicalProblemsDescription.length > 0
      : this.radioModel !== undefined

  private onCallSummaryByRequest = (callDetails: GetCallDetails): void => {
    this.isLoading = false;
    if (callDetails.clientDetails.nickname) {
      this.clientNickname = callDetails.clientDetails.nickname;
    } else {
      this.clientNickname = callDetails.clientDetails.clientId;
    }
    this.clientAvatar = callDetails.clientDetails.avatar;
    this.serviceName = callDetails.service.name;
    const profit = callDetails.serviceUsageDetails.financialOperation;
    if (profit) {
      this.profit = profit;
    } else {
      this.logger.debug('ConsultationSummaryExpertController: There were no financial operation');
    }
    this.callDuration = callDetails.serviceUsageDetails.callDuration;
  }

  private onCallSummary = (callSummary: IExpertCallSummary): void => {
    if (callSummary.serviceUsageEventId === this.sueId) {
      this.isLoading = false;
      if (callSummary.clientAccountDetails) {
        this.clientNickname = callSummary.clientAccountDetails.clientId;
        this.clientAvatar = callSummary.clientAccountDetails.avatar;
      }
      this.serviceName = callSummary.service.name;
      this.profit = callSummary.profit;
      this.callDuration = callSummary.callDuration;
    }
  }
}
