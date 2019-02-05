import { roomEvents } from 'machoke-sdk';
import { ILocalMessage, isLocalMessage, LOCAL_MESSAGE_TYPE } from '../maximized/maximized.models';

export class MessagesUtils {
  public static isPendingImage(msg: roomEvents.CustomMessageSent | ILocalMessage): boolean {
    if (isLocalMessage(msg)) {
      return msg.type === LOCAL_MESSAGE_TYPE.IMAGE;
    }

    return false;
  }

  public static isImage(msg: roomEvents.CustomMessageSent): boolean {
    if (typeof msg.context !== 'undefined') {
      return msg.context.mimeType.indexOf('image') !== -1;
    }

    return false;
  }

  public static isPdf(msg: roomEvents.CustomMessageSent): boolean {
    if (typeof msg.context !== 'undefined') {
      return msg.context.mimeType.indexOf('pdf') !== -1;
    }

    return false;
  }

  public static isFile(msg: roomEvents.CustomMessageSent): boolean {
    if (typeof msg.context !== 'undefined') {
      return (
        msg.context.description !== undefined &&
        msg.context.mimeType.indexOf('image') === -1 &&
        msg.context.mimeType.indexOf('pdf') === -1
      );
    }

    return false;
  }
}
