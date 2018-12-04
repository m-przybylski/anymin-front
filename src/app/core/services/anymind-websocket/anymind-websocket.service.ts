// tslint:disable:no-any
// tslint:disable:max-file-line-count
import { Injectable } from '@angular/core';
import { LoggerFactory } from '@anymind-ng/core';
import { Subject, ReplaySubject, Observable, interval, iif, of } from 'rxjs';
import { switchMapTo, takeUntil, switchMap, first } from 'rxjs/operators';
import { WebSocketService } from '../websocket/websocket.service.rxjs';
import { WebSocketServiceFactory } from '../websocket/websocket.factory';
import { GetExpertVisibility } from '@anymind-ng/api';
import { Store } from '@ngrx/store';
import * as fromCore from '@platform/core/reducers';
import { Logger } from '@platform/core/logger';
import { IProfileCallProfit } from './anymind-websocket.modal';
import { selectNewSession } from '@platform/core/utils/select-new-session';

type WS_BACKEND_MESSAGES =
  | 'ADMIN_ACCEPTED_COMPLAINT_NOTIFY_CLIENT'
  | 'ADMIN_ACCEPTED_COMPLAINT_NOTIFY_EXPERT'
  | 'ADMIN_REJECTED_COMPLAINT_NOTIFY_CLIENT'
  | 'ADMIN_REJECTED_COMPLAINT_NOTIFY_EXPERT'
  | 'CALL_SUMMARY'
  | 'CLIENT_CALL_COST'
  | 'CLIENT_CALL_REFUND'
  | 'CLIENT_COMPLAINT_CANCELLED'
  | 'CREDIT_CARD_ADDED'
  | 'ENFORCED_CALL_END'
  | 'EXPERT_ACCEPTED_COMPLAINT'
  | 'EXPERT_PRESENCE_UPDATE'
  | 'EXPERT_REJECTED_COMPLAINT'
  | 'HEARTBEAT'
  | 'HEARTBEAT_CONFIG'
  | 'IMPORTANT_CLIENT_ACTIVITY'
  | 'IMPORTANT_EXPERT_ACTIVITY'
  | 'IMPORTANT_ORGANIZATION_ACTIVITY'
  | 'INVITATION_DISPLAYED'
  | 'NEW_CLIENT_COMPLAINT'
  | 'NEW_FINANCIAL_OPERATION'
  | 'NEW_INVITATION'
  | 'PROFILE_CALL_PROFIT'
  | 'PROFILE_CALL_REFUND'
  | 'ONE_MINUTE_LEFT_WARNING'
  | 'SESSION_DELETED';

export interface IWebSocketMessage {
  messageType: string;
  value?: any;
}

export interface IWebSocketMessageParser {
  extract(message: any): any;
}

export interface IWebSocketMessageConfiguration extends IWebSocketMessageParser {
  event: Subject<any> | ReplaySubject<any>;
}

export interface IHeartbeatConfig {
  intervalMillis: number;
  timestamp: Date;
}

@Injectable()
export class AnymindWebsocketService extends Logger {
  private readonly callSummaryEvent$ = new ReplaySubject<any>(1);
  private readonly financialOperationEvent$ = new Subject<any>();
  private readonly sessionDeletedEvent$ = new Subject<string>();
  private readonly minuteLeftWarningEvent$ = new Subject<void>();
  private readonly clientCallCostEvent$ = new Subject<any>();
  private readonly heartbeatEvent$ = new Subject<Date>();
  private readonly profileCallProfitEvent$ = new Subject<any>();
  private readonly profileCallRefundEvent$ = new Subject<any>();
  private readonly newInvitationEvent$ = new Subject<any>();
  private readonly expertPresenceEvent$ = new Subject<GetExpertVisibility.VisibilityEnum>();
  private readonly heartbeatConfigEvent$ = new ReplaySubject<IHeartbeatConfig>();
  private readonly creditCardAddedEvent$ = new Subject<any>();
  private readonly sessionDestroyed$ = new Subject<void>();
  private readonly importantExpertActivityEvent$ = new Subject<string>();
  private readonly importantCompanyActivityEvent$ = new Subject<string>();
  private readonly importantClientActivityEvent$ = new Subject<void>();
  private readonly configuration: { [key in WS_BACKEND_MESSAGES]?: IWebSocketMessageConfiguration } = {
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
    IMPORTANT_EXPERT_ACTIVITY: {
      event: this.importantExpertActivityEvent$,
      extract: (message: IWebSocketMessage): string => message.value.activityId,
    },
    IMPORTANT_ORGANIZATION_ACTIVITY: {
      event: this.importantCompanyActivityEvent$,
      extract: (message: IWebSocketMessage): string => message.value.activityId,
    },
    IMPORTANT_CLIENT_ACTIVITY: {
      event: this.importantClientActivityEvent$,
      extract: (message: IWebSocketMessage): string => message.value.activityId,
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
        selectNewSession(),
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

  /**
   * important expert activity
   * as a result you get activityId
   */
  public get importantExpertActivity(): Observable<string> {
    return this.importantExpertActivityEvent$.asObservable();
  }

  public get importantCompanyActivity(): Observable<string> {
    return this.importantCompanyActivityEvent$.asObservable();
  }

  public get importantClientActivity(): Observable<any> {
    return this.importantClientActivityEvent$.asObservable();
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

  public get profileCallProfit(): Observable<IProfileCallProfit> {
    return this.profileCallProfitEvent$.asObservable();
  }

  public get newInvitation(): Observable<any> {
    return this.newInvitationEvent$.asObservable();
  }

  private handleMessageType = (data: any): void => {
    const type: WS_BACKEND_MESSAGES = data && data.messageType;
    const { event, extract } = this.configuration[type] as IWebSocketMessageConfiguration;
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
    if (this.websocketService) {
      this.sessionDestroyed$.next();
      this.websocketService.disconnectWithoutSideEffects();
    }
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
