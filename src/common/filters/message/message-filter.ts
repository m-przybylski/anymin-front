namespace profitelo.filters.message {


  function messageFilter($log: ng.ILogService, lodash: _.LoDashStatic) {

    const hasImageUrl = (text: string) => {
      const imageRegexp = /([/|.|\w|\s])*\.(?:jpg|gif|png)/
      return text.match(imageRegexp)
    }

    const getUrls = (text: string) => {
      const urlRegexp = /(((https?|ftp):\/\/)|(www\.))[^\s$.?#].[^\s]*\.[^\s$.?#].[^\s]*/g
      return lodash.uniq(text.match(urlRegexp) || [])
    }

    const getCorrectUrl = (url: string) => {
      const correctUrlRegexp = /^(https?|ftp):\/\/[^\s$.?#].[^\s]*$/
      if (!url.match(correctUrlRegexp)) {
        url = 'http://' + url
      }
      return url
    }

    const createRegexpFromUrl = (url: string) => {
      return new RegExp(url.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g, '\\$&'), 'g')
    }

    const handleMessage = (message: string) => {
      const messageObject = angular.fromJson(angular.fromJson(message))
      const messageUrls = getUrls(messageObject.body)

      if (messageObject.fileUrl) {
        return '<a href="' + messageObject.fileUrl + '" target="_blank" class="file"><i class="icon-file-24"></i>' + messageObject.body + '</a>'

      } else if (messageUrls && messageUrls.length > 0) {
        for (let url in messageUrls) {
          if (messageUrls.hasOwnProperty(url)) {
            const currentUrl = messageUrls[url]
            const urlRegexp = createRegexpFromUrl(currentUrl)

            if (hasImageUrl(currentUrl)) {
              return messageObject.body.replace(urlRegexp, '<a href="' + getCorrectUrl(currentUrl) + '" target="_blank" >' +
                '<img src="' + getCorrectUrl(currentUrl) + '"/></a>')
            } else {
              return messageObject.body.replace(urlRegexp, '<a href="' + getCorrectUrl(currentUrl) + '" target="_blank">' + currentUrl + '</a>')
            }
          }
        }
      }

      return messageObject.body
    }

    return function(message: string) {
      if (message && typeof message === 'string') {
        return handleMessage(message)
      } else {
        $log.error('Expected String but got:' + typeof message)
        return ''
      }

    }
  }

  angular.module('profitelo.filters.message-filter', [
    'ngLodash'
  ])
    .filter('message', messageFilter)
}
