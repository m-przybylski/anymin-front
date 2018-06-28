// tslint:disable:no-any
// tslint:disable:newline-before-return
import { UserService } from '../user/user.service';
import { EventsService } from '../events/events.service';
import { ICallSummaryWebsocketObject } from '../../models/CallSummary';
import { Subject, Subscription } from 'rxjs';
import {
  IExpertPresenceUpdate
}
  from '../../components/navbar/navbar-expert-visibility/navbar-expert-visibility.service';
import { Config } from '../../../../config';
import { CommonConfig } from '../../../../common-config';

// tslint:disable:member-ordering
export class ProfiteloWebsocketService {
  private websocket: WebSocket;
  private wsEndpoint: string;

  private readonly events = {
    onInit: new Subject<void>(),
    onCallSummary: new Subject<ICallSummaryWebsocketObject>(),
    onOneMinuteLeftWarning: new Subject<void>(),
    onNewFinancialOperation: new Subject<any>(),
    onClientCallCost: new Subject<any>(),
    onProfileCallProfit: new Subject<any>(),
    onExpertVisibilityUpdate: new Subject<any>(),
    onSessionDeleted: new Subject<any>(),
    onNewInvitation: new Subject<any>(),
    onProfileCallRefund: new Subject<any>()
  };

  public static $inject = ['$log', 'userService', 'eventsService', '$timeout', '$rootScope'];

  constructor(private $log: ng.ILogService,
              private userService: UserService,
              private eventsService: EventsService,
              private $timeout: ng.ITimeoutService,
              private $rootScope: ng.IRootScopeService) {
    this.wsEndpoint = CommonConfig.getCommonConfig().urls.ws + '/ws/register';
    this.eventsService.on('login', this.connectWebsocket);
    this.eventsService.on('logout', this.disconnectWebsocket);
  }

  public initializeWebsocket = (): void => {
    this.userService.getUser().then(this.connectWebsocket);
  }

  public sendMessage = (msg: string, type: string): boolean => {
    if (this.websocket.readyState === WebSocket.OPEN) {
      const serialized = {
        messageType: type,
        value: msg
      };
      this.websocket.send(JSON.stringify(serialized));
      return true;
    } else {
      this.$log.error('Can not send message, websocket is closed. State: ' + String(this.websocket.readyState));
      return false;
    }
  }

  public onInit = (callback: () => void): Subscription =>
    this.events.onInit.subscribe(callback)

  public onCallSummary = (callback: (data: ICallSummaryWebsocketObject) => void): Subscription =>
    this.events.onCallSummary.subscribe(callback)

  public onOneMinuteLeftWarning = (callback: () => void): Subscription =>
    this.events.onOneMinuteLeftWarning.subscribe(callback)

  public onNewFinancialOperation = (callback: (data: any) => void): Subscription =>
    this.events.onNewFinancialOperation.subscribe(callback)

  public onClientCallCost = (callback: (data: any) => void): Subscription =>
    this.events.onClientCallCost.subscribe(callback)

  public onProfileCallProfit = (callback: (data: any) => void): Subscription =>
    this.events.onProfileCallProfit.subscribe(callback)

  public onProfileCallRefund = (callback: (data: any) => void): Subscription =>
    this.events.onProfileCallRefund.subscribe(callback)

  public onExpertVisibilityUpdate = (callback: (data: IExpertPresenceUpdate) => void): Subscription =>
    this.events.onExpertVisibilityUpdate.subscribe(callback)

  public onNewInvitation = (callback: () => void): Subscription =>
    this.events.onNewInvitation.subscribe(callback)

  public onSessionDeleted = (callback: (data: any) => void): Subscription =>
    this.events.onSessionDeleted.subscribe(callback)

  private onSocketOpen = (): void => {
    this.events.onInit.next();
  }

  // tslint:disable-next-line:cyclomatic-complexity
  private handleMessageType = (data: any): void => {
    const type = data.messageType;
    const value = data.value;

    switch (type) {
      case 'CALL_SUMMARY':
        this.events.onCallSummary.next(value);
        break;
      case 'ONE_MINUTE_LEFT_WARNING':
        this.events.onOneMinuteLeftWarning.next(value);
        break;
      case 'NEW_FINANCIAL_OPERATION':
        this.events.onNewFinancialOperation.next(value);
        break;
      case 'CLIENT_CALL_COST':
        this.events.onClientCallCost.next(value);
        break;
      case 'PROFILE_CALL_PROFIT':
        this.events.onProfileCallProfit.next(value);
        break;
      case 'EXPERT_PRESENCE_UPDATE':
        this.events.onExpertVisibilityUpdate.next(value);
        break;
      case 'SESSION_DELETED':
        this.events.onSessionDeleted.next(value);
        break;
      case 'NEW_INVITATION':
        this.events.onNewInvitation.next(value);
        break;
      case 'PROFILE_CALL_REFUND':
        this.events.onProfileCallRefund.next(value);
        break;
      default:
        this.$log.info('Unknown messageType ' + String(type));
    }
  }

  private onSocketMessage = (event: any): void => {
    try {
      const data = JSON.parse(event.data);
      this.handleMessageType(data);
      this.$rootScope.$apply();
    } catch (err) {
      this.$log.error(err);
    }
    this.$log.debug(event);
  }

  private onSocketError = (err: any): void =>
    this.$log.error(err)

  private onSocketClose = (event: any): void => {
    this.$log.info('Profitelo websocket closed', event);
    this.userService.getUser().then(() => {
      this.$timeout(this.connectWebsocket, Config.backend.websocketReconnectTimeout);
    });
  }

  public disconnectWebsocket = (): void => {
    if (this.websocket) {
      this.websocket.close();
    }
  }

  private connectWebsocket = (): void => {
    this.websocket = new WebSocket(this.wsEndpoint);
    this.websocket.onopen = this.onSocketOpen;
    this.websocket.onmessage = this.onSocketMessage;
    this.websocket.onerror = this.onSocketError;
    this.websocket.onclose = this.onSocketClose;
  }
}
