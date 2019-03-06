import { Input, Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { roomEvents } from 'machoke-sdk';

import { ILocalMessage, isLocalMessage, LOCAL_MESSAGE_STATE } from '../maximized.models';
import { MessagesUtils } from '../../utils/messagesUtils';
import { CommunicatorService } from '../../../../../services/communicator.service';
import { LoggerService } from '../../../../../services/logger.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'am-core-grouped-messages',
  templateUrl: 'grouped-messages.component.html',
  styleUrls: ['grouped-messages.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class GroupedMessagesComponent implements OnInit, OnDestroy {
  @Input()
  public messages: ReadonlyArray<roomEvents.CustomMessageSent> = [];

  @Input()
  public participantAvatarUrl = '';

  @Input()
  public mineAvatarUrl = '';

  public isMine = false;

  public localMessageStates: typeof LOCAL_MESSAGE_STATE = LOCAL_MESSAGE_STATE;

  private ngDestroy$ = new Subject<void>();

  constructor(private communicatorService: CommunicatorService, private logger: LoggerService) {}

  public ngOnInit(): void {
    this.communicatorService.connectionEstablishedEvent$.pipe(takeUntil(this.ngDestroy$)).subscribe(connected => {
      const message = this.messages[0];

      if (message && isLocalMessage(message)) {
        this.isMine = message.sendState !== LOCAL_MESSAGE_STATE.TYPING;
      } else {
        if (message) {
          this.isMine = message.authorId === connected.session.id;
        }
      }
    });
  }

  public ngOnDestroy(): void {
    this.ngDestroy$.next();
    this.ngDestroy$.complete();
  }

  public isPendingImage(msg: roomEvents.CustomMessageSent | ILocalMessage): boolean {
    return MessagesUtils.isPendingImage(msg);
  }

  public isImage(msg: roomEvents.CustomMessageSent): boolean {
    return MessagesUtils.isImage(msg);
  }

  public isPdf(msg: roomEvents.CustomMessageSent): boolean {
    return MessagesUtils.isPdf(msg);
  }

  public isFile(msg: roomEvents.CustomMessageSent): boolean {
    return MessagesUtils.isFile(msg);
  }

  public resendMessage(message: roomEvents.CustomMessageSent | ILocalMessage): void {
    if (isLocalMessage(message)) {
      switch (message.sendState) {
        case LOCAL_MESSAGE_STATE.FAILED:
          message.resendMessage();
          break;
        default:
          this.logger.warn('Unhandled message sendState', message.sendState);
      }
    }
  }
}
