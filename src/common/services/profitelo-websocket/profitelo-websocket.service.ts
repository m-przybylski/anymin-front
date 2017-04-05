import {CallbacksFactory} from '../callbacks/callbacks.factory'
import {CallbacksService} from '../callbacks/callbacks.service'
import {CallSummary} from '../../models/CallSummary'
import {CommonConfig} from '../../../../generated_modules/common-config/common-config'
import {UserService} from '../user/user.service'
import {EventsService} from '../events/events.service'

export class ProfiteloWebsocketService {

  private callbacks: CallbacksService
  private websocket: WebSocket
  private wsEndpoint: string

  private static reconnectTimeout = 1000
  private static events = {
    onCallSummary: 'onCallSummary',
    onInit: 'onInit'
  }

  /* @ngInject */
  constructor(private $log: ng.ILogService, private userService: UserService, private eventsService: EventsService,
              private $timeout: ng.ITimeoutService, callbacksFactory: CallbacksFactory,
              CommonConfig: CommonConfig) {
    this.callbacks = callbacksFactory.getInstance(Object.keys(ProfiteloWebsocketService.events))
    this.wsEndpoint = CommonConfig.getAllData().urls.ws + '/ws/register'
    this.eventsService.on('login', this.connectWebsocket)
    this.eventsService.on('logout', this.disconnectWebsocket)
  }

  public initializeWebsocket = () => {
    this.userService.getUser().then(this.connectWebsocket)
  }

  public sendMessage = (msg: string, type: string) => {
    if (this.websocket.readyState === WebSocket.OPEN) {
      const serialized = {
        messageType: type,
        value: msg
      }
      this.websocket.send(JSON.stringify(serialized))
      return true
    } else {
      this.$log.error('Can not send message, websocket is closed. State: ' + this.websocket.readyState)
      return false
    }
  }

  public onInit = (callback: () => void) => {
    this.callbacks.methods.onInit(callback)
  }

  public onCallSummary = (callback: (data: CallSummary) => void) => {
    this.callbacks.methods.onCallSummary(callback)
  }

  private onSocketOpen = () => {
    this.callbacks.notify(ProfiteloWebsocketService.events.onInit, null)
  }

  private handleMessageType = (data: any) => {
    const type = data.messageType
    const value = data.value

    switch (type) {
      case 'CallSummaryEvent':
        this.callbacks.notify(ProfiteloWebsocketService.events.onCallSummary, value)
        break

      default:
        this.$log.info('Unknown messageType ' + type)
        break
    }
  }

  private onSocketMessage = (event: any) => {
    try {
      const data = JSON.parse(event.data)
      this.handleMessageType(data)
    } catch (err) {
      this.$log.error(err)
    }
    this.$log.debug(event)
  }

  private onSocketError = (err: any) =>
    this.$log.error(err)

  private onSocketClose = (event: any) => {
    this.$log.info('Profitelo websocket closed', event)
    this.userService.getUser().then(() => {
      this.$timeout(this.connectWebsocket, ProfiteloWebsocketService.reconnectTimeout)
    })
  }

  public disconnectWebsocket = () => {
    if (this.websocket) {
      this.websocket.close()
    }
  }

  private connectWebsocket = () => {
    this.websocket = new WebSocket(this.wsEndpoint)
    this.websocket.onopen = this.onSocketOpen
    this.websocket.onmessage = this.onSocketMessage
    this.websocket.onerror = this.onSocketError
    this.websocket.onclose = this.onSocketClose
  }
}
