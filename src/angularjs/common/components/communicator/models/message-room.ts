import { BusinessRoom, protocol, roomEvents, chatEvents } from 'ratel-sdk-js';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs';

export class MessageRoom {

  private static readonly customMessageTag = 'MESSAGE';

  private readonly messageEvent = new Subject<roomEvents.CustomMessageSent>();
  private readonly typingEvent = new Subject<roomEvents.TypingSent>();
  private readonly markEvent = new Subject<roomEvents.MarkSent>();

  constructor(private room: BusinessRoom) {
    room.typing$.subscribe((ev) => this.typingEvent.next(ev));
    room.marked$.subscribe((ev) => this.markEvent.next(ev));
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

  public getHistory = (offset: number, limit: number, filter?: protocol.HistoryFilter):
    Promise<protocol.Paginated<roomEvents.RoomEvent>> =>
      this.room.getMessages(offset, limit, filter)

  public getUsers = (): Promise<ReadonlyArray<protocol.ID>> =>
    this.room.getUsers()

  public indicateTyping = (): Promise<void> =>
    this.room.indicateTyping()

  public sendMessage = (msg: string, context: protocol.Context): Promise<chatEvents.Received> =>
      this.room.sendCustom(msg, MessageRoom.customMessageTag, context)

  public mark = (timestamp: protocol.Timestamp): Promise<void> =>
    this.room.setMark(timestamp)

  public join = (room: BusinessRoom): Promise<void> =>
    room.join()

  private onCustomMessage = (msg: roomEvents.CustomMessageSent): void =>
    this.messageEvent.next(msg)
}
