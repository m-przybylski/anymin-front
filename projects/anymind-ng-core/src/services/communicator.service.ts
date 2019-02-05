import { Inject, Injectable } from '@angular/core';
import { LoggerService } from './logger.service';
import { COMMUNICATOR_CONFIG } from '../shared/injection-tokens/injection-tokens';
import { Call, errorEvents, roomEvents, serverEvents, MachokeSDK, UserConfig, Session } from 'machoke-sdk';
import { Observable, Subject, Subscription, ReplaySubject } from 'rxjs';
import { LoggerFactory } from '../factories/logger.factory';

export interface IConnected {
  session: Session;
  hello: serverEvents.Hello;
}

export interface ICallInvitation {
  session: Session;
  call: Call;
}

export interface IRoomInvitation {
  session: Session;
  roomInvitation: roomEvents.Invited;
}

@Injectable({ providedIn: 'root' })
export class CommunicatorService {
  // External events
  private readonly callInvitationEvent = new Subject<ICallInvitation>();
  private readonly roomInvitationEvent = new Subject<IRoomInvitation>();
  private readonly connectionLostEvent = new Subject<void>();

  private connectionSubscription?: Subscription;

  // Connection Events
  private readonly connectionEstablishedEvent = new ReplaySubject<IConnected>(1);

  // Internal events
  private readonly connectionErrorEvent = new Subject<errorEvents.Error>();
  private readonly logger: LoggerService;

  constructor(@Inject(COMMUNICATOR_CONFIG) private ratelConfig: UserConfig, loggerFactory: LoggerFactory) {
    this.logger = loggerFactory.createLoggerService('CommunicatorService');
  }

  /**
   * When connection will be established, the connectionEstablishedEvent$ will be emitted.
   * Successfull authentication turns on the reconnection
   */
  public authenticate = (accountId: string, apiKey: string): void => {
    if (!this.connectionSubscription) {
      this.logger.debug('Creating connection');
      this.createRatelConnection(MachokeSDK.init(accountId, apiKey, this.ratelConfig));
    } else {
      this.logger.warn('Cannot authenticate, there is a connection already');
    }
  };

  /**
   * When connection will be established, the connectionEstablishedEvent$ will be emitted.
   * Successfull disconnect turns off the reconnection
   */
  public disconnect = (): void => {
    if (this.connectionSubscription) {
      this.logger.debug('Disconnecting');
      this.connectionSubscription.unsubscribe();
      this.connectionSubscription = undefined;
    } else {
      this.logger.warn('Cannot disconnect, there is no subscription');
    }
  };

  /**
   * Will be emitted when someone will call current session
   */
  public get callInvitationEvent$(): Observable<ICallInvitation> {
    return this.callInvitationEvent;
  }

  /**
   * Will be emitted when someone will open the chat room with current session
   */
  public get roomInvitationEvent$(): Observable<IRoomInvitation> {
    return this.roomInvitationEvent;
  }

  /**
   * Will be emitted when connection with the sdk server passed in the Config will be lost (ex. Artichoke)
   */
  public get connectionLostEvent$(): Observable<void> {
    return this.connectionLostEvent;
  }

  /**
   * Will be emitted when connection with the sdk server passed in the Config will be established (ex. Artichoke),
   * This event is also emitted when reconnect was successful
   */
  public get connectionEstablishedEvent$(): Observable<IConnected> {
    return this.connectionEstablishedEvent;
  }

  private createRatelConnection = (session: Session): Session => {
    this.logger.debug('Session created', session);

    const chat = session.machoke;

    chat.newCallInvitation$.subscribe(call => this.callInvitationEvent.next({ session, call }));

    chat.error$.subscribe((res: errorEvents.Error) => {
      this.logger.debug('onError', res);
      this.connectionErrorEvent.next(res);
    });

    // This event is fired when connection disappear because of network issue
    chat.serverUnreachable$.subscribe(() => {
      this.logger.debug('onServerUnreachable');
      this.logger.debug('ConnectionLost');
      this.connectionLostEvent.next();
    });

    chat.roomInvitation$.subscribe((roomInvitation: roomEvents.Invited) =>
      this.roomInvitationEvent.next({ session, roomInvitation }),
    );

    this.connectionSubscription = chat.connection$.subscribe((hello: serverEvents.Hello) => {
      this.logger.debug('onConnect', session.id, hello);
      this.connectionEstablishedEvent.next({ session, hello });
    });

    return session;
  };
}
