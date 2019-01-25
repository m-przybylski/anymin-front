import { Injectable } from '@angular/core';
import {
  Alerts,
  AlertService,
  ClientCallService,
  CurrentClientCall,
  LoggerFactory,
  SoundsService,
} from '@anymind-ng/core';
import { Router } from '@angular/router';
import { CallService } from '@platform/core/services/call/call.service';
import { CallSessionService } from '@platform/core/services/call/call-session.service';
import { Logger } from '@platform/core/logger';
import { BackendErrors } from '@platform/shared/models/backend-error/backend-error';
import { first, takeUntil } from 'rxjs/operators';
import { CreateCallSummaryComponent } from '@platform/shared/components/modals/call-modals/call-summary/call-summary.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { race } from 'rxjs';
import { Session } from 'machoke-sdk';

@Injectable()
export class CreateCallService extends Logger {
  constructor(
    private router: Router,
    private callService: CallService,
    private callSessionService: CallSessionService,
    private clientCallService: ClientCallService,
    private alertService: AlertService,
    private modalsService: NgbModal,
    private soundsService: SoundsService,
    loggerFactory: LoggerFactory,
  ) {
    super(loggerFactory.createLoggerService('CreateCallService'));
  }

  public call = (serviceId: string, expertId: string): void => {
    const callSession = this.callSessionService.getCallSession();
    if (!this.clientCallService.isCallInProgress() && callSession) {
      this.clientCallService.callServiceId(serviceId, expertId).then(
        (currentClientCall: CurrentClientCall) => {
          this.onCallStart(currentClientCall, callSession);
        },
        error => {
          try {
            // tslint issue it works for parseInt, but not Number.parseInt
            // tslint:disable-next-line:no-magic-numbers
            this.onCallError(Number.parseInt(error.message, 10));
          } catch (err) {
            this.onCallError(-1);
          }
        },
      );
    } else {
      this.loggerService.warn('Call is in progress or websocket connection is interrupted');
      this.alertService.pushDangerAlert(Alerts.SomethingWentWrong);
    }
  };

  // tslint:disable-next-line:cyclomatic-complexity
  private onCallError = (errorCode: number): void => {
    switch (errorCode) {
      case BackendErrors.onGoingCall:
        this.alertService.pushDangerAlert('ALERT.ON_GOING_CALL');
        break;
      case BackendErrors.unavailableExpert:
        this.alertService.pushDangerAlert('ALERT.UNAVAILABLE_EXPERT');
        break;
      case BackendErrors.callYourself:
        this.alertService.pushDangerAlert('ALERT.CANT_CALL_YOURSELF');
        break;
      case BackendErrors.callPending:
        this.alertService.pushDangerAlert('ALERT.USER_HAS_CALL_ALREADY');
        break;
      case BackendErrors.creditCardUncharged:
        this.alertService.pushDangerAlert('ALERT.CREDIT_CARD_UNCHARGED');
        break;
      case BackendErrors.recipientUnavailable:
        this.loggerService.error('recipient unavailable, could caused by missing sysyphus service', errorCode);
        this.alertService.pushDangerAlert(Alerts.SomethingWentWrong);
        break;
      default:
        this.loggerService.error('Unknown error code: ', errorCode);
        this.alertService.pushDangerAlert(Alerts.SomethingWentWrong);
    }
  };

  private onCallStart = (currentClientCall: CurrentClientCall, callSession: Session): void => {
    this.callService.pushCallEvent({
      currentClientCall,
      session: callSession,
    });

    void this.router.navigate(['communicator', currentClientCall.getRatelCallId()]).then(isRedirectSuccessful => {
      if (!isRedirectSuccessful) {
        this.loggerService.warn('Error when redirect to communicator');
        this.alertService.pushDangerAlert(Alerts.SomethingWentWrongWithRedirect);
      }
    });

    this.callService.hangupCall$
      .pipe(
        takeUntil(currentClientCall.callDestroyed$),
        first(),
      )
      .subscribe(() => {
        this.clientCallService.handleMyOwnHangup(currentClientCall);
      });

    race(currentClientCall.callDestroyed$, this.callService.hangupCall$)
      .pipe(first())
      .subscribe(() => this.onAnsweredCallEnd(currentClientCall));
  };

  private onAnsweredCallEnd = (currentClientCall: CurrentClientCall): void => {
    const summaryModal = this.modalsService.open(CreateCallSummaryComponent);
    summaryModal.componentInstance.currentClientCall = currentClientCall;
    this.soundsService
      .playCallEnded()
      .then(
        () => this.loggerService.debug('Call end sound played'),
        err => this.loggerService.warn('Cannot play call end sound', err),
      );
  };
}
