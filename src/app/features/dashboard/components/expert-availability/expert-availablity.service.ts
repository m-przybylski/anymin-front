// tslint:disable:strict-type-predicates
import { Injectable, OnDestroy } from '@angular/core';
import { LongPollingService } from '@platform/core/services/long-polling/long-polling.service';
import { PresenceService, AccountPresenceStatus } from '@anymind-ng/api';
import { Observable, ReplaySubject, Subscription, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

const pollingRate = 5000;

@Injectable()
export class ExpertAvailabilityService implements OnDestroy {
  private expertPresenceMap = new Map<string, IExpertPresence>();

  private readonly destroyed$ = new Subject<void>();
  private pollingSubscription: Subscription | undefined;
  constructor(private pollingService: LongPollingService, private presenceService: PresenceService) {}
  public ngOnDestroy(): void {
    this.expertPresenceMap.forEach(expertPresence => expertPresence.subject.complete());
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  public getExpertPresence = (id: string): Observable<AccountPresenceStatus.StatusEnum> => {
    // check if this expert was not added before
    if (!this.expertPresenceMap.has(id)) {
      // unsubscribe if subscribed to backend
      if (this.pollingSubscription !== undefined) {
        this.pollingSubscription.unsubscribe();
      }
      // create new stream to and assign it to experts object
      const stream$ = new ReplaySubject<AccountPresenceStatus.StatusEnum>(1);
      // share this stream so there is no value will be cashed for other requests
      this.expertPresenceMap.set(id, { subject: stream$, obs: stream$.asObservable() });
      // start pooling data
      this.pollingSubscription = this.startPooling(this.expertPresenceMap);
    }

    return (this.expertPresenceMap.get(id) as IExpertPresence).obs;
  };

  private startPooling = (expertPresence: Map<string, IExpertPresence>): Subscription | undefined => {
    if (expertPresence.size === 0) {
      return undefined;
    }

    return this.pollingService
      .longPollData(this.fetchExpertPresence(Array.from(expertPresence.keys())), pollingRate)
      .pipe(
        takeUntil(this.destroyed$),
        map(statuses => statuses.map(this.handleExpertPresenceResponse)),
      )
      .subscribe();
  };

  private handleExpertPresenceResponse = (response: AccountPresenceStatus): void => {
    // just in case something went wrong
    if (!this.expertPresenceMap.has(response.expertId)) {
      return;
    }
    if ((this.expertPresenceMap.get(response.expertId) as IExpertPresence).subject.observers.length === 0) {
      return this.stopPolling(response.expertId);
    }
    (this.expertPresenceMap.get(response.expertId) as IExpertPresence).subject.next(response.status);
  };

  private fetchExpertPresence = (expertIds: ReadonlyArray<string>): Observable<ReadonlyArray<AccountPresenceStatus>> =>
    this.presenceService.userPresenceRoute({ expertIds: [...expertIds] });

  private stopPolling = (expertId: string): void => {
    if (this.expertPresenceMap.has(expertId)) {
      // unsubscribe if subscribed to backend
      if (this.pollingSubscription) {
        this.pollingSubscription.unsubscribe();
      }
      // complete stream
      (this.expertPresenceMap.get(expertId) as IExpertPresence).subject.complete();
      // remove from the map
      this.expertPresenceMap.delete(expertId);
      // start pooling data
      this.pollingSubscription = this.startPooling(this.expertPresenceMap);
    }
  };
}
interface IExpertPresence {
  subject: ReplaySubject<AccountPresenceStatus.StatusEnum>;
  obs: Observable<AccountPresenceStatus.StatusEnum>;
}
