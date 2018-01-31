import * as RatelSdk from 'ratel-sdk-js';
import { SoundsService } from '../../../services/sounds/sounds.service';
import { Message } from 'ratel-sdk-js';
import { Paginated } from 'ratel-sdk-js/dist/protocol/protocol';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';

// tslint:disable:member-ordering
export class MessageRoom {

  private static readonly chatHistoryLimit: number = 200;
  public room?: RatelSdk.BusinessRoom;

  private readonly events = {
    onTyping: new Subject<void>(),
    onMark: new Subject<RatelSdk.events.RoomMark>(),
    onMessage: new Subject<RatelSdk.Message>()
  };

  public static $inject = ['soundsService'];

  constructor(private soundsService: SoundsService) {
  }

  public getHistory = (): Promise<Paginated<Message>> => {
    if (this.room) {
      return this.room.getMessages(0, MessageRoom.chatHistoryLimit);
    } else {
      return Promise.reject('No room');
    }
  }

  public getUsers = (): Promise<RatelSdk.protocol.ID[]> => {
    if (this.room) {
      return this.room.getUsers();
    } else {
      return Promise.reject('No room');
    }
  }

  public indicateTyping = (): Promise<void> => {
    if (this.room) {
      return this.room.indicateTyping();
    } else {
      return Promise.reject('No room');
    }
  }

  public sendMessage = (msg: string, context: RatelSdk.protocol.Context): Promise<RatelSdk.Message> => {
    if (this.room) {
      return this.room.sendCustom(msg, 'MESSAGE', context);
    } else {
      return Promise.reject('No room');
    }
  }

  public mark = (timestamp: RatelSdk.protocol.Timestamp): Promise<void> => {
    if (this.room) {
      return this.room.setMark(timestamp);
    } else {
      return Promise.reject('No room');
    }
  }

  public setRoom = (room: RatelSdk.BusinessRoom): void => {
    this.room = room;
    this.registerRoomEvent(room);
  }

  public joinRoom = (room: RatelSdk.BusinessRoom): Promise<void> => {
    if (!this.room) {
      this.setRoom(room);
      return room.join();
    }
    else {
      throw new Error('Room already set');
    }
  }

  public onTyping = (cb: () => void): Subscription =>
    this.events.onTyping.subscribe(cb)

  public onMark = (cb: (roomMark: RatelSdk.events.RoomMark) => void): Subscription =>
    this.events.onMark.subscribe(cb)

  public onMessage = (cb: (msg: RatelSdk.Message) => void): Subscription =>
    this.events.onMessage.subscribe(cb)

  private registerRoomEvent = (room: RatelSdk.BusinessRoom): void => {
    room.onTyping(() => this.events.onTyping.next());
    room.onMarked((roomMark) => this.events.onMark.next(roomMark));
    room.onCustom('MESSAGE', (roomMessage) => {
      this.events.onMessage.next(roomMessage);
      this.soundsService.playMessageNew();
    });
  }

}
