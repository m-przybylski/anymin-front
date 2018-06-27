import { CommunicatorService, LoggerService } from '@anymind-ng/core';
import { EventsService } from '../../../services/events/events.service';
import { ExpertCallService } from '../call-services/expert-call.service';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs';
import { PullableCall } from '../models/pullable-call';

export class ActiveCallBarService {

  public static $inject = ['logger', 'expertCallService', 'eventsService', 'communicatorService'];

  public isPulling = false;

  private readonly showCallBarEvent = new Subject<void>();
  private readonly hideCallBarEvent = new Subject<void>();
  private pullableCall?: PullableCall;

  constructor(private logger: LoggerService,
              expertCallService: ExpertCallService,
              eventsService: EventsService,
              communicatorService: CommunicatorService) {

    communicatorService.connectionLostEvent$.subscribe(this.handleConnectionLost);
    expertCallService.pullableCall$.subscribe(this.handlePullable);
    eventsService.on('logout', () => this.hideCallBarEvent.next());
  }

  public pullCall = (): void => {
    if (this.pullableCall) {
      this.logger.debug('ActiveCallBarService: Pulling the call');
      this.isPulling = true;
      this.pullableCall.pull()
        .then(
          () => {
            this.hideCallBarEvent.next();
            this.pullableCall = undefined;
            this.logger.debug('ActiveCallBarService: Pulled the call');
          },
          err => {
            this.logger.error('ActiveCallBarService: Error when pulling call', err);
          })
        .finally(() => this.isPulling = false);
    } else {
      this.logger.error('ActiveCallBarService: Cannot pull, there is no call');
    }
  }

  public get hideCallBar$(): Observable<void> {
    return this.hideCallBarEvent;
  }

  public get showCallBar$(): Observable<void> {
    return this.showCallBarEvent;
  }

  private handlePullable = (pullableCall: PullableCall): void => {
    this.pullableCall = pullableCall;
    pullableCall.onPullExpired(() => this.hideCallBarEvent.next());
    this.showCallBarEvent.next();
  }

  private handleConnectionLost = (): void => {
    this.pullableCall = undefined;
    this.hideCallBarEvent.next();
  }
}
