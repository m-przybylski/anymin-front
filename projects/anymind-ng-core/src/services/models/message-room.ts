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
    room.getCustomMessageStream(MessageRoom.customMessageTag).subscribe(msg => this.onCustomMessage(msg));
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

  public getHistory(offset: number, limit: number, filter?: HistoryFilter): Promise<Paginated<roomEvents.RoomEvent>> {
    return this.room.getMessages(offset, limit, filter);
  }

  public getUsers(): Promise<ReadonlyArray<ID>> {
    return this.room.getUsers();
  }

  public indicateTyping(): void {
    return this.room.indicateTyping();
  }

  public sendMessage(msg: string, context: Context): Observable<chatEvents.Received> {
    return this.room.sendCustom(msg, MessageRoom.customMessageTag, context);
  }

  public mark(timestamp: Timestamp): void {
    return this.room.setMark(timestamp);
  }

  public join(room: BusinessRoom): Promise<void> {
    return room.join();
  }

  private onCustomMessage(msg: roomEvents.CustomMessageSent): void {
    return this.messageEvent.next(msg);
  }
}
