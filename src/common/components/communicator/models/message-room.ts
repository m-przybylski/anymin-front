import * as RatelSdk from 'ratel-sdk-js';
import {CallbacksFactory} from '../../../services/callbacks/callbacks.factory';
import {CallbacksService} from '../../../services/callbacks/callbacks.service';
import {SoundsService} from '../../../services/sounds/sounds.service';
import {Message} from 'ratel-sdk-js'
import {Paginated} from 'ratel-sdk-js/dist/protocol/protocol'

export class MessageRoom {

  private static readonly chatHistoryLimit: number = 200
  public room?: RatelSdk.BusinessRoom

  private callbacks: CallbacksService

  private static readonly events = {
    onTyping: 'onTyping',
    onMark: 'onMark',
    onMessage: 'onMessage'
  }

  constructor(callbacksFactory: CallbacksFactory,
              private soundsService: SoundsService) {
    this.callbacks = callbacksFactory.getInstance(Object.keys(MessageRoom.events))
  }

  public getHistory = (): Promise<Paginated<Message>> => {
    if (this.room) {
      return this.room.getMessages(0, MessageRoom.chatHistoryLimit)
    } else {
      return Promise.reject('No room')
    }
  }

  public getUsers = (): Promise<RatelSdk.protocol.ID[]> => {
    if (this.room) {
      return this.room.getUsers()
    } else {
      return Promise.reject('No room')
    }
  }

  public getMark = (): Promise<number> => {
    if (this.room) {
      return this.room.getMark()
    } else {
      return Promise.reject('No room')
    }
  }

  public indicateTyping = (): Promise<void> => {
    if (this.room) {
      return this.room.indicateTyping()
    } else {
      return Promise.reject('No room')
    }
  }

  public sendMessage =
    (msg: string, tag = 'message', context?: RatelSdk.protocol.Context): Promise<RatelSdk.Message> => {
      if (this.room) {
        return this.room.sendCustom(msg, tag, context)
      } else {
        return Promise.reject('No room')
      }
    }

  public mark = (timestamp: RatelSdk.protocol.Timestamp): Promise<void> => {
    if (this.room) {
      return this.room.setMark(timestamp)
    } else {
      return Promise.reject('No room')
    }
  }

  public setRoom = (room: RatelSdk.BusinessRoom): void => {
    this.room = room;
    this.registerRoomEvent(room);
  }

  public joinRoom = (room: RatelSdk.BusinessRoom): Promise<void> => {
    if (!this.room) {
      this.setRoom(room)
      return room.join()
    }
    else {
      throw new Error('Room already set');
    }
  }

  public onTyping = (cb: () => void): void =>
    this.callbacks.methods.onTyping(cb)

  public onMark = (cb: (roomMark: RatelSdk.events.RoomMark) => void): void =>
    this.callbacks.methods.onMark(cb)

  public onMessage = (cb: (msg: RatelSdk.Message) => void): void =>
    this.callbacks.methods.onMessage(cb)

  private registerRoomEvent = (room: RatelSdk.BusinessRoom): void => {
    room.onTyping(() => this.callbacks.notify(MessageRoom.events.onTyping, null))
    room.onMark((roomMark) => this.callbacks.notify(MessageRoom.events.onMark, roomMark))
    room.onCustom('message', (roomMessage) => {
      this.callbacks.notify(MessageRoom.events.onMessage, roomMessage);
      this.soundsService.playMessageNew()
    })
  }

}
