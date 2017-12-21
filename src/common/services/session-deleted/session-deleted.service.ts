import {ProfiteloWebsocketService} from '../profitelo-websocket/profitelo-websocket.service'
import {SessionService} from '../session/session.service'
import {EventsService} from '../events/events.service'

export interface ISessionDeleted {
  removedSessionApiKey: string
}

export class SessionDeletedService {

  /* @ngInject */
  constructor(private sessionService: SessionService,
              private $log: ng.ILogService,
              private eventsService: EventsService,
              private profiteloWebsocket: ProfiteloWebsocketService) {
  }

  public init = (): void => {
    this.profiteloWebsocket.onSessionDeleted(this.onSessionDeleted)
  }

  private onSessionDeleted = (sessionDeleted: ISessionDeleted): void => {
    this.sessionService.getSession().then((session) => {
      if (sessionDeleted.removedSessionApiKey === session.apiKey) {
        this.eventsService.emit('remote-session-deleted')
      }
    }, (error) => {
      this.$log.warn(error)
    })
  }
}
