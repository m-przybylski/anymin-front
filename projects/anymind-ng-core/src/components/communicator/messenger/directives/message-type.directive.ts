import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { roomEvents } from 'machoke-sdk';
import { ILocalMessage, LOCAL_MESSAGE_TYPE } from '../maximized/maximized.models';

@Directive({
  selector: '[messageType]',
})
export class MessageTypeDirective implements OnInit {
  @Input('messageType') public message?: roomEvents.CustomMessageSent | ILocalMessage;

  constructor(private element: ElementRef) {}

  public ngOnInit(): void {
    if (this.message !== undefined) {
      this.element.nativeElement.classList.add(this.getMessageTypeClass(this.message));
    }
  }

  private getMessageTypeClass = (message: roomEvents.CustomMessageSent | ILocalMessage): string => {
    if (this.isPendingImage(message)) {
      return 'message--pending-image';
    } else if (!this.isLocalMessage(message) && message.context.description !== undefined) {
      switch (message.context.mimeType) {
        case 'image/jpeg':
          return 'message--image';
        case 'image/png':
          return 'message--image';
        default:
          return 'message--file';
      }
    }

    return 'message--text';
  };

  private isPendingImage(msg: roomEvents.CustomMessageSent | ILocalMessage): boolean {
    if (this.isLocalMessage(msg)) {
      return msg.type === LOCAL_MESSAGE_TYPE.IMAGE;
    }

    return false;
  }

  private isLocalMessage(msg: ILocalMessage | roomEvents.CustomMessageSent): msg is ILocalMessage {
    return msg.hasOwnProperty('resendMessage');
  }
}
