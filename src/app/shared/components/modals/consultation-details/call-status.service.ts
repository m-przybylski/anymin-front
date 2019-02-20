import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class CallStatusService {
  private _callStatus$ = new Subject<boolean>();

  public get callStatus$(): Observable<boolean> {
    return this._callStatus$.asObservable();
  }

  public pushCallStatusEvent(isCallStarted: boolean): void {
    this._callStatus$.next(isCallStarted);
  }
}
