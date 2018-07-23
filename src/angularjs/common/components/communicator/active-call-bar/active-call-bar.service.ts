// tslint:disable:readonly-array
// tslint:disable:strict-boolean-expressions
// tslint:disable:no-duplicate-imports
import { CommunicatorService } from '@anymind-ng/core';
import { EventsService } from '../../../services/events/events.service';
import { ExpertCallService } from '../call-services/expert-call.service';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs';
import { PullableCall } from '../models/pullable-call';

export class ActiveCallBarService {

  public static $inject = ['expertCallService', 'eventsService', 'communicatorService'];

  private readonly showCallBarEvent = new Subject<void>();
  private readonly hideCallBarEvent = new Subject<void>();
  private pullableCall?: PullableCall;

  constructor(expertCallService: ExpertCallService,
              eventsService: EventsService,
              communicatorService: CommunicatorService) {

    communicatorService.connectionLostEvent$.subscribe(this.handleConnectionLost);
    expertCallService.pullableCall$.subscribe(this.handlePullable);
    eventsService.on('logout', () => this.hideCallBarEvent.next());
  }

  public get hideCallBar$(): Observable<void> {
    return this.hideCallBarEvent;
  }

  public get showCallBar$(): Observable<void> {
    return this.showCallBarEvent;
  }

  private handlePullable = (pullableCall: PullableCall): void => {
    this.pullableCall = pullableCall;
    pullableCall.onPullExpired().subscribe(() => this.hideCallBarEvent.next());
    this.showCallBarEvent.next();
  }

  private handleConnectionLost = (): void => {
    this.pullableCall = undefined;
    this.hideCallBarEvent.next();
  }
}
