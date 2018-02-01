import { Message, BusinessRoom } from 'ratel-sdk-js';
import { Paginated, HistoryFilter, Context, ID, Timestamp } from 'ratel-sdk-js/dist/protocol/protocol';
import { RoomTyping, RoomMark } from 'ratel-sdk-js/dist/protocol/events';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

export class MessageRoom {

  private readonly messageEvent = new Subject<Message>();
  private readonly typingEvent = new Subject<RoomTyping>();
  private readonly markEvent = new Subject<RoomMark>();

  constructor(private room: BusinessRoom) {
    room.onTyping((ev) => this.typingEvent.next(ev));
    room.onMarked((ev) => this.markEvent.next(ev));
    room.onCustom('MESSAGE', (ev) => this.messageEvent.next(ev));
  }

  public get message$(): Observable<Message> {
    return this.messageEvent;
  }

  public get typing$(): Observable<RoomTyping> {
    return this.typingEvent;
  }

  public get mark$(): Observable<RoomMark> {
    return this.markEvent;
  }

  public getHistory = (offset: number, limit: number, filter?: HistoryFilter):
    Promise<Paginated<Message>> =>
      this.room.getMessages(offset, limit, filter)

  public getUsers = (): Promise<ID[]> =>
    this.room.getUsers()

  public indicateTyping = (): Promise<void> =>
    this.room.indicateTyping()

  public sendMessage = (msg: string, context: Context): Promise<Message> =>
      this.room.sendCustom(msg, 'MESSAGE', context)

  public mark = (timestamp: Timestamp): Promise<void> =>
    this.room.setMark(timestamp)

  public join = (room: BusinessRoom): Promise<void> =>
    room.join()
}
