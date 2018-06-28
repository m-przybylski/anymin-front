// tslint:disable:strict-boolean-expressions
// tslint:disable:no-empty
// tslint:disable:no-any
import * as angular from 'angular';
import { LoggerService, CommunicatorService, IConnected } from '@anymind-ng/core';
// tslint:disable-next-line:import-blacklist
import * as _ from 'lodash';
import { IMessengerMaximizedComponentBindings } from './maximized';
import { PostFileDetails, MoneyDto } from 'profitelo-api-ng/model/models';
import { UploaderService } from '../../../../services/uploader/uploader.service';
import { UploaderFactory } from '../../../../services/uploader/uploader.factory';
import { MessageRoom } from '../../models/message-room';
import { ExpertCallService } from '../../call-services/expert-call.service';
import { CurrentCall } from '../../models/current-call';
import { ExpertCall } from '../../models/current-expert-call';
import { roomEvents } from 'ratel-sdk-js';
import { Paginated } from 'ratel-sdk-js/dist/protocol/protocol';
import { IMessageContext } from '../message-context';
import FileTypeEnum = PostFileDetails.FileTypeEnum;
import { Subject, Subscription } from 'rxjs';
import { takeWhile, takeUntil } from 'rxjs/operators';

export class MessengerMaximizedComponentController implements
  ng.IController, IMessengerMaximizedComponentBindings, ng.IOnDestroy {

  public static $inject = ['logger', '$timeout', '$element', 'expertCallService', 'communicatorService',
    'uploaderFactory'];
  public callCost: MoneyDto;
  public isMessenger: boolean;
  public minimizeMessenger: () => void;
  public callLength: number;
  public isLoading = true;

  public participantAvatar = '';
  public isTyping = false;
  public groupedMessages: roomEvents.CustomMessageSent[][] = [];
  public uploadedFile: {
    progress?: boolean,
    file?: File
  } = {};
  public isFileUploadError = false;

  public expertName = '';
  private readonly historyLimit = 10000;
  private messagesScroll = angular.element('.messenger-scroll');
  private indicateTypingDebounceTimeout = 1000;
  private typingTimeout = 2000;
  private fileUploadErrorMessageTimeout = 15000;
  private uploader: UploaderService;

  private messageRoom?: MessageRoom;
  private postProcessOptions: PostFileDetails = {
    croppingDetails: undefined,
    fileType: FileTypeEnum.CHAT
  };

  private ngUnsubscribe = new Subject<void>();

  constructor(private logger: LoggerService,
              private $timeout: ng.ITimeoutService,
              private $element: ng.IRootElementService,
              private expertCallService: ExpertCallService,
              private communicatorService: CommunicatorService,
              uploaderFactory: UploaderFactory) {

    this.uploader = uploaderFactory.getInstance();
    this.messagesScroll.perfectScrollbar();
    this.expertCallService.newCall$.pipe(takeUntil(this.ngUnsubscribe)).subscribe(this.expertInit);
    communicatorService.connectionLostEvent$.pipe(takeUntil(this.ngUnsubscribe)).subscribe(() => this.isLoading = true);
  }
  public indicateTypingDebounce = (): void => {};

  public $onDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  public $onChanges = (): void => {
    if (this.isMessenger) {
      angular.element(this.$element).find('.messenger-input input').focus();
    }
  }

  public onUploadFiles = (files: File[]): void => {
    this.isFileUploadError = false;
    angular.forEach(files, (file) => {
      this.uploadedFile.file = file;
      this.uploadedFile.progress = true;
      this.uploadFile(file);
    });
  }

  public uploadAgain = (): void =>
    this.onUploadFiles((this.uploadedFile.file) ? [this.uploadedFile.file] : [])

  public onSendMessage = (messageBody: string): void =>
    this.sendMessage(messageBody, {
      mimeType: 'text/plain',
      content: messageBody,
    })

  private handleRoomHistory = (messages: Paginated<roomEvents.CustomMessageSent>): void => {
      this.isLoading = false;
      this.groupedMessages = [];
      // to filter out room events
      const chatMessages: roomEvents.CustomMessageSent[] = messages.items.filter(message => message.tag === 'MESSAGE');
      this.logger.debug('MessengerMaximizedComponentController: received history messaged', chatMessages);
      chatMessages.forEach(this.addGroupedMessage);
  }

  private updateChatHistory = (messageRoom: MessageRoom): void => {
    this.isLoading = true;
    messageRoom.getHistory(0, this.historyLimit).then(
      this.handleRoomHistory,
      (err) => {
        this.logger.error('MessengerMaximizedComponentController: Could not load history messaged', err);
        this.isLoading = false;
      });
  }

  private onNewCall = (currentCall: CurrentCall): Subscription =>
    currentCall.messageRoom$.pipe(takeUntil(this.ngUnsubscribe)).subscribe((messageRoom) => {
      this.messageRoom = messageRoom;
      this.messageRoom.message$.subscribe(this.addMessage);
      this.messageRoom.typing$.subscribe(this.onTyping);
      currentCall.onTimeCostChange((data) => {
        this.callLength = data.time;
        this.callCost = data.money;
      });
      this.indicateTypingDebounce = _.throttle(this.messageRoom.indicateTyping, this.indicateTypingDebounceTimeout, {
        leading: true,
        trailing: false
      });
      // Because the call might be pulled, let's read room history
      this.updateChatHistory(messageRoom);
      // If there was a reconnection and message room remains the same, refresh the room history
      this.communicatorService.connectionEstablishedEvent$
        .pipe(takeUntil(this.ngUnsubscribe))
        .pipe(takeWhile((connected: IConnected) => connected.session === currentCall.getSession()))
        .pipe(takeWhile(() => this.messageRoom === messageRoom))
        .subscribe(() => this.updateChatHistory(messageRoom));
    })

  private expertInit = (currentExpertCall: ExpertCall): void => {
    this.participantAvatar = '';
    this.onNewCall(currentExpertCall);
  }

  private scrollMessagesBottom = (): void => {
    this.messagesScroll.perfectScrollbar('update');
    this.$timeout(() => {
      if (angular.element('grouped-messages .message:last-child img')) {
        angular.element('grouped-messages .message:last-child img').on('load', () => {
          this.messagesScroll.scrollTop(this.messagesScroll[0].scrollHeight);
          angular.element('grouped-messages .message:last-child img').off('load');
        });
      }
      this.messagesScroll.scrollTop(this.messagesScroll[0].scrollHeight);
    });
  }

  private addGroupedMessage = (message: roomEvents.CustomMessageSent): number => {
    if (this.groupedMessages.length === 0) {
      return this.groupedMessages.push([message]);
    } else {
      const lastMessageGroup = this.groupedMessages[this.groupedMessages.length - 1];
      const firstElementOfLastMessageGroup = _.head(lastMessageGroup);
      if (firstElementOfLastMessageGroup && firstElementOfLastMessageGroup.authorId === message.authorId) {
        return lastMessageGroup.push(message);
      } else {
        return this.groupedMessages.push([message]);
      }
    }
  }

  private onTypingEnd = (): void => {
    this.isTyping = false;
    this.$timeout(this.scrollMessagesBottom);
  }

  private addMessage = (msg: roomEvents.CustomMessageSent): void => {
    this.addGroupedMessage(msg);
    this.onTypingEnd();
  }

  private onMessageSendError = (err: any): void =>
    this.logger.error('MessengerMaximizedComponentController: msg send err:', err)

  private sendMessage = (messageObject: string, context: IMessageContext): void => {
    this.messageRoom ? this.messageRoom.sendMessage(messageObject, context).catch(this.onMessageSendError) :
      this.logger.error('MessengerMaximizedComponentController: Can not send message cause room does not exist');
  }

  private onUploadProgess = (res: any): void =>
    this.logger.debug('MessengerMaximizedComponentController: upload progress', res)

  private onFileUpload = (res: any): void => {
    this.uploadedFile.progress = false;
    this.sendMessage(res.name, {
      mimeType: res.contentType,
      content: res.token,
      description: res.name
    });
  }

  private onFileUploadError = (err: any): void => {
    this.logger.error(err);
    this.uploadedFile.progress = false;
    this.isFileUploadError = true;
    this.$timeout(() => {
      this.isFileUploadError = false;
    }, this.fileUploadErrorMessageTimeout);
  }

  private uploadFile = (file: File): ng.IPromise<void> =>
    this.uploader.uploadFile(file, this.postProcessOptions, this.onUploadProgess)
      .then(this.onFileUpload, this.onFileUploadError)

  private onTyping = (): void => {
    this.isTyping = true;
    this.scrollMessagesBottom();
    this.$timeout(this.onTypingEnd, this.typingTimeout);
  }
}
