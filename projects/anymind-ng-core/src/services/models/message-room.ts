import { Paginated, HistoryFilter, Context, ID, Timestamp } from 'machoke-sdk/dist/protocol/protocol';
import { roomEvents, BusinessRoom } from 'machoke-sdk';
import { Subject, Observable } from 'rxjs';
import { chatEvents } from 'machoke-sdk/dist/protocol/events/chat-events';

export class MessageRoom {
  private static readonly customMessageTag = 'MESSAGE';
  private readonly messageEvent = new Subject<roomEvents.CustomMessageSent>();
  private readonly typingEvent = new Subject<roomEvents.TypingSent>();
  private readonly markEvent = new Subject<roomEvents.MarkSent>();

  constructor(private room: BusinessRoom) {
    room.typing$.subscribe(ev => this.typingEvent.next(ev));
    room.marked$.subscribe(ev => this.markEvent.next(ev));
    room.getCustomMessageStream(MessageRoom.customMessageTag).subscribe(this.onCustomMessage);
  }

  public get message$(): Observable<roomEvents.CustomMessageSent> {
    return this.messageEvent;
  }

  public get typing$(): Observable<roomEvents.TypingSent> {
    return this.typingEvent;
  }

  public get mark$(): Observable<roomEvents.MarkSent> {
    return this.markEvent;
  }

  public getHistory = (
    offset: number,
    limit: number,
    filter?: HistoryFilter,
  ): Promise<Paginated<roomEvents.RoomEvent>> => this.room.getMessages(offset, limit, filter);

  public getUsers = (): Promise<ReadonlyArray<ID>> => this.room.getUsers();

  public indicateTyping = (): void => this.room.indicateTyping();

  public sendMessage = (msg: string, context: Context): Observable<chatEvents.Received> =>
    this.room.sendCustom(msg, MessageRoom.customMessageTag, context);

  public mark = (timestamp: Timestamp): void => this.room.setMark(timestamp);

  public join = (room: BusinessRoom): Promise<void> => room.join();

  private onCustomMessage = (msg: roomEvents.CustomMessageSent): void => this.messageEvent.next(msg);
}
