// tslint:disable:newline-before-return
import { roomEvents } from 'ratel-sdk-js';
import * as angular from 'angular';
// tslint:disable-next-line:import-blacklist
import * as _ from 'lodash';
import { UrlService } from '../../services/url/url.service';
import { LoggerService } from '@anymind-ng/core';

  function messageFilter(urlService: UrlService,
                         logger: LoggerService): (message: roomEvents.CustomMessageSent) => string {

    const hasImageUrl = (text: string): RegExpMatchArray | null => {
      const imageRegexp = /([/|.|\w|\s])*\.(?:jpg|gif|png)/;
      return text.match(imageRegexp);
    };

    const getUrls = (text: string): RegExpMatchArray | null => {
      const urlRegexp = /(((https?|ftp):\/\/)|(www\.))[^\s$.?#].[^\s]*\.[^\s$.?#].[^\s]*/g;
      return _.uniq(text.match(urlRegexp) || []);
    };

    const getCorrectUrl = (url: string): string => {
      const correctUrlRegexp = /^(https?|ftp):\/\/[^\s$.?#].[^\s]*$/;
      if (!url.match(correctUrlRegexp)) {
        url = 'http://' + url;
      }
      return url;
    };

    const createRegexpFromUrl = (url: string): RegExp =>
      new RegExp(url.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g, '\\$&'), 'g');

    const handleImageMessage = (message: roomEvents.CustomMessageSent): string => {
      const fileUrl: string = getCorrectUrl(urlService.resolveFileUrl(message.context.content));

      return `<a href="${fileUrl}" target="_blank">` +
        `<img src="${fileUrl}"/></a>`;
    };

    // tslint:disable-next-line:cyclomatic-complexity
    const handleTextMessage = (message: roomEvents.CustomMessageSent): string => {
      const messageContext = message.context;
      const messageUrls = getUrls(messageContext.content);
      if (messageContext && messageContext.description && messageContext.description.length > 0) {
        const fileUrl = urlService.resolveFileUrl(messageContext.content);
        return `<a href="${fileUrl}" target="_blank" class="file">
                <span class="icon icon-file"></span>${messageContext.description}</a>`;

      } else if (messageUrls && messageUrls.length > 0) {
        for (const url in messageUrls) {
          if (messageUrls.hasOwnProperty(url)) {
            const currentUrl = messageUrls[url];
            const urlRegexp = createRegexpFromUrl(currentUrl);

            if (hasImageUrl(currentUrl)) {
              return message.context.content.replace(urlRegexp, '<a href="' + getCorrectUrl(currentUrl) +
                '" target="_blank" >' + '<img src="' + getCorrectUrl(currentUrl) + '"/></a>');
            } else {
              return message.context.content.replace(urlRegexp, '<a href="' + getCorrectUrl(currentUrl) +
                '" target="_blank">' + currentUrl + '</a>');
            }
          }
        }
      }

      return message.context.content;
    };

    const handleMessage = (message: roomEvents.CustomMessageSent): string => {
      switch (message.context.mimeType) {
        case 'text/plain':
          return handleTextMessage(message);
        case 'image/jpeg':
          return handleImageMessage(message);
        case 'image/png':
          return handleImageMessage(message);
        case 'application/pdf':
          return handleImageMessage(message);
        default:
          logger.warn('MessagePipe: Unhandled message type, fix me please');
          return handleTextMessage(message);
      }
    };

    return function(message: roomEvents.CustomMessageSent): string {
      if (message) {
        return handleMessage(message);
      } else {
        logger.error('Expected Message object but got:' + typeof message);
        return '';
      }

    };
  }
  angular.module('profitelo.filters.message-filter', [
  ])
    .filter('message', ['urlService', 'logger', messageFilter]);
