import {Message} from 'ratel-sdk-js'
import * as angular from 'angular'
import * as _ from 'lodash'
import {UrlService} from '../../services/url/url.service'

  function messageFilter($log: ng.ILogService, urlService: UrlService): (message: Message) => string {

    const hasImageUrl = (text: string): RegExpMatchArray | null => {
      const imageRegexp = /([/|.|\w|\s])*\.(?:jpg|gif|png)/
      return text.match(imageRegexp)
    }

    const getUrls = (text: string): RegExpMatchArray | null => {
      const urlRegexp = /(((https?|ftp):\/\/)|(www\.))[^\s$.?#].[^\s]*\.[^\s$.?#].[^\s]*/g
      return _.uniq(text.match(urlRegexp) || [])
    }

    const getCorrectUrl = (url: string): string => {
      const correctUrlRegexp = /^(https?|ftp):\/\/[^\s$.?#].[^\s]*$/
      if (!url.match(correctUrlRegexp)) {
        url = 'http://' + url
      }
      return url
    }

    const createRegexpFromUrl = (url: string): RegExp =>
      new RegExp(url.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g, '\\$&'), 'g')

    const handleMessage = (message: Message): string => {
      const messageContext = message.context
      const messageUrls = getUrls(messageContext.content)
      if (messageContext && messageContext.description && messageContext.description.length > 0) {
        const fileUrl = urlService.resolveFileUrl(messageContext.content)
        return `<a href="${fileUrl}" target="_blank" class="file">
                <i class="icon-file-24"></i>${messageContext.description}</a>`

      } else if (messageUrls && messageUrls.length > 0) {
        for (const url in messageUrls) {
          if (messageUrls.hasOwnProperty(url)) {
            const currentUrl = messageUrls[url]
            const urlRegexp = createRegexpFromUrl(currentUrl)

            if (hasImageUrl(currentUrl)) {
              return message.context.content.replace(urlRegexp, '<a href="' + getCorrectUrl(currentUrl) +
                '" target="_blank" >' + '<img src="' + getCorrectUrl(currentUrl) + '"/></a>')
            } else {
              return message.context.content.replace(urlRegexp, '<a href="' + getCorrectUrl(currentUrl) +
                '" target="_blank">' + currentUrl + '</a>')
            }
          }
        }
      }

      return message.context.content
    }

    return function(message: Message): string {
      if (message) {
        return handleMessage(message)
      } else {
        $log.error('Expected Message object but got:' + typeof message)
        return ''
      }

    }
  }
  angular.module('profitelo.filters.message-filter', [
  ])
    .filter('message', messageFilter)
