import { Injectable } from '@angular/core';
import { CurrentClientCall, CurrentExpertCall } from '@anymind-ng/core';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { Session } from 'machoke-sdk';

export interface IExpertSessionCall {
  currentExpertCall: CurrentExpertCall;
  session: Session;
}

export interface IClientSessionCall {
  currentClientCall: CurrentClientCall;
  session: Session;
}

@Injectable()
export class CallService {
  private readonly newCallEvent$ = new ReplaySubject<IExpertSessionCall | IClientSessionCall | undefined>(1);
  private readonly hangupCallEvent$ = new Subject<void>();

  constructor() {
    this.newCallEvent$.next(undefined);
  }
  public get newCall$(): Observable<IExpertSessionCall | IClientSessionCall | undefined> {
    return this.newCallEvent$.asObservable();
  }

  public pushCallEvent = (call: IExpertSessionCall | IClientSessionCall): void => {
    this.newCallEvent$.next(call);
  };

  public get hangupCall$(): Observable<void> {
    return this.hangupCallEvent$.asObservable();
  }

  public pushHangupCallEvent = (): void => {
    this.hangupCallEvent$.next();
  };

  public isExpertCall = (
    sessionCallObject: IExpertSessionCall | IClientSessionCall,
  ): sessionCallObject is IExpertSessionCall => 'currentExpertCall' in sessionCallObject;
}
