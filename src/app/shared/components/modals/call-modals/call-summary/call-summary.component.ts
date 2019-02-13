// tslint:disable:max-file-line-count
import { Component, OnInit } from '@angular/core';
import { CurrentClientCall, CurrentExpertCall, LoggerFactory } from '@anymind-ng/core';
import { ModalAnimationComponentService } from '../../modal/animation/modal-animation.animation.service';
import { ModalContainerTypeEnum } from '@platform/shared/components/modals/modal/modal.component';
import { CallSummaryStateEnum } from '@platform/shared/components/modals/call-modals/call-summary/components/call-summary/call-summary.component';
import { Logger } from '@platform/core/logger';

@Component({
  selector: 'plat-create-call-summary',
  templateUrl: './call-summary.component.html',
})
export class CreateCallSummaryComponent extends Logger implements OnInit {
  public readonly modalContainerClass = ModalContainerTypeEnum.SMALL_NO_PADDING;

  public currentExpertCall: CurrentExpertCall;
  public currentClientCall: CurrentClientCall;
  public currentSummaryState = CallSummaryStateEnum.SUMMARY_DETAILS;
  public modalHeaderTr = 'CALL_SUMMARY.HEADER.TITLE';
  public isBackwardVisible = false;
  public onBackwardClick: () => void;

  constructor(private modalAnimationComponentService: ModalAnimationComponentService, loggerFactory: LoggerFactory) {
    super(loggerFactory.createLoggerService('CreateCallSummaryComponent'));
  }

  public ngOnInit(): void {
    this.modalAnimationComponentService.isPendingRequest().next(false);
    this.onBackwardClick = (): void =>
      this.setModalValues('CALL_SUMMARY.HEADER.TITLE', false, CallSummaryStateEnum.SUMMARY_DETAILS);
  }

  // tslint:disable-next-line:cyclomatic-complexity
  public onCallSummaryStateChange(state: CallSummaryStateEnum): void {
    switch (state) {
      case CallSummaryStateEnum.COMMENT:
        this.setModalValues('CALL_SUMMARY.HEADER.REPORT_CLIENT', true, CallSummaryStateEnum.COMMENT);
        break;
      case CallSummaryStateEnum.POSITIVE_COMMENT:
        this.setModalValues('CALL_SUMMARY.HEADER.POSITIVE_COMMENT', false, CallSummaryStateEnum.POSITIVE_COMMENT);
        break;
      case CallSummaryStateEnum.TECHNICAL_PROBLEM:
        this.setModalValues('CALL_SUMMARY.HEADER.TECHNICAL_PROBLEM', true, CallSummaryStateEnum.TECHNICAL_PROBLEM);
        break;
      case CallSummaryStateEnum.COMPLAIN:
        this.setModalValues('CALL_SUMMARY.HEADER.COMPLAIN', true, CallSummaryStateEnum.COMPLAIN);
        break;
      case CallSummaryStateEnum.TAGS:
        this.setModalValues('CALL_SUMMARY.HEADER.TAGS', true, CallSummaryStateEnum.TAGS);
        break;
      case CallSummaryStateEnum.TECHNICAL_PROBLEM_COMMENT:
        this.setModalValues(
          'CALL_SUMMARY.HEADER.TECHNICAL_PROBLEM',
          true,
          CallSummaryStateEnum.TECHNICAL_PROBLEM_COMMENT,
        );
        break;
      case CallSummaryStateEnum.SUMMARY_DETAILS:
        this.setModalValues('CALL_SUMMARY.HEADER.TITLE', false, CallSummaryStateEnum.SUMMARY_DETAILS);
        break;
      default:
        this.loggerService.error('unhandled call summary state:', state);
    }
  }

  private setModalValues(headerTrKey: string, isBackwardVisible: boolean, state: CallSummaryStateEnum): void {
    this.modalHeaderTr = headerTrKey;
    this.isBackwardVisible = isBackwardVisible;
    this.currentSummaryState = state;
    this.onBackwardClick =
      state !== CallSummaryStateEnum.TECHNICAL_PROBLEM_COMMENT
        ? (): void => this.setModalValues('CALL_SUMMARY.HEADER.TITLE', false, CallSummaryStateEnum.SUMMARY_DETAILS)
        : (): void =>
            this.setModalValues('CALL_SUMMARY.HEADER.TECHNICAL_PROBLEM', true, CallSummaryStateEnum.TECHNICAL_PROBLEM);
  }
}
