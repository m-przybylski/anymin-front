import { EventsService } from '../../../services/events/events.service';
import { ExpertCallService } from '../call-services/expert-call.service';
import { Subject } from 'rxjs/Subject';

export class ActiveCallBarService {

  private readonly events = {
    onShowCallBar: new Subject<void>(),
    onHideCallBar: new Subject<void>()
  };

  static $inject = ['expertCallService', 'eventsService'];

    constructor(private expertCallService: ExpertCallService,
              eventsService: EventsService) {
    expertCallService.onCallActive(this.notifyShowCallBar);
    expertCallService.onCallPull(this.notifyHideCallBar);
    expertCallService.onCallTaken(this.notifyShowCallBar);
    expertCallService.onCallEnd(this.notifyHideCallBar);
    eventsService.on('logout', this.notifyHideCallBar);
  }

  public pullCall = (): void => {
    this.expertCallService.pullCall();
  }

  public onHideCallBar = (cb: () => void): void => {
    this.events.onHideCallBar.subscribe(cb);
  }

  public onShowCallBar = (cb: () => void): void => {
    this.events.onShowCallBar.subscribe(cb);
  }

  private notifyHideCallBar = (): void => this.events.onHideCallBar.next();

  private notifyShowCallBar = (): void => this.events.onShowCallBar.next();
}
