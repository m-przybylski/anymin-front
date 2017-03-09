import {CallbacksService} from "../../../services/callbacks/callbacks.service"
import {CallbacksFactory} from "../../../services/callbacks/callbacks.factory"
import {CallService} from "../call.service"
import {CommunicatorService} from "../communicator.service"
import {SoundsService} from "../../../services/sounds/sounds.service"
import {GetProfile} from "../../../api/model/GetProfile"
import {GetService} from "../../../api/model/GetService"

export class MessengerService {

  private room: any

  private callbacks: CallbacksService

  private static events = {
    onClientTyping: 'onClientTyping',
    onClientMark: 'onClientMark',
    onClientMessage: 'onClientMessage',
    onExpertTyping: 'onExpertTyping',
    onExpertMark: 'onExpertMark',
    onExpertMessage: 'onExpertMessage',
    onChatLeft: 'onChatLeft',
    onClientCreatingRoom: 'onClientCreatingRoom',
    onExpertCreatedRoom: 'onExpertCreatedRoom'
  }

  /* @ngInject */
  constructor(private $q: ng.IQService, private $log: ng.ILogService, callbacksFactory: CallbacksFactory,
              private communicatorService: CommunicatorService, callService: CallService,
              private soundsService: SoundsService) {

    this.callbacks = callbacksFactory.getInstance(Object.keys(MessengerService.events))

    callService.onClientCallStarted(this.createClientDirectRoom)
    callService.onExpertCallAnswered(this.createExpertDirectRoom)
    callService.onClientCallPending(this.onClientCreatingRoomEvent)
    callService.onCallEnd(this.leaveRoom)
  }

  public onClientTyping = (cb: () => void): void =>
    this.callbacks.methods.onClientTyping(cb)

  public onClientMark = (cb: () => void): void =>
    this.callbacks.methods.onClientMark(cb)

  public onClientMessage = (cb: (msg: any) => void): void =>
    this.callbacks.methods.onClientMessage(cb)

  public onExpertTyping = (cb: () => void): void =>
    this.callbacks.methods.onExpertTyping(cb)

  public onExpertMark = (cb: () => void): void =>
    this.callbacks.methods.onExpertMark(cb)

  public onExpertMessage = (cb: (msg: any) => void): void =>
    this.callbacks.methods.onExpertMessage(cb)

  public onChatLeft = (cb: () => void): void =>
    this.callbacks.methods.onChatLeft(cb)

  public onClientCreatingRoom = (cb: (expert: GetProfile) => void): void =>
    this.callbacks.methods.onClientCreatingRoom(cb)

  public onExpertCreatedRoom = (cb: () => void): void =>
    this.callbacks.methods.onExpertCreatedRoom(cb)

  public getHistory = () => {
    if (this.room) {
      return this.room.getHistory()
    } else {
      return this.$q.reject('No room')
    }
  }

  public getUsers = (): ng.IPromise<Array<any>> => {
    if (this.room) {
      return this.room.getUsers()
    } else {
      return this.$q.reject('No room')
    }
  }

  public getMark = (): ng.IPromise<any> => {
    if (this.room) {
      return this.room.getMark()
    } else {
      return this.$q.reject('No room')
    }
  }

  public indicateTyping = (): ng.IPromise<any> => {
    if (this.room) {
      return this.room.indicateTyping()
    } else {
      return this.$q.reject('No room')
    }
  }

  public sendMessage = (msg: any): ng.IPromise<any> => {
    if (this.room) {
      return this.room.send(msg)
    } else {
      return this.$q.reject('No room')
    }
  }

  public mark = (timestamp: Date): ng.IPromise<any> => {
    if (this.room) {
      return this.room.mark(timestamp)
    } else {
      return this.$q.reject('No room')
    }
  }

  private leaveRoom = () => {
    this.room = null
    this.callbacks.notify(MessengerService.events.onChatLeft, null)
  }

  private _onExpertTyping = () =>
    this.callbacks.notify(MessengerService.events.onExpertTyping, null)

  private _onExpertMark = () =>
    this.callbacks.notify(MessengerService.events.onExpertMark, null)

  private _onExpertMessage = (message: any) => {
    this.soundsService.playMessageNew()
    this.callbacks.notify(MessengerService.events.onExpertMessage, message)
  }

  private onExpertCreateDirectRoom = (room: any) => {
    if (room) {
      this.room = room
      this.room.onMessage(this._onExpertMessage)
      this.room.onTyping(this._onExpertTyping)
      this.room.onMark(this._onExpertMark)
      this.callbacks.notify(MessengerService.events.onExpertCreatedRoom, null)
    }
  }

  private onExpertCreateDirectRoomError = (err: any) =>
    this.$log.error(err)

  private createExpertDirectRoom = (serviceInvitationTuple: {service: GetService, invitation: any}) => {
    if (this.room) {
      this.$log.error('Message room already exists')
      return void(0)
    }

    const session = this.communicatorService.findExpertSession(serviceInvitationTuple.service.id)

    if (typeof session !== 'object' || !session) {
      this.$log.error('There is no expert session')
    }

    return session.chat.createDirectRoom(serviceInvitationTuple.invitation.inviter)
      .then(this.onExpertCreateDirectRoom)
      .catch(this.onExpertCreateDirectRoomError)
  }

  private _onClientTyping = () =>
    this.callbacks.notify(MessengerService.events.onClientTyping, null)

  private _onClientMark = () =>
    this.callbacks.notify(MessengerService.events.onClientMark, null)

  private _onClientMessage = (message: any) => {
    this.soundsService.playMessageNew()
    this.callbacks.notify(MessengerService.events.onClientMessage, message)
  }

  private onClientCreateDirectRoom = (_room: any) => {
    if (_room) {
      this.room = _room
      this.room.onTyping(this._onClientTyping)
      this.room.onMark(this._onClientMark)
      this.room.onMessage(this._onClientMessage)
    }
  }

  private onClientCreateDirectRoomError = (err: any) =>
    this.$log.error(err)

  private createClientDirectRoom = (_ratelId: string) => {
    if (this.room) {
      throw new Error('Message room already exists')
    }

    const session = this.communicatorService.getClientSession()

    if (session) {
      session.chat.createDirectRoom(_ratelId)
        .then(this.onClientCreateDirectRoom)
        .catch(this.onClientCreateDirectRoomError)
    } else {
      this.$log.error('Session is empty')
    }
  }

  private onClientCreatingRoomEvent = (data: {expert: GetProfile, service: GetService}) =>
    this.callbacks.notify(MessengerService.events.onClientCreatingRoom, data.expert)

}
