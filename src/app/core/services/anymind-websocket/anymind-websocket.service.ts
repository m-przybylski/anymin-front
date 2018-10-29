// tslint:disable:no-any
import { Injectable } from '@angular/core';
import { LoggerFactory } from '@anymind-ng/core';
import { Subject, ReplaySubject, Observable, interval, iif, of } from 'rxjs';
import { switchMapTo, takeUntil, switchMap, first } from 'rxjs/operators';
import { WebSocketService } from '../websocket/websocket.service.rxjs';
import { WebSocketServiceFactory } from '../websocket/websocket.factory';
import { GetExpertVisibility } from '@anymind-ng/api';
import { select, Store } from '@ngrx/store';
import * as fromCore from '@platform/core/reducers';
import { Logger } from '@platform/core/logger';

export interface IWebSocketMessage {
  messageType: string;
  value?: any;
}

export interface IWebSocketMessageConfiguration {
  [key: string]: {
    event: Subject<any> | ReplaySubject<any>;
    extract(message: any): any;
  };
}

export interface IHeartbeatConfig {
  intervalMillis: number;
  timestamp: Date;
}

@Injectable()
export class AnymindWebsocketService extends Logger {
  private readonly callSummaryEvent$: ReplaySubject<any> = new ReplaySubject<any>(1);
  private readonly financialOperationEvent$: Subject<any> = new Subject<any>();
  private readonly sessionDeletedEvent$: Subject<string> = new Subject<string>();
  private readonly minuteLeftWarningEvent$: Subject<void> = new Subject<void>();
  private readonly clientCallCostEvent$: Subject<any> = new Subject<any>();
  private readonly heartbeatEvent$: Subject<Date> = new Subject<Date>();
  private readonly profileCallProfitEvent$: Subject<any> = new Subject<any>();
  private readonly profileCallRefundEvent$: Subject<any> = new Subject<any>();
  private readonly newInvitationEvent$: Subject<any> = new Subject<any>();
  private readonly expertPresenceEvent$: Subject<GetExpertVisibility.VisibilityEnum> = new Subject<
    GetExpertVisibility.VisibilityEnum
  >();
  private readonly heartbeatConfigEvent$: ReplaySubject<IHeartbeatConfig> = new ReplaySubject<IHeartbeatConfig>();
  private readonly creditCardAddedEvent$: Subject<any> = new Subject<any>();
  private readonly sessionDestroyed$: Subject<void> = new Subject<void>();

  private readonly configuration: IWebSocketMessageConfiguration = {
    CALL_SUMMARY: {
      event: this.callSummaryEvent$,
      extract: (message: IWebSocketMessage): any => message.value.callSummary,
    },
    SESSION_DELETED: {
      event: this.sessionDeletedEvent$,
      extract: (message: IWebSocketMessage): any => message.value.removedSessionApiKey,
    },
    NEW_FINANCIAL_OPERATION: {
      event: this.financialOperationEvent$,
      extract: (message: IWebSocketMessage): any => message.value,
    },
    ONE_MINUTE_LEFT_WARNING: {
      event: this.minuteLeftWarningEvent$,
      extract: (_message: IWebSocketMessage): void => undefined,
    },
    PROFILE_CALL_PROFIT: {
      event: this.profileCallProfitEvent$,
      extract: (message: IWebSocketMessage): void => message.value,
    },
    PROFILE_CALL_REFUND: {
      event: this.profileCallRefundEvent$,
      extract: (message: IWebSocketMessage): void => message.value,
    },
    NEW_INVITATION: {
      event: this.newInvitationEvent$,
      extract: (message: IWebSocketMessage): void => message.value,
    },
    CLIENT_CALL_COST: {
      event: this.clientCallCostEvent$,
      extract: (message: IWebSocketMessage): any => message,
    },
    HEARTBEAT: {
      event: this.heartbeatEvent$,
      extract: (message: IWebSocketMessage): Date => new Date(message.value.timestamp),
    },
    CREDIT_CARD_ADDED: {
      event: this.creditCardAddedEvent$,
      extract: (message: any): any => message.value.cardDetails,
    },
    EXPERT_PRESENCE_UPDATE: {
      event: this.expertPresenceEvent$,
      extract: (message: IWebSocketMessage): string => message.value.status,
    },
    HEARTBEAT_CONFIG: {
      event: this.heartbeatConfigEvent$,
      extract: (message: IWebSocketMessage): IHeartbeatConfig => ({
        intervalMillis: message.value.intervalMillis,
        timestamp: new Date(message.value.timestamp),
      }),
      /**
       * intervalMillis: 3000,
       * timestamp: "2018-07-23T11:14:05.383Z"
       */
    },
  };

  private websocketService: WebSocketService<IWebSocketMessage>;

  constructor(
    private websocketServiceFactory: WebSocketServiceFactory<IWebSocketMessage>,
    store: Store<fromCore.IState>,
    loggerFactory: LoggerFactory,
  ) {
    super(loggerFactory.createLoggerService('AnymindWebsocketService'));

    store
      .pipe(
        select(fromCore.getSession),
        switchMap(sessionAccount =>
          iif(() => sessionAccount !== undefined, of(() => this.setupWebsocket()), of(() => this.onUserLogout())),
        ),
      )
      .subscribe(websocketFunction => {
        websocketFunction();
      });
  }

  public get callSummary(): Observable<any> {
    return this.callSummaryEvent$.asObservable();
  }

  public get financialOperation(): Observable<any> {
    return this.financialOperationEvent$.asObservable();
  }

  public get sessionDeleted(): Observable<string> {
    return this.sessionDeletedEvent$.asObservable();
  }

  public get minuteLeftWarning(): Observable<void> {
    return this.minuteLeftWarningEvent$.asObservable();
  }

  public get clientCallCost(): Observable<any> {
    return this.clientCallCostEvent$.asObservable();
  }

  public get websocketHeartbeat(): Observable<Date> {
    return this.heartbeatEvent$.asObservable();
  }

  public get creditCardAdded(): Observable<any> {
    return this.creditCardAddedEvent$.asObservable();
  }

  public get expertPresence(): Observable<GetExpertVisibility.VisibilityEnum> {
    return this.expertPresenceEvent$.asObservable();
  }

  public get heartbeatConfig(): Observable<IHeartbeatConfig> {
    return this.heartbeatConfigEvent$.asObservable();
  }

  public get profileCallRefund(): Observable<any> {
    return this.profileCallRefundEvent$.asObservable();
  }

  public get profileCallProfit(): Observable<any> {
    return this.profileCallProfitEvent$.asObservable();
  }

  public get newInvitation(): Observable<any> {
    return this.profileCallProfitEvent$.asObservable();
  }

  private handleMessageType = (data: any): void => {
    const type = data && data.messageType;
    const { event, extract } = this.configuration[type];
    event.next(extract(data));
  };

  private connectWebsocket = (): void => {
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const url = `${protocol}//${window.location.host}/api/ws/register`;
    this.websocketService = this.websocketServiceFactory.create(url);
    this.websocketService.messages.subscribe(this.onNewMessage);
  };

  private setupWebsocket = (): void => {
    this.listenHeartbeats();
    this.connectWebsocket();
  };

  private onUserLogout = (): void => {
    this.sessionDestroyed$.next();
    this.websocketService.disconnectWithoutSideEffects();
  };

  private listenHeartbeats = (): void => {
    this.heartbeatConfig
      .pipe(
        first(),
        switchMap(config => {
          const twoHeartbeatsInterval = config.intervalMillis + config.intervalMillis;
          const heartBeatInterval = interval(twoHeartbeatsInterval);

          return this.websocketHeartbeat.pipe(
            switchMapTo(heartBeatInterval),
            takeUntil(this.sessionDestroyed$),
          );
        }),
      )
      .subscribe(() => {
        this.reconnectWebsocket();
      });
  };

  private reconnectWebsocket = (): void => {
    this.websocketService.disconnectWithoutSideEffects();
    this.connectWebsocket();
  };

  private onNewMessage = (msg: IWebSocketMessage): void => {
    if (!Object.keys(this.configuration).includes(msg.messageType)) {
      return this.loggerService.warn('Cannot parse message, unhandled message type.', msg);
    }
    this.handleMessageType(msg);
  };
}
