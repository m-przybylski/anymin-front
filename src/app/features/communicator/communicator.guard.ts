import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { CallState, LoggerFactory } from '@anymind-ng/core';
import { ExpertCallService } from '@platform/core/services/call/expert-call.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Logger } from '@platform/core/logger';

@Injectable()
export class CommunicatorGuard extends Logger implements CanActivate {
  constructor(private expertCallService: ExpertCallService, loggerFactory: LoggerFactory) {
    super(loggerFactory.createLoggerService('CommunicatorGuard'));
  }

  public canActivate(): Observable<boolean> {
    return this.expertCallService.newCall$.pipe(
      map(expertCallSession => expertCallSession.currentExpertCall.getState() === CallState.PENDING),
    );
  }
}
