import { roomEvents } from 'machoke-sdk';

export const messageSubtag = 'MESSAGE';

export interface IMessageContext {
  mimeType: string;
  content: string;
  description?: string;
}

export enum LOCAL_MESSAGE_STATE {
  SENDED,
  PENDING,
  FAILED,
  TYPING,
}

export enum LOCAL_MESSAGE_TYPE {
  IMAGE,
}

export interface IAnymindCustomMessage {
  context?: IMessageContext;
  message: string;
  subtag: 'MESSAGE';
}

export interface ILocalMessage {
  messageId: number;
  messageBody: IAnymindCustomMessage;
  sendState: LOCAL_MESSAGE_STATE;
  type?: LOCAL_MESSAGE_TYPE;
  // tslint:disable-next-line:no-mixed-interface
  resendMessage(): void;
}

// tslint:disable:no-unbound-method
// tslint:disable:strict-type-predicates
// tslint:disable:only-arrow-functions
export function isLocalMessage(message: roomEvents.CustomMessageSent | ILocalMessage): message is ILocalMessage {
  return typeof (message as ILocalMessage).resendMessage !== 'undefined';
}
