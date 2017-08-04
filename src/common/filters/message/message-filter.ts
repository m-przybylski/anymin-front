namespace profitelo.filters.message {

  function messageFilter($log: ng.ILogService, ): (message: string) => string {

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

    const handleMessage = (message: string): string => {
      const messageObject = angular.fromJson(angular.fromJson(message))
      const messageUrls = getUrls(messageObject.body)

      if (messageObject.fileUrl) {
        return '<a href="' + messageObject.fileUrl + '" target="_blank" class="file"><i class="icon-file-24"></i>' +
          messageObject.body + '</a>'

      } else if (messageUrls && messageUrls.length > 0) {
        for (const url in messageUrls) {
          if (messageUrls.hasOwnProperty(url)) {
            const currentUrl = messageUrls[url]
            const urlRegexp = createRegexpFromUrl(currentUrl)

            if (hasImageUrl(currentUrl)) {
              return messageObject.body.replace(urlRegexp, '<a href="' + getCorrectUrl(currentUrl) +
                '" target="_blank" >' + '<img src="' + getCorrectUrl(currentUrl) + '"/></a>')
            } else {
              return messageObject.body.replace(urlRegexp, '<a href="' + getCorrectUrl(currentUrl) +
                '" target="_blank">' + currentUrl + '</a>')
            }
          }
        }
      }

      return messageObject.body
    }

    return function(message: string): string {
      if (message && typeof message === 'string') {
        return handleMessage(message)
      } else {
        $log.error('Expected String but got:' + typeof message)
        return ''
      }

    }
  }

  angular.module('profitelo.filters.message-filter', [

  ])
    .filter('message', messageFilter)
}
