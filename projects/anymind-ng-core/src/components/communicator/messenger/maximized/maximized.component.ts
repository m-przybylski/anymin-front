import { Input, ElementRef, Component, OnInit, ViewChild, OnDestroy, ViewEncapsulation } from '@angular/core';
import { throttle } from 'lodash';
// tslint:disable:readonly-array
import {
  ILocalMessage,
  IMessageContext,
  isLocalMessage,
  LOCAL_MESSAGE_STATE,
  LOCAL_MESSAGE_TYPE,
  messageSubtag,
} from './maximized.models';
import { takeUntil } from 'rxjs/operators';
import { GetProfile, MoneyDto, PostFileDetails, GetExpertSueDetails } from '@anymind-ng/api';
import { Observable, Subject } from 'rxjs';
import { roomEvents, chatEvents, Session } from 'machoke-sdk';
import { IUploadFileInfo } from '../../../../services/uploader/uploader.service';
import { CurrentClientCall } from '../../../../services/call/current-client-call';
import { MessageRoom } from '../../../../services/models/message-room';
import { LoggerService } from '../../../../services/logger.service';
import { MaximizedComponentService } from './maximized.component.service';
import { CurrentExpertCall } from '../../../../services/call/current-expert-call';
import { UrlService } from '../../../../services/url/url.service';

@Component({
  selector: 'am-core-messenger-maximized',
  templateUrl: 'maximized.component.html',
  styleUrls: ['maximized.component.sass'],
  providers: [MaximizedComponentService],
  encapsulation: ViewEncapsulation.None,
})

// tslint:disable:max-file-line-count
export class MessengerMaximizedComponent implements OnInit, OnDestroy {
  public static readonly animationTimeout = 300;

  public callCost: MoneyDto;
  public isMessengerValue: boolean;
  public beforeAnimation = true;
  public errorText = '';

  @Input()
  public set isMessenger(val: boolean) {
    if (val) {
      this.maximizedComponentService.resetMessages();
    }

    this.beforeAnimation = !val;
    setTimeout(() => {
      this.isMessengerValue = val;
    }, MessengerMaximizedComponent.animationTimeout);
  }

  @Input()
  public minimizeMessenger: () => void;

  @Input()
  public newCallEvent: Observable<CurrentClientCall>;

  @ViewChild('chat')
  public chatContainer: ElementRef;

  public participantAvatar = '';
  public mineAvatar = '';
  public isTyping = false;
  public groupedMessages: (roomEvents.CustomMessageSent | ILocalMessage)[][] = [];
  public typingMessage: ReadonlyArray<ILocalMessage> = [];
  public uploadedFile: {
    progress?: boolean;
    file?: File;
  } = {};
  public isFileUploadError = false;
  public isFileStatusError = false;
  public indicateTypingDebounce: () => void;
  public participantName: string;

  private readonly maximumImageNameLength = 15;
  private readonly localMessagePendingTimeout = 1000;

  private messageRoom: MessageRoom;
  private indicateTypingDebounceTimeout = 1000;
  private typingTimeout = 2000;
  private fileUploadErrorMessageTimeout = 15000;
  private postProcessOptions: PostFileDetails = { fileType: PostFileDetails.FileTypeEnum.CHAT };

  private messageId = 0;
  private typingMessageId: number;
  private ngUnsubscribe$ = new Subject<void>();
  private session?: Session;

  constructor(private maximizedComponentService: MaximizedComponentService, private logger: LoggerService) {}

  public ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

  public ngOnInit(): void {
    this.maximizedComponentService
      .session$()
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe(session => {
        this.session = session;
      });

    this.newCallEvent
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe(currentClientCall => this.onNewCall(currentClientCall));

    this.typingMessage = [
      {
        resendMessage: (): void => undefined,
        messageId: this.typingMessageId,
        sendState: LOCAL_MESSAGE_STATE.TYPING,
        messageBody: {
          message: '',
          subtag: messageSubtag,
        },
      },
    ];
  }

  public onUploadFiles(file: File): void {
    this.isFileUploadError = false;
    this.isFileStatusError = false;
    this.uploadedFile.file = file;
    this.uploadedFile.progress = true;

    const id = this.generateId();
    const localMessage: ILocalMessage = {
      messageId: id,
      messageBody: {
        message: file.name.slice(0, this.maximumImageNameLength),
        subtag: messageSubtag,
      },
      type: LOCAL_MESSAGE_TYPE.IMAGE,
      sendState: LOCAL_MESSAGE_STATE.SENDED,
      resendMessage: this.resendMessage(id, file.name),
    };
    this.addGroupedMessage(localMessage);
    this.uploadFile(file)
      .then(message => {
        this.logger.debug('Fileupload:', message);
        if (typeof message !== 'undefined') {
          this.swapMessages(id, message);
        }
      })
      .catch(err => {
        this.onFileUploadError();
        this.removeGroupedMessage(localMessage);
        this.logger.error('MaximizedComponent: fileupload error:', err);
      });
  }

  public uploadAgain(): void {
    if (this.uploadedFile.file !== undefined) {
      this.onUploadFiles(this.uploadedFile.file);
    }
  }

  public onSendMessage(messageText: string): Promise<void> {
    const id = this.generateId();
    const localMessage: ILocalMessage = {
      messageId: id,
      messageBody: {
        context: {
          mimeType: 'text/plain',
          content: messageText,
        },
        message: messageText,
        subtag: messageSubtag,
      },
      sendState: LOCAL_MESSAGE_STATE.SENDED,
      resendMessage: this.resendMessage(id, messageText),
    };
    this.addGroupedMessage(localMessage);

    setTimeout(() => (localMessage.sendState = LOCAL_MESSAGE_STATE.PENDING), this.localMessagePendingTimeout);

    return this.sendMessage(messageText, {
      mimeType: 'text/plain',
      content: messageText,
    }).then((message: chatEvents.Received | undefined) => {
      if (typeof message !== 'undefined') {
        this.swapMessages(id, message);
      }
    });
  }

  public onUploadFileError(error: string): void {
    this.isFileStatusError = true;
    this.errorText = error;
    setTimeout(() => {
      this.isFileStatusError = false;
    }, this.fileUploadErrorMessageTimeout);
  }

  public sendMessage(messageObject: string, context: IMessageContext): Promise<chatEvents.Received> {
    return this.messageRoom
      .sendMessage(messageObject, context)
      .toPromise()
      .catch(err => this.onMessageSendError(err));
  }

  private addGroupedMessage(message: roomEvents.CustomMessageSent | ILocalMessage): void {
    if (this.groupedMessages.length === 0) {
      this.groupedMessages.push([message]);
    } else {
      const lastMessageGroup = this.groupedMessages[this.groupedMessages.length - 1];
      const headMsg = lastMessageGroup[0];
      if (isLocalMessage(message)) {
        this.addLocalMessage(message, headMsg, lastMessageGroup);
      } else if (headMsg && !isLocalMessage(headMsg) && headMsg.authorId === message.authorId) {
        lastMessageGroup.push(message);
      } else {
        this.groupedMessages.push([message]);
      }
    }
    this.scrollToBottom();
  }
  private removeGroupedMessage(localMsg: ILocalMessage): void {
    const idToRemove = localMsg.messageId;
    this.groupedMessages.forEach(groupedMessages => {
      const messageFound = groupedMessages.find(message => message.messageId === idToRemove);
      if (messageFound) {
        groupedMessages.splice(groupedMessages.indexOf(messageFound), 1);
      }
    });
  }

  // tslint:disable-next-line:cyclomatic-complexity
  private addLocalMessage(
    message: ILocalMessage,
    headMsg: ILocalMessage | roomEvents.CustomMessageSent | undefined,
    lastMessageGroup: (roomEvents.CustomMessageSent | ILocalMessage)[],
  ): void {
    if (
      (headMsg && isLocalMessage(headMsg)) ||
      (headMsg && !isLocalMessage(headMsg) && this.session && headMsg.authorId === this.session.id)
    ) {
      lastMessageGroup.push(message);
    } else {
      this.groupedMessages.push([message]);
    }
  }

  private resendMessage(id: number, messageBody: string): () => Promise<void> {
    return (): Promise<void> => {
      this.groupedMessages = this.removeMessage(id);

      return this.onSendMessage(messageBody);
    };
  }

  private removeMessage(id: number): (roomEvents.CustomMessageSent | ILocalMessage)[][] {
    return this.groupedMessages.map(value => value.filter(element => element.messageId !== id));
  }

  private onNewCall(call: CurrentClientCall | CurrentExpertCall): void {
    this.isClientCall(call) ? this.clientInit(call.getExpert()) : this.expertInit(call.getExpertSueDetails());
    call.messageRoom$.pipe(takeUntil(this.ngUnsubscribe$)).subscribe(messageRoom => {
      messageRoom.message$.pipe(takeUntil(this.ngUnsubscribe$)).subscribe(customMessage => {
        this.addMessage(customMessage, this.session);
      });
      messageRoom.typing$.pipe(takeUntil(this.ngUnsubscribe$)).subscribe(() => this.onTyping());
      this.messageRoom = messageRoom;
      this.indicateTypingDebounce = throttle(this.messageRoom.indicateTyping, this.indicateTypingDebounceTimeout, {
        leading: true,
        trailing: false,
      });
    });
  }

  private isClientCall(call: CurrentClientCall | CurrentExpertCall): call is CurrentClientCall {
    return 'answered$' in call;
  }

  private expertInit(expertSueDetails: GetExpertSueDetails): void {
    this.participantAvatar =
      typeof expertSueDetails.clientDetails.avatar !== 'undefined'
        ? UrlService.resolveFileUrl(expertSueDetails.clientDetails.avatar)
        : '';

    this.participantName =
      typeof expertSueDetails.clientDetails.nickname !== 'undefined'
        ? expertSueDetails.clientDetails.nickname
        : 'COMMUNICATOR.CHAT_HEADER_ANONYMOUS_CALLER';

    this.mineAvatar =
      typeof (expertSueDetails.expertAvatar as string | undefined) !== 'undefined'
        ? UrlService.resolveFileUrl(expertSueDetails.expertAvatar)
        : '';
  }

  private clientInit(expert: GetProfile): void {
    const details = expert;
    this.mineAvatar = '';
    this.participantAvatar = details && details.avatar ? UrlService.resolveFileUrl(details.avatar) : '';
    this.participantName = details ? details.name : '';
  }

  private onTypingEnd(): void {
    this.isTyping = false;
  }

  private addMessage(msg: roomEvents.CustomMessageSent, session?: Session): void {
    if (!this.isMessengerValue) {
      this.maximizedComponentService.addUnseenMessage();
    }
    if (!!session && msg.authorId !== session.id) {
      this.addGroupedMessage(msg);
    }
    this.onTypingEnd();
  }

  private onUploadProgress(data: IUploadFileInfo): void {
    this.logger.debug(data);
  }

  private onFileUpload(res: any): Promise<chatEvents.Received | void> {
    this.uploadedFile.progress = false;

    return this.sendMessage(res.name, {
      mimeType: res.contentType,
      content: res.token,
      description: res.name,
    });
  }

  private onFileUploadError(): void {
    this.uploadedFile.progress = false;
    this.isFileUploadError = true;
    setTimeout(() => {
      this.isFileUploadError = false;
    }, this.fileUploadErrorMessageTimeout);
  }

  private uploadFile(file: File): Promise<chatEvents.Received | void> {
    return this.maximizedComponentService
      .uploadFile(file, this.postProcessOptions, data => this.onUploadProgress(data))
      .then(res => this.onFileUpload(res));
  }

  private generateId(): number {
    const id = this.messageId;
    this.messageId++;

    return id;
  }

  private onTyping(): void {
    this.isTyping = true;
    this.scrollToBottom();
    setTimeout(() => this.onTypingEnd(), this.typingTimeout);
  }

  private onMessageSendError(err?: any): never {
    this.logger.error('MaximizedComponent: msg send err:', JSON.stringify(err));
    throw err;
  }

  private swapMessages(id: number, message: chatEvents.Received): void {
    this.groupedMessages.forEach((value, index) => {
      if (value.findIndex(groupedMessage => groupedMessage.messageId === id) !== -1) {
        const indexOfAllMessages = value.findIndex(value2 => value2.messageId === id);
        this.groupedMessages[index][indexOfAllMessages] = this.mapNormalizeEventToCustomMessage(message);
      }
    });
  }

  private scrollToBottom(): void {
    setTimeout(() => {
      this.chatContainer.nativeElement.scrollTop =
        this.chatContainer.nativeElement.scrollHeight - this.chatContainer.nativeElement.clientHeight;
    }, 0);
  }

  private mapNormalizeEventToCustomMessage(receivedMessage: chatEvents.Received): roomEvents.CustomMessageSent {
    return new roomEvents.CustomMessageSent(
      receivedMessage.message.channelId,
      receivedMessage.message.authorId,
      receivedMessage.message.data.message,
      receivedMessage.message.id,
      messageSubtag,
      receivedMessage.message.data.context,
      receivedMessage.message.timestamp,
    );
  }
}
