import { Injectable } from '@angular/core';
import { CurrentExpertCall } from '@anymind-ng/core';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { Session } from 'machoke-sdk';

export interface IExpertSessionCall {
  currentExpertCall: CurrentExpertCall;
  session: Session;
}

@Injectable()
export class ExpertCallService {
  private readonly newCallEvent$ = new ReplaySubject<IExpertSessionCall>(1);
  private readonly hangupCallEvent$ = new Subject<void>();

  public get newCall$(): Observable<IExpertSessionCall> {
    return this.newCallEvent$.asObservable();
  }

  public pushCallEvent = (call: IExpertSessionCall): void => {
    this.newCallEvent$.next(call);
  };

  public get hangupCall$(): Observable<void> {
    return this.hangupCallEvent$.asObservable();
  }

  public pushHangupCallEvent = (): void => {
    this.hangupCallEvent$.next();
  };
}
