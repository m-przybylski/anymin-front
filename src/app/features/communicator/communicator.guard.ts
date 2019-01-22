import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { CallState, LoggerFactory } from '@anymind-ng/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Logger } from '@platform/core/logger';
import { CallService, IClientSessionCall, IExpertSessionCall } from '@platform/core/services/call/call.service';

@Injectable()
export class CommunicatorGuard extends Logger implements CanActivate {
  constructor(private callService: CallService, loggerFactory: LoggerFactory) {
    super(loggerFactory.createLoggerService('CommunicatorGuard'));
  }

  public canActivate(): Observable<boolean> {
    return this.callService.newCall$.pipe(
      map(callSession =>
        this.callService.isExpertCall(callSession)
          ? CommunicatorGuard.checkIsExpertCallPending(callSession)
          : CommunicatorGuard.checkIsClientCallPending(callSession),
      ),
    );
  }

  private static checkIsExpertCallPending(expertCallSession: IExpertSessionCall): boolean {
    return expertCallSession.currentExpertCall.getState() === CallState.PENDING;
  }

  private static checkIsClientCallPending(clientCallSession: IClientSessionCall): boolean {
    return clientCallSession.currentClientCall.getState() === CallState.NEW;
  }
}
