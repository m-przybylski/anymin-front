// tslint:disable:readonly-array
import { ProfiteloWebsocketService } from '../profitelo-websocket/profitelo-websocket.service';
import { EventsService } from '../events/events.service';
import { SessionServiceWrapper } from '../session/session.service';

export interface ISessionDeleted {
  removedSessionApiKey: string;
}

// tslint:disable:member-ordering
export class SessionDeletedService {

  public static $inject = ['sessionServiceWrapper', '$log', 'eventsService', 'profiteloWebsocket'];

    constructor(private sessionServiceWrapper: SessionServiceWrapper,
              private $log: ng.ILogService,
              private eventsService: EventsService,
              private profiteloWebsocket: ProfiteloWebsocketService) {
  }

  public init = (): void => {
    this.profiteloWebsocket.onSessionDeleted(this.onSessionDeleted);
  }

  private onSessionDeleted = (sessionDeleted: ISessionDeleted): void => {
    this.sessionServiceWrapper.getSession().then((sessionWithAccount) => {
      if (sessionDeleted.removedSessionApiKey === sessionWithAccount.session.apiKey) {
        this.eventsService.emit('remote-session-deleted');
      }
    }, (error) => {
      this.$log.warn(error);
    });
  }
}
