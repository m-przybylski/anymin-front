// tslint:disable:readonly-array
import { EventsService } from '../events/events.service';
import { SessionServiceWrapper } from '../session/session.service';
import { AnymindWebsocketService } from '@platform/core/services/anymind-websocket/anymind-websocket.service';

export interface ISessionDeleted {
  removedSessionApiKey: string;
}

// tslint:disable:member-ordering
export class SessionDeletedService {
  public static $inject = ['sessionServiceWrapper', '$log', 'eventsService', 'anymindWebsocket'];

  constructor(
    private sessionServiceWrapper: SessionServiceWrapper,
    private $log: ng.ILogService,
    private eventsService: EventsService,
    private anymindWebsocket: AnymindWebsocketService,
  ) {}

  public init = (): void => {
    this.anymindWebsocket.sessionDeleted.subscribe(data => this.onSessionDeleted(data));
  };

  private onSessionDeleted = (sessionDeleted: string): void => {
    this.sessionServiceWrapper.getSession().then(
      sessionWithAccount => {
        if (sessionDeleted === sessionWithAccount.session.apiKey) {
          this.eventsService.emit('remote-session-deleted');
        }
      },
      error => {
        this.$log.warn(error);
      },
    );
  };
}
