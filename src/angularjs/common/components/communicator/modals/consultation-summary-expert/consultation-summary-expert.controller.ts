// tslint:disable:readonly-array
// tslint:disable:strict-boolean-expressions
// tslint:disable:prefer-conditional-expression
// tslint:disable:no-shadowed-variable
// tslint:disable:deprecation
// tslint:disable:curly
import { LoggerService } from '@anymind-ng/core';
import { CallSummaryService } from '../../../../services/call-summary/call-summary.service';
import { IExpertCallSummary } from '../../../../models/ExpertCallSummary';
import { MoneyDto, GetTechnicalProblem, ExpertCallSummary } from 'profitelo-api-ng/model/models';
import { ViewsApi } from 'profitelo-api-ng/api/api';
import { TopAlertService } from '../../../../services/top-alert/top-alert.service';
import { TranslatorService } from '../../../../services/translator/translator.service';
import { ErrorHandlerService } from '../../../../services/error-handler/error-handler.service';

import {
  ConsultationSummaryExpertService, IComplaintReason
} from './consultation-summary-expert.service';
import { Subject, Observable, Subscription } from 'rxjs';
import { ServiceUsageEventApi } from 'profitelo-api-ng/api/ServiceUsageEventApi';

export interface IConsultationSummaryExpertControllerScope extends ng.IScope {
  serviceUsageEventId: string;
}

export class ConsultationSummaryExpertController implements ng.IController {

  public static $inject = ['ViewsApi', 'logger', 'ServiceUsageEventApi', '$scope', '$uibModalInstance',
    'callSummaryService', 'topAlertService', 'translatorService', 'errorHandler', 'consultationSummaryExpertService'];
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
  public isTechnicalProblemsSent = false;
  public isSubmitted = false;

  public radioModel?: GetTechnicalProblem.ProblemTypeEnum;
  public technicalProblemsDescription?: string;

  private callSummarySubscription: Subscription;
  private sueId: string;

  private hideTechnicalProblemsEvent = new Subject<void>();
  private hideReportClientEvent = new Subject<void>();

  constructor(ViewsApi: ViewsApi,
              private logger: LoggerService,
              private ServiceUsageEventApi: ServiceUsageEventApi,
              private $scope: IConsultationSummaryExpertControllerScope,
              private $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance,
              private callSummaryService: CallSummaryService,
              private topAlertService: TopAlertService,
              private translatorService: TranslatorService,
              private errorHandler: ErrorHandlerService,
              private consultationSummaryExpertService: ConsultationSummaryExpertService) {
    this.isLoading = true;
    this.complaintReasons = this.consultationSummaryExpertService.complaintReasons;
    this.callSummarySubscription = this.callSummaryService.onCallSummary(this.onCallSummary);
    this.sueId = this.$scope.serviceUsageEventId;

    ViewsApi.getExpertCallSummaryRoute(this.sueId).then(
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
        this.topAlertService.success({
          message: this.translatorService.translate('COMMUNICATOR.MODALS.CONSULTATION_SUMMARY_EXPERT.SUCCESS_MESSAGE'),
          timeout: 2
        });
        this.isTechnicalProblemsSent = true;
        this.onTechnicalProblemsCancel();
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

    this.ServiceUsageEventApi.postExpertComplaintRoute(sueId, {message}).then(() => {
      this.topAlertService.success({
        message:
          this.translatorService.translate('COMMUNICATOR.MODALS.CONSULTATION_SUMMARY_EXPERT.SUCCESS_MESSAGE'),
        timeout: 2
      });
      this.isClientReportSent = true;
      this.onReportClientCancel();
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

  private onCallSummaryByRequest = (summary: ExpertCallSummary): void => {
    this.isLoading = false;
    if (summary.clientDetails.nickname) {
      this.clientNickname = summary.clientDetails.nickname;
    } else {
      this.clientNickname = summary.clientDetails.clientId;
    }
    this.clientAvatar = summary.clientDetails.avatar;
    this.serviceName = summary.service.name;
    this.profit = summary.profit;
    this.callDuration = summary.callDuration;
  }

  private onCallSummary = (callSummary: IExpertCallSummary): void => {
    if (callSummary.sueId === this.sueId) {
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
