import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { CallState, LoggerFactory } from '@anymind-ng/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Logger } from '@platform/core/logger';
import { CallService, IClientSessionCall, IExpertSessionCall } from '@platform/core/services/call/call.service';

@Injectable()
export class CommunicatorGuard extends Logger implements CanActivate {
  constructor(private callService: CallService, private router: Router, loggerFactory: LoggerFactory) {
    super(loggerFactory.createLoggerService('CommunicatorGuard'));
  }

  public canActivate(): Observable<boolean> {
    return this.callService.newCall$.pipe(
      map((callSession?: IExpertSessionCall | IClientSessionCall) => {
        let result = false;
        if (callSession !== undefined) {
          result = this.callService.isExpertCall(callSession)
            ? this.checkIsExpertCallPending(callSession)
            : this.checkIsClientCallPending(callSession);
        }
        if (!result) {
          this.router.navigate(['/']);
        }

        return result;
      }),
    );
  }

  private checkIsExpertCallPending(expertCallSession: IExpertSessionCall): boolean {
    return expertCallSession.currentExpertCall.getState() === CallState.PENDING;
  }

  private checkIsClientCallPending(clientCallSession: IClientSessionCall): boolean {
    return clientCallSession.currentClientCall.getState() === CallState.NEW;
  }
}
