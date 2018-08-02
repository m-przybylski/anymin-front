// tslint:disable:strict-type-predicates
import { Injectable, OnDestroy } from '@angular/core';
import { LongPollingService } from '../../../../core/services/long-polling/long-polling.service';
import { PresenceService, AccountPresenceStatus } from '@anymind-ng/api';
import { Observable, ReplaySubject, Subscription } from 'rxjs';
import { map, takeUntil, share } from 'rxjs/operators';

const pollingRate = 5000;

@Injectable()
export class ExpertAvailabilityService implements OnDestroy {
  private _expertPresence: IExpertPresence = {
    experts: {},
    *[Symbol.iterator](): Iterator<ReplaySubject<AccountPresenceStatus.StatusEnum>> {
      // tslint:disable-next-line:no-loop-statement
      for (const expertId in this.experts) {
        if (this.experts.hasOwnProperty(expertId)) {
          yield this.experts[expertId].subject;
          // tslint:disable-next-line:no-delete
          delete this.experts[expertId];
        }
      }
    },
  };
  private readonly _destroyed$ = new ReplaySubject<void>();
  private subscription: Subscription;
  constructor(private pollingService: LongPollingService, private presenceService: PresenceService) {}
  public ngOnDestroy(): void {
    // tslint:disable-next-line:no-loop-statement
    for (const expert$ of this._expertPresence) {
      expert$.complete();
    }
    this._destroyed$.next();
    this._destroyed$.complete();
  }

  public getExpertPresence = (id: string): Observable<AccountPresenceStatus.StatusEnum> => {
    // check if this expert was not added before
    if (typeof this._expertPresence.experts[id] === 'undefined') {
      // not unsubscribe if subscribed to backend
      if (this.subscription) {
        this.subscription.unsubscribe();
      }
      // create new stream to and assing it to experts object
      const stream$ = new ReplaySubject<AccountPresenceStatus.StatusEnum>(1);
      // share this stream so there is no value will be cashed for other requests
      this._expertPresence.experts[id] = { subject: stream$, obs: stream$.pipe(share()) };
      // start pooling data
      this.subscription = this.startPooling(this._expertPresence);
    }

    return this._expertPresence.experts[id].obs;
  };

  private startPooling(expertPresence: IExpertPresence): Subscription {
    return this.pollingService
      .longPollData(this.fetchExpertPresence(Object.keys(expertPresence.experts)), pollingRate)
      .pipe(
        takeUntil(this._destroyed$),
        map(statuses => statuses.map(this.handleExpertPresenceResponse)),
      )
      .subscribe();
  }

  private handleExpertPresenceResponse = (response: AccountPresenceStatus): void => {
    if (typeof this._expertPresence.experts[response.expertId] === 'undefined') {
      return;
    }
    this._expertPresence.experts[response.expertId].subject.next(response.status);
  };

  private fetchExpertPresence = (expertIds: string[]): Observable<AccountPresenceStatus[]> =>
    this.presenceService.userPresenceRoute({ expertIds });
}
interface IExpertPresence extends Iterable<ReplaySubject<AccountPresenceStatus.StatusEnum>> {
  experts: {
    [expertId: string]: {
      subject: ReplaySubject<AccountPresenceStatus.StatusEnum>;
      obs: Observable<AccountPresenceStatus.StatusEnum>;
    };
  };
}
