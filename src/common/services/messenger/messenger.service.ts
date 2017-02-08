import ICallService = profitelo.services.call.ICallService

namespace profitelo.services.messenger {

  import ICommunicatorService = profitelo.services.communicator.ICommunicatorService
  import ICallbacksFactory = profitelo.services.callbacks.ICallbacksFactory
  import ICallbacksService = profitelo.services.callbacks.ICallbacksService

  export interface IMessengerService {
    onClientTyping(cb: () => void): void
    onClientMark(cb: () => void): void
    onClientMessage(cb: (msg: any) => void): void
    onExpertTyping(cb: () => void): void
    onExpertMark(cb: () => void): void
    onExpertMessage(cb: (msg: any) => void): void
    onChatLeft(cb: () => void): void
    onClientCreatingRoom(cb: (expert: Profile) => void): void
    onExpertCreatedRoom(cb: () => void): void
    getHistory(): ng.IPromise<any>
    getUsers(): ng.IPromise<any>
    getMark(): ng.IPromise<any>
    sendMessage(msg: string): ng.IPromise<any>
    indicateTyping(): ng.IPromise<any>
    mark(timestamp): ng.IPromise<any>
  }

  class MessengerService implements IMessengerService {

    private room: any

    private callbacks: ICallbacksService

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

    constructor(private $q: ng.IQService, private $log: ng.ILogService, callbacksFactory: ICallbacksFactory,
                private communicatorService: ICommunicatorService, callService: ICallService,
                private soundsService) {

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

    public onClientCreatingRoom = (cb: (expert: Profile) => void): void =>
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

    public getUsers = () => {
      if (this.room) {
        return this.room.getUsers()
      } else {
        return this.$q.reject('No room')
      }
    }

    public getMark = () => {
      if (this.room) {
        return this.room.getMark()
      } else {
        return this.$q.reject('No room')
      }
    }

    public indicateTyping = () => {
      if (this.room) {
        return this.room.indicateTyping()
      } else {
        return this.$q.reject('No room')
      }
    }

    public sendMessage = (msg) => {
      if (this.room) {
        return this.room.send(msg)
      } else {
        return this.$q.reject('No room')
      }
    }

    public mark = (timestamp) => {
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

    private _onExpertMessage = (message) => {
      this.soundsService.playMessageNew()
      this.callbacks.notify(MessengerService.events.onExpertMessage, message)
    }

    private onExpertCreateDirectRoom = (room) => {
      if (room) {
        this.room = room
        this.room.onMessage(this._onExpertMessage)
        this.room.onTyping(this._onExpertTyping)
        this.room.onMark(this._onExpertMark)
        this.callbacks.notify(MessengerService.events.onExpertCreatedRoom, null)
      }
    }

    private onExpertCreateDirectRoomError = (err) =>
      this.$log.error(err)

    private createExpertDirectRoom = (serviceInvitationTuple) => {
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

    private _onClientMessage = (message) => {
      this.soundsService.playMessageNew()
      this.callbacks.notify(MessengerService.events.onClientMessage, message)
    }

    private onClientCreateDirectRoom = (_room) => {
      if (_room) {
        this.room = _room
        this.room.onTyping(this._onClientTyping)
        this.room.onMark(this._onClientMark)
        this.room.onMessage(this._onClientMessage)
      }
    }

    private onClientCreateDirectRoomError = (err) =>
      this.$log.error(err)

    private createClientDirectRoom = (_ratelId) => {
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

    private onClientCreatingRoomEvent = serviceUsageRequest =>
      this.callbacks.notify(MessengerService.events.onClientCreatingRoom, serviceUsageRequest.expert)

  }

  angular.module('profitelo.services.messenger', [
    'profitelo.services.communicator',
    'profitelo.services.callbacks',
    'profitelo.services.call',
    'profitelo.services.sounds'
  ])
  .config(($qProvider) => {
    $qProvider.errorOnUnhandledRejections(false)
  })
  .service('messengerService', MessengerService)
}
