import { Pipe, PipeTransform, Inject } from '@angular/core';
// tslint:disable-next-line:import-blacklist
import { uniq } from 'lodash';
import { roomEvents } from 'machoke-sdk';
import {
  ILocalMessage,
  isLocalMessage,
  LOCAL_MESSAGE_STATE,
} from '../../../components/communicator/messenger/maximized/maximized.models';
import { LoggerService } from '../../../services/logger.service';
import { CORE_CONFIG } from '../../injection-tokens/injection-tokens';
import { CoreConfig } from '../../../core-config';

@Pipe({ name: 'message' })
export class MessagePipe implements PipeTransform {
  private readonly anchorTagRegex: RegExp = /\<a.*\<\/a\>/;

  constructor(@Inject(CORE_CONFIG) private coreConfig: CoreConfig, private logger: LoggerService) {}

  public hasImageUrl = (text: string): RegExpMatchArray | null => {
    const imageRegexp = /([/|.|\w|\s])*\.(?:jpg|gif|png)/;

    return text.match(imageRegexp);
  };

  public getUrls = (text: string): RegExpMatchArray | null => {
    const urlRegexp = /(((https?|ftp):\/\/)|(www\.))[^\s$.?#].[^\s]*\.[^\s$.?#].[^\s]*/g;

    return uniq(text.match(urlRegexp) || []);
  };

  public getCorrectUrl = (url: string): string => {
    const correctUrlRegexp = /^(https?|ftp):\/\/[^\s$.?#].[^\s]*$/;
    if (!url.match(correctUrlRegexp)) {
      // tslint:disable-next-line: no-parameter-reassignment
      url = `http://${url}`;
    }

    return url;
  };

  public handleMessage = (message: roomEvents.CustomMessageSent): string => {
    switch (message.context.mimeType) {
      case 'image/png':
        return this.handleImageMessage(message);
      case 'image/jpeg':
        return this.handleImageMessage(message);
      default:
        return this.handleTextMessage(message);
    }
  };

  public transform(message: roomEvents.CustomMessageSent | ILocalMessage): string {
    if (isLocalMessage(message)) {
      switch (message.sendState) {
        case LOCAL_MESSAGE_STATE.TYPING:
          return `<span class="typing-dot"></span><span class="typing-dot"></span><span class="typing-dot"></span>`;
        default:
          return message.messageBody.message;
      }
    } else {
      if (message) {
        return this.handleMessage(message);
      } else {
        this.logger.error('Expected Message object but got:', typeof message);

        return '';
      }
    }
  }

  private hasAnchorTag(text: string): boolean {
    return this.anchorTagRegex.test(text);
  }

  private handleImageMessage = (message: roomEvents.CustomMessageSent): string => {
    const fileUrl: string = this.getCorrectUrl(this.resolveFileUrl(message.context.content));

    return (
      `<img class="message-image" src="${fileUrl}"/><a href="${fileUrl}" target="_blank">` +
      `<span class="icon icon-download"></span></a>`
    );
  };

  private handleTextMessage = (message: roomEvents.CustomMessageSent): string => {
    const messageContext = message.context;
    const messageUrls = this.getUrls(messageContext.content);

    if (messageContext.description && messageContext.description.length > 0) {
      const fileUrl: string = this.resolveFileUrl(messageContext.content);

      return (
        `<a href="${fileUrl}" target="_blank" class="message__download"><span class="icon icon-download-file"></span>` +
        `<span href="${fileUrl}" target="_blank" class="file">${messageContext.description} </span></a>`
      );
    }

    if (messageUrls && messageUrls.length > 0 && !this.hasAnchorTag(messageContext.content)) {
      messageUrls.forEach(url => {
        if (this.hasImageUrl(url)) {
          const messageWithImgUrl = messageContext.content.replace(
            url,
            `<a href="${this.getCorrectUrl(url)}" target="_blank"><img src="${this.getCorrectUrl(url)}"/></a>`,
          );

          return (messageContext.content = messageWithImgUrl);
        }
        const messageWithUrl = messageContext.content.replace(
          url,
          `<a class="message-link" href="${this.getCorrectUrl(url)}" target="_blank">${url}</a>`,
        );

        return (messageContext.content = messageWithUrl);
      });
    }

    return messageContext.content;
  };

  private resolveFileUrl = (fileId: string): string =>
    this.coreConfig.urls.files + this.coreConfig.urls.filePreviewDownload.replace('%s', fileId);
}
