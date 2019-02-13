import { from, Observable, of, throwError } from 'rxjs';
import { catchError, map, switchMap, take } from 'rxjs/operators';
import { protocol, roomEvents } from 'machoke-sdk';
import { LoggerFactory } from '@anymind-ng/core';
import { Logger } from '@platform/core/logger';
import { Injectable } from '@angular/core';
import { CallSessionService } from '@platform/core/services/call/call-session.service';

@Injectable()
export class ActivityDetailsService extends Logger {
  private readonly chatHistoryLimit = 500;
  private readonly customMessageTag = 'room_custom_message_sent';

  constructor(private callSessionService: CallSessionService, loggerFactory: LoggerFactory) {
    super(loggerFactory.createLoggerService('ActivityDetailsService'));
  }

  public getChatHistory(ratelRoomId: string): Observable<ReadonlyArray<ReadonlyArray<roomEvents.CustomMessageSent>>> {
    const session = this.callSessionService.getCallSession();
    if (session) {
      return from(session.machoke.getRoom(ratelRoomId)).pipe(
        take(1),
        switchMap(room => from(room.getMessages(0, this.chatHistoryLimit))),
        map(messages => this.onGetMessages(messages)),
        catchError(err => {
          this.loggerService.warn('error when try to get chat history', err);

          return throwError(err);
        }),
      );
    }

    return of([]);
  }

  private onGetMessages(
    messages: protocol.Paginated<roomEvents.RoomEvent>,
  ): ReadonlyArray<ReadonlyArray<roomEvents.CustomMessageSent>> {
    const filteredMessages = messages.items
      .filter(message => this.isRoomEventsCustomMessageSent(message))
      .map(customMessage => customMessage as roomEvents.CustomMessageSent)
      .filter(message => this.isCustomMessage(message));

    return this.addGroupedMessage(filteredMessages);
  }

  private isRoomEventsCustomMessageSent(event: roomEvents.RoomEvent): event is roomEvents.CustomMessageSent {
    return event.tag === roomEvents.CustomMessageSent.tag;
  }

  private isCustomMessage(message: roomEvents.CustomMessageSent): boolean {
    return message.tag === this.customMessageTag;
  }

  /**
   * method for grouping messages from the same author into array
   * @param messages - array of chat messages
   * @return array of grouped messages
   */
  private addGroupedMessage(
    messages: ReadonlyArray<roomEvents.CustomMessageSent>,
  ): ReadonlyArray<ReadonlyArray<roomEvents.CustomMessageSent>> {
    return messages.reduce(
      (acc, message) => {
        if (acc.length === 0) {
          return [[message]];
        }

        const [head, ...tail] = [...acc].reverse();
        if (this.isTheSameMessageAuthor(head[0], message)) {
          return [head.concat(message), ...tail].reverse();
        }

        return [...acc, [message]];
      },
      [] as ReadonlyArray<ReadonlyArray<roomEvents.CustomMessageSent>>,
    );
  }

  private isTheSameMessageAuthor(
    lastMessage: roomEvents.CustomMessageSent,
    message: roomEvents.CustomMessageSent,
  ): boolean {
    return lastMessage.authorId === message.authorId;
  }
}
