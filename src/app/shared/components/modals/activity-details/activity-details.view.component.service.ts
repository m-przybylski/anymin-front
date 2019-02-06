import { ActivitiesService, GetComment, ViewsService } from '@anymind-ng/api';
import { Injectable } from '@angular/core';
import { map, catchError, take, switchMap } from 'rxjs/operators';
import { GetCallDetails } from '@anymind-ng/api/model/getCallDetails';
import { CommunicatorService, LoggerFactory } from '@anymind-ng/core';
import { Logger } from '@platform/core/logger';
import { EMPTY, Observable, from } from 'rxjs';
import { FileUrlResolveService } from '@platform/shared/services/file-url-resolve/file-url-resolve.service';
import { roomEvents, protocol } from 'machoke-sdk';
import { ISueDetails } from '@platform/shared/components/modals/activity-details/sue-details/sue-details.component';

@Injectable()
export class ActivityDetailsViewComponentService extends Logger {
  private readonly chatHistoryLimit = 500;
  private readonly customMessageTag = 'room_custom_message_sent';

  constructor(
    private viewsService: ViewsService,
    private activitiesService: ActivitiesService,
    private communicatorService: CommunicatorService,
    private fileUrlService: FileUrlResolveService,
    loggerFactory: LoggerFactory,
  ) {
    super(loggerFactory.createLoggerService('ActivityDetailsViewComponentService'));
  }

  public getCallDetails = (sueId: string, accountId: string): Observable<ISueDetails> =>
    this.viewsService.getDashboardCallDetailsRoute(sueId).pipe(
      map((callDetails: GetCallDetails) => ({
        sueId,
        serviceName: callDetails.service.name,
        clientName: callDetails.clientDetails.nickname,
        clientAvatarUrl: this.fileUrlService.getFilePreviewDownloadUrl(callDetails.clientDetails.avatar),
        expertAvatarUrl:
          typeof callDetails.expertProfile.expertDetails !== 'undefined'
            ? this.fileUrlService.getFilePreviewDownloadUrl(callDetails.expertProfile.expertDetails.avatar)
            : '',
        answeredAt: callDetails.serviceUsageDetails.answeredAt,
        callDuration: callDetails.serviceUsageDetails.callDuration,
        servicePrice: callDetails.service.price,
        recommendedTags: callDetails.recommendedTags.map(tag => tag.name).join(', '),
        isSueExpert: accountId === callDetails.expertProfile.id,
        expertName:
          typeof callDetails.expertProfile.expertDetails !== 'undefined'
            ? callDetails.expertProfile.expertDetails.name
            : '',
        financialOperation: callDetails.serviceUsageDetails.amount,
        rate: callDetails.rate,
        comment: this.getComment(callDetails),
      })),
    );

  public markActivityAsUnimportant = (activityId: string): Observable<void> =>
    this.activitiesService.putUnimportantProfileActivityRoute(activityId).pipe(
      catchError(err => {
        this.loggerService.warn('Error when try to mark activity as unimportant', err);

        return EMPTY;
      }),
    );

  public getChatHistory = (
    ratelRoomId: string,
  ): Observable<ReadonlyArray<ReadonlyArray<roomEvents.CustomMessageSent>>> =>
    this.communicatorService.connectionEstablishedEvent$.pipe(
      take(1),
      map(connected => connected.session),
      switchMap(session => from(session.machoke.getRoom(ratelRoomId))),
      switchMap(room => from(room.getMessages(0, this.chatHistoryLimit))),
      catchError(err => {
        this.loggerService.warn('error when try to get chat history', err);

        return EMPTY;
      }),
      map(this.onGetMessages),
    );

  private onGetMessages = (
    messages: protocol.Paginated<roomEvents.RoomEvent>,
  ): ReadonlyArray<ReadonlyArray<roomEvents.CustomMessageSent>> => {
    const filteredMessages = messages.items
      .filter(m => this.isRoomEventsCustomMessageSent(m))
      .map(m => m as roomEvents.CustomMessageSent)
      .filter(message => this.isCustomMessage(message));

    return this.addGroupedMessage(filteredMessages);
  };

  private isRoomEventsCustomMessageSent = (e: roomEvents.RoomEvent): e is roomEvents.CustomMessageSent =>
    e.tag === roomEvents.CustomMessageSent.tag;

  private isCustomMessage = (message: roomEvents.CustomMessageSent): boolean => message.tag === this.customMessageTag;

  /**
   * method for grouping messages from the same author into array
   * @param messages - array of chat messages
   * @return array of grouped messages
   */
  private addGroupedMessage = (
    messages: ReadonlyArray<roomEvents.CustomMessageSent>,
  ): ReadonlyArray<ReadonlyArray<roomEvents.CustomMessageSent>> =>
    messages.reduce(
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

  private isTheSameMessageAuthor = (
    lastMessage: roomEvents.CustomMessageSent,
    message: roomEvents.CustomMessageSent,
  ): boolean => lastMessage.authorId === message.authorId;

  private getComment = (callDetails: GetCallDetails): GetComment | undefined => {
    if (typeof callDetails.comment !== 'undefined') {
      return {
        commentId: callDetails.comment.commentId,
        content: callDetails.comment.content,
        expertId: callDetails.expertProfile.id,
        sueId: callDetails.serviceUsageDetails.serviceUsageEventId,
        answer: callDetails.comment.answer,
        report: callDetails.comment.report,
        callDurationInSeconds: callDetails.serviceUsageDetails.callDuration,
        clientDetails: callDetails.clientDetails,
        createdAt: callDetails.comment.createdAt,
      };
    }

    return undefined;
  };
}
